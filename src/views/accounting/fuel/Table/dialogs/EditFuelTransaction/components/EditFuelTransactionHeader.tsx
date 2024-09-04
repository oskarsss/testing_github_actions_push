import { Stack } from '@mui/material';
import FullDialog from '@/@core/ui-kits/full-dialog';
import React from 'react';
import { useEditFuelTransactionForm } from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/helpers';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import { useConfirm } from '@/@core/components/confirm-dialog';

type Props = {
    fuelTransactionId: string;
    updateLoading: boolean;
    onCloseDialog: () => void;
};

export default function EditFuelTransactionHeader({
    fuelTransactionId,
    updateLoading,
    onCloseDialog
}: Props) {
    const [deleteFuel, { isLoading: isDeleting }] =
        FuelGrpcService.useDeleteFuelTransactionMutation();

    const confirm = useConfirm();
    const {
        formState: { isDirty }
    } = useEditFuelTransactionForm();

    const onDelete = () => {
        confirm({
            title       : 'modals:fuels.edit.confirm_dialog.delete.title',
            body        : 'modals:fuels.edit.confirm_dialog.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () => {
                deleteFuel({
                    fuelTransactionIds: [fuelTransactionId]
                })
                    .unwrap()
                    .then(onCloseDialog);
            }
        });
    };

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
            >
                <FullDialog.HeaderTitle title="modals:fuels.edit.title" />
            </Stack>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={updateLoading}
                    type="update"

                    // testId={TestIDs.pages.editTruck.buttons.saveTruckEditing}
                />
                <FullDialog.DeleteButton
                    disabled={updateLoading}
                    isLoading={isDeleting}
                    onClick={onDelete}

                    // testId={TestIDs.pages.editTruck.buttons.deleteTruck}
                />
                <FullDialog.CloseButton
                    onClose={onCloseDialog}

                    // testId={TestIDs.pages.editTruck.buttons.close}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
