import MenuComponents from '@/@core/ui-kits/menus';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';

type Props = {
    fuelTransactionId: string;
    truckId?: string;
};

export const useFuelOptionMenu = menuHookFabric(FuelOptionMenu);

function FuelOptionMenu({
    fuelTransactionId,
    truckId
}: Props) {
    const [unassignTruck] = FuelGrpcService.useUnassignTruckMutation();
    const confirm = useConfirm();

    const optionsMenu = useFuelOptionMenu(true);

    const editTruckDialog = useEditTruckDialog();

    const onUnassign = () => {
        confirm({
            title       : 'modals:fuels.options.confirm.unassign.title',
            body        : 'modals:fuels.options.confirm.unassign.body',
            confirm_text: 'common:button.unassign',
            onConfirm   : () => {
                unassignTruck({
                    fuelTransactionId
                }).then(() => {
                    optionsMenu.close();
                });
            }
        });
    };

    const onEdit = () => {
        if (truckId) {
            editTruckDialog.open({ truck_id: truckId });
            optionsMenu.close();
        }
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                text="common:button.edit"
                Icon={<EditIcon />}
                onClick={onEdit}
            />
            <MenuComponents.DangerItem
                text="common:button.unassign"
                Icon={<DeleteIcon />}
                onClick={onUnassign}
            />
        </MenuComponents.List>
    );
}
