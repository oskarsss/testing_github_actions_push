import FullDialog from '@/@core/ui-kits/full-dialog';
import * as React from 'react';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useCallback } from 'react';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

type Props = {
    load_id: string;
    disabled?: boolean;
    onSuccessfulDelete?: () => void;
};

function DeleteLoadButton({
    load_id,
    disabled = false,
    onSuccessfulDelete
}: Props) {
    const [deleteLoad, { isLoading }] = LoadsGrpcService.useDeleteLoadMutation();
    const editLoadDialog = useEditLoadDialog(true);
    const confirm = useConfirm();

    const confirmDeleteLoad = useCallback(() => {
        confirm({
            title       : 'modals:loads.edit_load.confirm.delete.title',
            body        : 'modals:loads.edit_load.confirm.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () => {
                deleteLoad({ loadId: load_id })
                    .unwrap()
                    .then(() => {
                        editLoadDialog.close().then(() => {
                            if (onSuccessfulDelete) {
                                onSuccessfulDelete();
                            }
                        });
                    });
            }
        });
    }, [confirm, deleteLoad, editLoadDialog, load_id, onSuccessfulDelete]);

    return (
        <FullDialog.DeleteButton
            isLoading={isLoading}
            onClick={confirmDeleteLoad}
            disabled={disabled}
        />
    );
}

export default DeleteLoadButton;
