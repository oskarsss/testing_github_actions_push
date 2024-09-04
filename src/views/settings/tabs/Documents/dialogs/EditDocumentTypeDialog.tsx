import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import Documents from '@/store/documents/types';

import { DefaultValues, schema } from '@/views/settings/tabs/Documents/dialogs/helpers';
import TypeDialog from '@/views/settings/tabs/Documents/dialogs/TypeDialog';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React from 'react';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import { DOCUMENT_ENTITY_TYPE_GRPC_ENUM } from '@/models/documents/documents-mappings';

export const useEditDocumentTypeDialog = hookFabric(EditDocumentTypeDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="470px"
        {...props}
    />
));

type Props = {
    item: Documents.DocumentType;
};
function EditDocumentTypeDialog({ item }: Props) {
    const dialog = useEditDocumentTypeDialog(true);
    const [updateType, { isLoading }] = DocumentTypesGrpcServices.useUpdateDocumentTypeMutation();

    const values = {
        title            : item.title,
        entity_type      : item.entityType,
        state            : item.state?.default || '',
        expirable        : item.expirable,
        number_supported : item.numberSupported,
        state_supported  : item.state?.supported || false,
        required         : item.required,
        can_driver_view  : item.canDriverView,
        can_driver_update: item.canDriverUpdate,
        status_supported : item.statusSupported
    };

    const method = useForm<DefaultValues>({
        values,
        resolver: yupResolver(schema)
    });

    const submit = (body: DefaultValues) => {
        updateType({
            canDriverUpdate: body.can_driver_update,
            canDriverView  : body.can_driver_view,
            entityType     : body.entity_type,
            expirable      : body.expirable,
            numberSupported: body.number_supported,
            required       : body.required,
            state          : {
                default  : body.state,
                supported: body.state_supported
            },
            statusSupported: body.status_supported,
            title          : body.title,
            documentTypeId : item.documentTypeId
        })
            .unwrap()
            .then(dialog.close);
    };

    const entity = DOCUMENT_ENTITY_TYPE_GRPC_ENUM[item.entityType];

    return (
        <TypeDialog
            method={method}
            title={entity ? `settings:document_types.dialog.add.${entity}.title` : ''}
            submit={submit}
            isEdit
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!method.formState.isDirty}
            />
        </TypeDialog>
    );
}
