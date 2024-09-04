/* eslint-disable max-len */

import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import MenuItem from '@mui/material/MenuItem';
import { useActiveDocumentTypes } from '@/store/documents/hooks';

import TextInput from '@/@core/fields/inputs/TextInput';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DocumentsGrpcService from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { DocumentCreateRequest } from '@proto/documents';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { MenuSubTitle, MenuTitle } from './styled';
import MenuComponents from '../../../ui-kits/menus';

type DefaultValues = {
    name: string;
};

const default_values: DefaultValues = { name: '' };

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().trim().required('Document type is a required field')
});

export const useChooseDocumentTypeMenu = menuHookFabric(ChooseDocumentType, {
    cleanContentOnClose: true
});

export const useChooseDocumentTypeDialog = hookFabric(ChooseDocumentType, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="max-content"
        turnOffCloseButton
        keepMounted
        padding="0px"
        {...props}
    />
));

type Props = {
    entity_id: string;
    entity_type: DocumentModel_DocumentEntityType;
    exclude_document_types: Array<number | string>;
    onAdded?: (document: DocumentCreateRequest) => void;
    isDialog?: boolean;
};

function ChooseDocumentType({
    entity_id,
    entity_type,
    exclude_document_types,
    onAdded,
    isDialog = false
}: Props) {
    const { t } = useAppTranslation('core');

    const chooseDocumentTypeMenu = useChooseDocumentTypeMenu(true);
    const chooseDocumentTypeDialog = useChooseDocumentTypeDialog(true);

    const [createDocumentType, { isLoading: isLoadingCreate }] =
        DocumentTypesGrpcServices.useCreateDocumentTypeMutation();

    const [addDocument, { isLoading: isLoadingAdd }] =
        DocumentsGrpcService.useAddDocumentMutation();

    const { documentTypes: d_types } = useActiveDocumentTypes();

    const existing_document_types = d_types.filter(
        (doc_type) => doc_type.entityType === entity_type
    );

    const entity_document_types = existing_document_types.filter(
        (doc_type) => exclude_document_types.indexOf(doc_type.documentTypeId as never) === -1
    );

    const {
        control,
        reset,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    useEffect(() => {
        const subscription = watch((value) => {
            if (!value.name) return;
            const name = value.name.trim().toLowerCase();
            if (name !== '') {
                const findMatch = existing_document_types.some(
                    (type) => type.title.toLowerCase() === name
                );

                if (findMatch) {
                    setError('name', {
                        type   : 'custom',
                        message: `${t('documents.menus.choose_document_type.already_exist')}`
                    });
                    return;
                }
            }
            clearErrors('name');
        });
        return () => subscription.unsubscribe();
    }, [clearErrors, existing_document_types, setError, t, watch]);

    const close = () => {
        if (isDialog) {
            chooseDocumentTypeDialog.close();
            return;
        }
        chooseDocumentTypeMenu.close();
    };

    const addDocumentHandler = (document_type_id: string) => {
        addDocument({
            documentTypeId: document_type_id,
            entityType    : entity_type,
            entityId      : entity_id
        })
            .unwrap()
            .then(() => {
                onAdded?.({
                    documentTypeId: document_type_id,
                    entityType    : entity_type,
                    entityId      : entity_id
                });
                reset();
                close();
            });
    };

    const addType = (data: { name: string }) => {
        createDocumentType({
            title          : data.name,
            entityType     : entity_type,
            canDriverUpdate: true,
            canDriverView  : true,
            expirable      : false,
            numberSupported: false,
            required       : false,
            state          : {
                default  : '',
                supported: false
            },
            statusSupported: false
        })
            .unwrap()
            .then(({ documentTypeId }) => {
                if (documentTypeId) {
                    addDocumentHandler(documentTypeId);
                }
            });
    };

    return (
        <>
            {entity_document_types.length > 0 ? (
                entity_document_types.map((doc_type) => (
                    <MenuItem
                        key={doc_type.documentTypeId}
                        onClick={() => addDocumentHandler(doc_type.documentTypeId)}
                        style={{ height: '40px', borderBottom: '1px solid #e2e2e3' }}
                    >
                        {doc_type.title}
                    </MenuItem>
                ))
            ) : (
                <MenuTitle disabled>
                    {t('documents.menus.choose_document_type.no_types_found')}
                </MenuTitle>
            )}
            <MenuComponents.Form
                style={{
                    padding: '24px'
                }}
                onSubmit={handleSubmit(addType)}
            >
                <MenuComponents.Fields>
                    <MenuComponents.Field xs={12}>
                        <MenuSubTitle>{t('documents.menus.choose_document_type.or')}</MenuSubTitle>
                    </MenuComponents.Field>
                    <MenuComponents.Field xs={12}>
                        <TextInput
                            control={control}
                            errors={errors}
                            label="core:documents.menus.choose_document_type.fields.name.label"
                            name="name"
                            placeholder="core:documents.menus.choose_document_type.fields.name.placeholder"
                            width="100%"
                        />
                    </MenuComponents.Field>
                    <MenuComponents.ActionsWrapper>
                        <MenuComponents.CancelButton onCancel={close} />
                        <MenuComponents.SubmitButton
                            loading={isLoadingCreate || isLoadingAdd}
                            text="common:button.add"
                            disabled={!isDirty || 'name' in errors}
                        />
                    </MenuComponents.ActionsWrapper>
                </MenuComponents.Fields>
            </MenuComponents.Form>
        </>
    );
}

export default memo(ChooseDocumentType);
