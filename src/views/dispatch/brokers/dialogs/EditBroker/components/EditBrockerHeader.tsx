import FullDialog from '@/@core/ui-kits/full-dialog';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useCallback } from 'react';
import { useEditBrokerForm } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBrokerForm';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { BrokerRetrieveReply_Broker } from '@proto/brokers';

type Props = {
    broker: BrokerRetrieveReply_Broker;
    onClose: () => void;
    updateLoading: boolean;
};
export default function EditBrokerHeader({
    broker,
    onClose,
    updateLoading
}: Props) {
    const confirm = useConfirm();
    const {
        formState: { isDirty }
    } = useEditBrokerForm();

    const [deleteBroker, { isLoading: deleteLoading }] =
        BrokersGrpcService.useDeleteBrokerMutation();

    const confirmDeleteLoad = useCallback(() => {
        confirm({
            title       : 'modals:brokers.edit.confirm_delete_modal.title',
            body        : 'modals:brokers.edit.confirm_delete_modal.description',
            confirm_text: 'common:button.delete',
            onConfirm   : () => deleteBroker({ brokerId: broker.brokerId }).unwrap().then(onClose)
        });
    }, [confirm]);

    return (
        <FullDialog.Header>
            <FullDialog.HeaderTitle title="modals:brokers.edit.title">
                <FullDialog.Space />
                <FullDialog.CopyText text={broker.name} />
                {!!broker.mc && (
                    <>
                        <FullDialog.Slashed />
                        <FullDialog.Hashtag />
                        <FullDialog.CopyText text={broker.mc.toString()} />
                    </>
                )}
            </FullDialog.HeaderTitle>

            <FullDialog.ActionsWrapper>
                <FullDialog.DeleteButton
                    isLoading={deleteLoading}
                    onClick={confirmDeleteLoad}
                    disabled={updateLoading}
                />
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={updateLoading}
                    type="update"
                />
                <FullDialog.CloseButton onClose={onClose} />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
