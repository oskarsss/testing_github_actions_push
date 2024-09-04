import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import { TableColorSelect } from '@/@core/fields/select/TableColorSelect';
import Tooltip from '@mui/material/Tooltip';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import TableTypes from '@/@core/components/table/types';
import PagesGrpcService from '@/@grpcServices/services/pages.service';
import type { PageModel_Page } from '@proto/models/model_page';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type DefaultDataType = {
    name: string;
    color: string;
};

const schema: yup.ObjectSchema<DefaultDataType> = yup.object().shape({
    name : yup.string().required(),
    color: yup.string().required()
});

type Props = {
    header?: TableTypes.Header;
    page: PageModel_Page;
    onSuccessFullCreate?: (headerId: string) => void;
};

export const useGroupNameMenu = menuHookFabric(GroupNameMenu, { cleanContentOnClose: true });

function GroupNameMenu({
    header,
    page,
    onSuccessFullCreate
}: Props) {
    const isEditMode = header;
    const groupNameMenu = useGroupNameMenu(true);
    const { t } = useAppTranslation('core');

    const [createHeader, { isLoading: isCreateLoading }] =
        PagesGrpcService.useCreatePageHeaderMutation();
    const [updateHeader, { isLoading: isUpdateLoading }] =
        PagesGrpcService.useUpdatePageHeaderMutation();
    const [deleteHeader, { isLoading: isDeleteLoading }] =
        PagesGrpcService.useDeletePageHeaderMutation();

    const {
        reset,
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultDataType>({
        defaultValues: {
            name : '',
            color: 'default'
        },
        values: header
            ? {
                name : header.name,
                color: header.color
            }
            : undefined,
        resolver: yupResolver(schema)
    });

    const handleClose = () => {
        reset();
        groupNameMenu.close();
    };

    const deleteGroup = () => {
        if (header && isEditMode) {
            deleteHeader({
                page,
                headerId: header.headerId
            })
                .unwrap()
                .then(handleClose);
        }
    };

    const addGroup = (data: DefaultDataType) => {
        createHeader({
            page,
            name : data.name,
            color: data.color
        })
            .unwrap()
            .then((res) => {
                onSuccessFullCreate?.(res.headerId);
                handleClose();
            });
    };
    const editGroup = (data: DefaultDataType) => {
        if (header) {
            updateHeader({
                page,
                name    : data.name,
                color   : data.color,
                headerId: header.headerId
            })
                .unwrap()
                .then(handleClose);
        }
    };

    const submit = (data: DefaultDataType) => {
        if (!isEditMode) {
            addGroup(data);
        } else {
            editGroup(data);
        }
    };

    return (
        <MenuComponents.Form
            width="450px"
            onSubmit={handleSubmit(submit)}
        >
            <MenuComponents.FormHeader
                text={`core:table.table_editor.menus.group_menu.titles.${
                    isEditMode ? 'edit' : 'add'
                }`}
                translateOptions={isEditMode ? { name: header.name } : undefined}
            />

            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="core:table.table_editor.menus.group_menu.fields.name.label"
                        name="name"
                        placeholder="core:table.table_editor.menus.group_menu.fields.name.placeholder"
                        width="100%"
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={12}>
                    <TableColorSelect
                        control={control}
                        required
                    />
                </MenuComponents.Field>

                <MenuComponents.ActionsWrapper>
                    <MenuComponents.CancelButton onCancel={handleClose} />
                    {!!isEditMode && (
                        <Tooltip
                            title={t(
                                'table.table_editor.menus.group_menu.tooltips.history_of_applied'
                            )}
                            placement="top"
                        >
                            <MenuComponents.DeleteButton
                                onClick={deleteGroup}
                                loading={isDeleteLoading}
                            />
                        </Tooltip>
                    )}
                    <MenuComponents.SubmitButton
                        text={isEditMode ? 'common:button.edit' : 'common:button.save'}
                        loading={isCreateLoading || isUpdateLoading}
                        disabled={!isDirty}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
