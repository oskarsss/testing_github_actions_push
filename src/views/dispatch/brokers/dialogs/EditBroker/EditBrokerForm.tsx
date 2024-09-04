import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import FullDialog from '@/@core/ui-kits/full-dialog';
import Notes from '@/@core/components/notes/Notes';
import Documents from '@/@core/components/documents/Documents';
import EditBrokerHeader from '@/views/dispatch/brokers/dialogs/EditBroker/components/EditBrockerHeader';
import { useForm, useFormContext } from 'react-hook-form';
import { useCallback, useEffect, useMemo } from 'react';
import EditBrokerFields from '@/views/dispatch/brokers/dialogs/EditBroker/components/EditBrokerFields';
import { Box } from '@mui/material';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { yupResolver } from '@hookform/resolvers/yup';
import editBrokerUtils, {
    type DefaultValues
} from '@/views/dispatch/brokers/dialogs/EditBroker/edit-broker-utils';
import { BrokerRetrieveReply_Broker } from '@proto/brokers';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';

export const useEditBrokerForm = () => useFormContext<DefaultValues>();

type Props = {
    broker: BrokerRetrieveReply_Broker;
    document_id?: string;
    refetch: () => void;
    onSuccessfulEdit?: (data: DefaultValues) => void;
};
export default function EditBrokerForm({
    broker,
    document_id = '',
    refetch,
    onSuccessfulEdit
}: Props) {
    const editBrokerDialog = useEditBrokerDialog(true);
    const [updateBroker, { isLoading }] = BrokersGrpcService.useUpdateBrokerMutation();

    const dataValues: DefaultValues = useMemo(
        () => ({
            phoneNumber : broker.phoneNumber,
            name        : broker.name,
            mc          : broker.mc,
            email       : broker.email,
            address     : broker.address,
            shortName   : broker.shortName,
            active      : broker.active,
            dot         : broker.dot,
            billingEmail: broker.billingEmail
        }),
        [
            broker.phoneNumber,
            broker.name,
            broker.mc,
            broker.email,
            broker.address,
            broker.shortName,
            broker.active,
            broker.dot,
            broker.billingEmail
        ]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: editBrokerUtils.defaultValues,
        values       : dataValues,
        mode         : 'onBlur',
        resolver     : yupResolver<DefaultValues>(editBrokerUtils.schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const save = useCallback(
        (payload: DefaultValues) =>
            updateBroker({
                broker: {
                    brokerId: broker.brokerId,
                    ...payload,
                    active  : broker.active,
                    note    : broker.note
                }
            })
                .unwrap()
                .then(() => onSuccessfulEdit?.(payload)),
        [broker?.brokerId, updateBroker, onSuccessfulEdit]
    );

    useEffect(() => {
        editBrokerDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditBrokerHeader
                onClose={editBrokerDialog.close}
                broker={broker}
                updateLoading={isLoading}
            />
            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditBrokerFields />
                    <Box
                        sx={{
                            overflow: 'hidden',
                            height  : '100%'
                        }}
                    >
                        <Notes
                            entity_type="broker"
                            entity_id={broker.brokerId}
                            variant="outlined"
                            size="normal"
                        />
                    </Box>
                </FullDialog.ColumnContent>
                <Documents
                    title={`${broker.name}_${broker.mc || ''}`}
                    entityType={DocumentModel_DocumentEntityType.BROKER}
                    entityId={broker.brokerId}
                    documentId={document_id}

                    // documents={broker.documents}
                    // document_id={document_id}
                    // location={`broker/${broker.broker_id}/documents`}
                    // refresh={refetch}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
