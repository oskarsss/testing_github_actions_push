import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { Avatar, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { MouseEvent } from 'react';
import LinePanelOverviewItem from '@/views/dispatch/manifests/main/line-panel/overview/LinePanelOverviewItem';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import DriverTypeBadge from '@/@core/components/overview-driver-avatar/DriverTypeBadge';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';

type Props = {
    truckId: string;
    trailerId: string;
    driverId: string;
    assignTruckHandler: (event: MouseEvent<HTMLButtonElement>) => void;
};

function LinePanelOverview({
    truckId,
    trailerId,
    driverId,
    assignTruckHandler
}: Props) {
    const truck = useTruckById(truckId);
    const trailer = useTrailerById(trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId);
    const driver = useDriverById(driverId);

    const fullName = `${driver?.firstName} ${driver?.lastName}`;
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);

    if (!truck) {
        return (
            <IconButtonWithTooltip
                size="small"
                tooltip="common:actions.assign_truck"
                onClick={assignTruckHandler}
                icon={<AddIcon color="primary" />}
            />
        );
    }

    return (
        <Stack
            alignItems="center"
            spacing={2}
            overflow="hidden"
        >
            <LinePanelOverviewItem
                icon={TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                text={`#${truck.referenceId}`}
            />

            <LinePanelOverviewItem
                icon={getTrailerTypeIcon(trailerType?.icon || 0)}
                text={trailer ? `#${trailer.referenceId}` : 'PO'}
            />

            {driver && (
                <Stack alignItems="center">
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <DriverTypeBadge driverTypeId={driver.driverTypeId}>
                            <Avatar
                                alt={fullName}
                                src={url}
                                sx={{
                                    width : '28px',
                                    height: '28px'
                                }}
                            >
                                {fullName?.[0]}
                            </Avatar>
                        </DriverTypeBadge>
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
}

export default LinePanelOverview;
