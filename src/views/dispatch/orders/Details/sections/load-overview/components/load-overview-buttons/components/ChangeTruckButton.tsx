import VectorIcons from '@/@core/icons/vector_icons';
import Button from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/Button';
import React from 'react';
import { useReAssignTruckToManifestMenu } from '@/@core/components/assign/modals/ReAssignTruckToManifest';

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
        <Button
            onClick={reassignTruck}
            tooltipProps={{
                title   : 'common:tooltips.change_truck',
                hot_keys: 'R'
            }}
        >
            <VectorIcons.LoadIcons.Switch />
        </Button>
    );
}
