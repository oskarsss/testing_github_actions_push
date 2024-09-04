import MenuComponents from '@/@core/ui-kits/menus';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';

type Props = {
    tollId: string;
    truckId?: string;
    trailerId?: string;
};

export const useTollsOptionMenu = menuHookFabric(TollsOptionMenu);

function TollsOptionMenu({
    tollId,
    trailerId,
    truckId
}: Props) {
    const [unassignToll] = TollsGrpcService.useUnassignEquipmentMutation();
    const confirm = useConfirm();

    const optionsMenu = useTollsOptionMenu(true);

    const editTruckDialog = useEditTruckDialog();
    const editTrailerDialog = useEditTrailerDialog();

    const onUnassign = () => {
        confirm({
            title       : 'modals:tolls.options.unassign.confirm.title',
            body        : 'modals:tolls.options.unassign.confirm.body',
            confirm_text: 'common:button.unassign',
            cancel_text : 'common:button.cancel',
            onConfirm   : () => {
                unassignToll({
                    tollID: tollId
                })
                    .unwrap()
                    .then(optionsMenu.close);
            }
        });
    };

    const onEdit = () => {
        if (truckId) {
            editTruckDialog.open({ truck_id: truckId });
        } else if (trailerId) {
            editTrailerDialog.open({ trailer_id: trailerId });
        }
        optionsMenu.close();
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
