import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    default_values,
    DefaultValues,
    schema
} from '@/views/settings/tabs/Documents/dialogs/helpers';
import TypeDialog from '@/views/settings/tabs/Documents/dialogs/TypeDialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { DOCUMENT_ENTITY_TYPE_GRPC_ENUM } from '@/models/documents/documents-mappings';

export const useAddDocumentTypeDialog = hookFabric(AddDocumentTypeDialog);

type Props = {
    entity_type: DocumentModel_DocumentEntityType;
};

export default function AddDocumentTypeDialog({ entity_type }: Props) {
    const dialog = useAddDocumentTypeDialog(true);
    const [createDocumentType, { isLoading }] =
        DocumentTypesGrpcServices.useCreateDocumentTypeMutation();

    const method = useForm<DefaultValues>({
        defaultValues: { ...default_values, entity_type },
        resolver     : yupResolver(schema)
    });

    const onClose = () => dialog.close();

    const submit = ({
        entity_type,
        ...body
    }: DefaultValues) => {
        createDocumentType({
            canDriverUpdate: body.can_driver_update,
            canDriverView  : body.can_driver_view,
            entityType     : entity_type,
            expirable      : body.expirable,
            numberSupported: body.number_supported,
            required       : body.required,
            statusSupported: body.status_supported,
            title          : body.title
        })
            .unwrap()
            .then(() => {
                onClose();
                method.reset();
            });
    };

    const entity = DOCUMENT_ENTITY_TYPE_GRPC_ENUM[entity_type];

    return (
        <TypeDialog
            method={method}
            title={entity ? `settings:document_types.dialog.add.${entity}.title` : ''}
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={onClose}
                submitLoading={isLoading}
                submitDisabled={!method.formState.isDirty}
                type="create"
            />
        </TypeDialog>
    );
}
