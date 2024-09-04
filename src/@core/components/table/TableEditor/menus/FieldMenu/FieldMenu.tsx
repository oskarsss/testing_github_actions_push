import { IconButton, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState } from 'react';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ChipSelect from '@/@core/fields/select/ChipSelect';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FieldsGrpcService from '@/@grpcServices/services/fields.service';
import { FieldModel_EntityType, FieldModel_Type } from '@proto/models/model_field';
import { FieldGetReply_Field } from '@proto/field';
import { TRANSLATE_FIELD_ENTITY_TYPE } from '@/@core/components/table/TableEditor/table-editor-configs';
import { PageModel_Page } from '@proto/models/model_page';

type DefaultDataType = {
    name: string;
    entity_type: FieldModel_EntityType;
    type: FieldModel_Type;
    select_values: string[];
};

const schema: yup.ObjectSchema<DefaultDataType> = yup.object().shape({
    name         : yup.string().required('Name is required'),
    entity_type  : yup.number<FieldModel_EntityType>().required('Entity type is required'),
    type         : yup.number<FieldModel_Type>().required('Type is required'),
    select_values: yup.array().required('Select values is required')
});

type Props = {
    field?: Omit<FieldGetReply_Field, 'values'>;
    entities: FieldModel_EntityType[];
    defaultValues?: Partial<DefaultDataType>;
    page: PageModel_Page;
};

export const useFieldMenu = menuHookFabric(FieldMenu, { cleanContentOnClose: true });

function FieldMenu({
    field,
    entities,
    defaultValues,
    page
}: Props) {
    const menu = useFieldMenu(true);
    const isEditMode = !!field;
    const { t } = useAppTranslation();

    const entity_types = entities.map((entity) => ({
        value: entity,
        label: t(TRANSLATE_FIELD_ENTITY_TYPE[entity])
    }));

    const [inputValue, setInputValue] = useState<string>('');

    const [createField, { isLoading: isCreateLoading }] =
        FieldsGrpcService.useCreateTableEditorFieldMutation();
    const [updateField, { isLoading: isUpdateLoading }] =
        FieldsGrpcService.useUpdateTableEditorFieldMutation();
    const [deleteField, { isLoading: isDeleteLoading }] =
        FieldsGrpcService.useDeleteTableEditorFieldMutation();

    const {
        setValue,
        reset,
        watch,
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultDataType>({
        defaultValues: {
            name         : '',
            entity_type  : entities[0] || FieldModel_EntityType.FIELD_ENTITY_TYPE_UNSPECIFIED,
            type         : FieldModel_Type.FIELD_TYPE_TEXT,
            select_values: [],
            ...defaultValues
        },
        values: field
            ? {
                name         : field.name,
                entity_type  : field.entityType,
                type         : field.type,
                select_values: field.selectValues
            }
            : undefined,
        resolver: yupResolver(schema)
    });

    const selectedType = watch('type');
    const select_values = watch('select_values');
    const select_values_options = select_values.map((value) => ({
        id   : value,
        title: value
    }));

    const handleClose = () => {
        reset();
        menu.close();
    };

    const deleteGroup = () => {
        if (!field) return;
        deleteField({
            fieldId: field.fieldId,
            page
        })
            .unwrap()
            .then(handleClose);
    };

    const addGroup = (data: DefaultDataType) => {
        createField({
            entityType  : data.entity_type,
            name        : data.name,
            type        : data.type,
            selectValues: data.select_values,
            page
        })
            .unwrap()
            .then(handleClose);
    };
    const editGroup = (data: DefaultDataType) => {
        if (!field) return;
        updateField({
            fieldId     : field.fieldId,
            entityType  : data.entity_type,
            name        : data.name,
            type        : data.type,
            selectValues: data.select_values,
            page
        })
            .unwrap()
            .then(handleClose);
    };

    const submit = (data: DefaultDataType) => {
        if (!isEditMode) {
            addGroup(data);
        } else {
            editGroup(data);
        }
    };

    const types = useMemo(
        () => [
            {
                value: FieldModel_Type.FIELD_TYPE_TEXT,
                label: t('core:table.table_editor.menus.field_menu.fields.type.text')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_NUMBER,
                label: t('core:table.table_editor.menus.field_menu.fields.type.number')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_AMOUNT,
                label: t('core:table.table_editor.menus.field_menu.fields.type.amount')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_DATE,
                label: t('core:table.table_editor.menus.field_menu.fields.type.date')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_DATETIME,
                label: t('core:table.table_editor.menus.field_menu.fields.type.datetime')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_SELECT,
                label: t('core:table.table_editor.menus.field_menu.fields.type.select')
            },
            {
                value: FieldModel_Type.FIELD_TYPE_CHECKBOX,
                label: t('core:table.table_editor.menus.field_menu.fields.type.checkbox')
            }
        ],
        [t]
    );

    return (
        <MenuComponents.Form
            width="500px"
            onSubmit={handleSubmit(submit)}
        >
            <MenuComponents.FormHeader
                text={`core:table.table_editor.menus.field_menu.titles.${
                    isEditMode ? 'edit' : 'add'
                }`}
                translateOptions={field ? { friendly_name: field.name } : undefined}
            />

            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        required
                        control={control}
                        errors={errors}
                        label="fields:name.label"
                        name="name"
                        placeholder="fields:name.placeholder"
                        width="100%"
                    />
                </MenuComponents.Field>

                <MenuComponents.Field xs={12}>
                    <SelectInput
                        required
                        name="entity_type"
                        label="core:table.table_editor.menus.field_menu.fields.labels.entity_type"
                        control={control}
                        errors={errors}
                        options={entity_types}
                        width="100%"
                    />
                </MenuComponents.Field>

                <MenuComponents.Field xs={12}>
                    <SelectInput
                        required
                        name="type"
                        label="common:type"
                        control={control}
                        errors={errors}
                        options={types}
                        width="100%"
                    />
                </MenuComponents.Field>

                {selectedType === FieldModel_Type.FIELD_TYPE_SELECT && (
                    <MenuComponents.Field xs={12}>
                        <ChipSelect
                            disabled={select_values_options.length === 0}
                            options={select_values_options}
                            name="select_values"
                            label="core:table.table_editor.menus.field_menu.fields.labels.select_values"
                            control={control}
                            errors={errors}
                            width="100%"
                        />
                        <Input
                            value={inputValue}
                            size="small"
                            fullWidth
                            onChange={(e) => setInputValue(e.target.value)}
                            endAdornment={(
                                <IconButton
                                    disabled={inputValue.trim() === ''}
                                    onClick={() => {
                                        const prevValues = watch('select_values');
                                        setValue('select_values', [...prevValues, inputValue]);
                                        setInputValue('');
                                    }}
                                >
                                    <AddBoxIcon />
                                </IconButton>
                            )}
                        />
                    </MenuComponents.Field>
                )}

                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={handleClose} />
                    {isEditMode && (
                        <MenuComponents.DeleteButton
                            onClick={deleteGroup}
                            loading={isDeleteLoading}
                        />
                    )}
                    <MenuComponents.SubmitButton
                        loading={isCreateLoading || isUpdateLoading}
                        text={isEditMode ? 'common:button.edit' : 'common:button.create'}
                        disabled={!isDirty}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
