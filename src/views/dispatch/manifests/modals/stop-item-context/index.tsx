import MenuComponents from '@/@core/ui-kits/menus';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MapIcon from '@mui/icons-material/Map';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import LoadStopsGrpcService from '@/@grpcServices/services/loads-service/load-stops.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useEditLoadStopDialog } from '../load-stop/EditLoadStop';
import { useEditManifestStopDialog } from '../manifest-stop/EditManifestStop';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    selectStop: (stopId: string | null) => void;
    selectedStopId: string | null;
    manifestId: string;
};

export const useStopItemContextMenu = menuHookFabric(StopItemContext);

export default function StopItemContext({
    stop,
    selectStop,
    selectedStopId,
    manifestId
}: Props) {
    const menu = useStopItemContextMenu(true);
    const confirm = useConfirm();
    const [removeManifestStopTrigger, removeManifestStopState] =
        ManifestStopsGrpcService.useRemoveStopFromManifestMutation();

    const [removeLoadStopTrigger, removeLoadStopState] =
        LoadStopsGrpcService.useDeleteStopMutation();

    const editLoadStop = useEditLoadStopDialog();
    const editManifestStop = useEditManifestStopDialog();

    const edit = () => {
        if (stop.originType === ManifestsTypes.OriginType.LOAD) {
            editLoadStop.open({
                manifestId,
                stop
            });
        } else {
            editManifestStop.open({
                manifestId,
                stop
            });
        }
        menu.close();
    };

    const showOnTheMap = () => {
        selectStop(selectedStopId === stop.stopId ? null : stop.stopId);
        menu.close();
    };

    const deleteStop = () => {
        if (stop.originType === ManifestsTypes.OriginType.LOAD) {
            confirm({
                body     : 'modals:manifests.stop.context-menu.delete_stop_confirmation',
                onConfirm: () => {
                    removeLoadStopTrigger({
                        loadId: stop.loadId,
                        stopId: stop.stopId,
                        manifestId
                    });
                },
                title       : 'modals:manifests.stop.context-menu.delete_stop_title',
                confirm_text: 'common:button.delete'
            });
        } else {
            confirm({
                body     : 'modals:manifests.stop.context-menu.delete_stop_confirmation',
                onConfirm: () => {
                    removeManifestStopTrigger({
                        manifestId,
                        manifestStopId: stop.stopId,
                        loadId        : stop.loadId
                    });
                },
                title       : 'modals:manifests.stop.context-menu.delete_stop_title',
                confirm_text: 'common:button.delete'
            });
        }
        menu.close();
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                Icon={<MapIcon />}
                onClick={showOnTheMap}
                text="common:tooltips.show_on_the_map"
            />
            <MenuComponents.Item
                Icon={<EditIcon />}
                onClick={edit}
                text="common:button.edit"
            />
            <MenuComponents.DangerItem
                onClick={deleteStop}
                Icon={<DeleteForeverIcon />}
                text="common:button.delete"
            />
        </MenuComponents.List>
    );
}
