import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import VectorIcons from '@/@core/icons/vector_icons';
import { useSplitManifestsDialog } from '@/views/dispatch/manifests/modals/split';
import { useMergeManifestsDialog } from '@/views/dispatch/manifests/modals/merge';
import { useAddManifestStopDialog } from '@/views/dispatch/manifests/modals/manifest-stop/AddManifestStop';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import openNewTab from '@/utils/openNewTab';
import { useRouter } from 'next/router';
import { useUnassignTruckFromManifest } from '@/views/dispatch/manifests/details/sections/equipment/components/UnassignTruckButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export const StopOptionsMenu = menuHookFabric(StopOptions, {}, MenuComponents.MenuOptionsWrapper);

type Props = {
    manifestId: string;
    setTableMode: (mode: TableMode) => void;
    lastStopSequence?: number;
    lastStopAppointmentEnd?: string;
    truckId: string;
};

function StopOptions({
    manifestId,
    setTableMode,
    lastStopSequence,
    lastStopAppointmentEnd,
    truckId
}: Props) {
    const splitManifestDialog = useSplitManifestsDialog();
    const mergeManifestDialog = useMergeManifestsDialog();
    const stopOptionsMenu = StopOptionsMenu(true);
    const addStopDialog = useAddManifestStopDialog();
    const { pathname } = useRouter();
    const isManifestPage = pathname.includes('manifests');

    const onClickMergeStops = () => {
        mergeManifestDialog.open({
            manifestId,
            onSuccessMerge: !isManifestPage
                ? (manifestId) => {
                    openNewTab(`/dispatch/manifests/${manifestId}`);
                }
                : undefined
        });
        stopOptionsMenu.close();
    };

    const onClickSplitManifest = () => {
        splitManifestDialog.open({
            manifestId,
            onSuccessSplit: !isManifestPage
                ? (manifestId) => {
                    openNewTab(`/dispatch/manifests/${manifestId}`);
                }
                : undefined
        });
        stopOptionsMenu.close();
    };

    const unassignTruck = useUnassignTruckFromManifest({ truckId, manifestId });

    const onClickAddStop = () => {
        addStopDialog.open({
            manifestId,
            lastStopAppointmentStartAt: lastStopAppointmentEnd,
            sequence                  : (lastStopSequence || 0) + 1
        });
        stopOptionsMenu.close();
    };

    const onClickEditRoute = () => {
        setTableMode(TableMode.EDIT_ROUTE);
        stopOptionsMenu.close();
    };

    const onClickEditTakeRoute = () => {
        setTableMode(TableMode.TAKE_ROUTE);
        stopOptionsMenu.close();
    };

    return (
        <MenuComponents.List sx={{ minWidth: '140px' }}>
            <MenuComponents.OptionItem
                onClick={onClickEditRoute}
                Icon={<VectorIcons.EditIcon />}
                text="modals:manifests.details.tabs.stops.header.buttons.edit_route"
            />

            {/* // TODO: code should be uncommented this when it needed */}
            {/* <MenuComponents.OptionItem 
                 onClick={onClickEditTakeRoute} 
                 Icon={<VectorIcons.TakeOutIcon />} 
                 text="modals:manifests.details.tabs.stops.header.buttons.take_out" 
            /> */}
            <MenuComponents.OptionItem
                onClick={onClickMergeStops}
                text="modals:loads.stop_options.titles.merge_stops"
                Icon={<VectorIcons.MergeIcon />}
            />
            <MenuComponents.OptionItem
                onClick={onClickSplitManifest}
                Icon={<VectorIcons.SplitIcon />}
                text="modals:loads.stop_options.titles.split_manifest"
            />

            <MenuComponents.OptionItem
                onClick={onClickAddStop}
                Icon={<VectorIcons.AddStopIcon />}
                text="common:button.add_manifest_stop"
            />
            <MenuComponents.OptionItem
                disabled={!truckId}
                onClick={unassignTruck}
                Icon={<CloseIcon />}
                color="error"
                text="modals:manifests.details.tabs.stops.header.buttons.unassign_truck"
            />
            {/* <MenuComponents.Item */}
            {/*     Icon={<VectorIcons.DownloadIcon sx={{fontSize: '16px'}} />} */}
            {/*     text="modals:loads.stop_options.titles.rate_confirmation" */}
            {/* /> */}
        </MenuComponents.List>
    );
}
