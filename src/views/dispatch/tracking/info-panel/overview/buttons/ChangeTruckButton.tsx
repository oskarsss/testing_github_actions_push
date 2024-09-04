import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import { useReAssignTruckToManifestMenu } from '@/@core/components/assign/modals/ReAssignTruckToManifest';
import TrackingOverviewButtonsStyled from './styled';

type Props = {
    truckId: string;
    manifestId: string;
    manifestFriendlyId?: number | string;
    loadId: string;
};

export default function ChangeTruckButton({
    manifestFriendlyId,
    manifestId,
    truckId,
    loadId
}: Props) {
    const reAssignTruckToManifestMenu = useReAssignTruckToManifestMenu();
    const reassignTruck = (event: React.MouseEvent<HTMLButtonElement>) => {
        reAssignTruckToManifestMenu.open({
            manifestFriendlyId,
            manifestId,
            selectedTruckId         : truckId,
            alertAssignTruckFromLoad: true,
            loadId
        })(event);
    };

    return (
        <HotKeyTooltip
            title="common:tooltips.change_truck"
            hot_keys="R"
        >
            <TrackingOverviewButtonsStyled.Button onClick={reassignTruck}>
                <VectorIcons.LoadIcons.Switch />
            </TrackingOverviewButtonsStyled.Button>
        </HotKeyTooltip>
    );
}
