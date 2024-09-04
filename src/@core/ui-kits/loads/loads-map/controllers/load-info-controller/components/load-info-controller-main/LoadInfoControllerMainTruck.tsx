import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTruckLocation } from '@/store/streams/events/hooks';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import LoadInfoControllerLocationBtn from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-main/LoadInfoControllerLocationBtn';
import LoadInfoControllerMainSkeleton from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/load-info-controller-main/LoadInfoControllerMainSkeleton';
import { FlyToPoint } from '@/views/dispatch/tracking/map';

type Props = {
    truckId: string;
    flyToPoint: FlyToPoint;
};

function LoadInfoControllerMainTruck({
    truckId,
    flyToPoint
}: Props) {
    const trucksMap = useTrucksMap();
    const location = useTruckLocation(truckId);

    if (!Object.keys(trucksMap).length) {
        return (
            <LoadInfoControllerMainSkeleton>
                <LoadInfoControllerLocationBtn
                    location={location}
                    flyToPoint={flyToPoint}
                />
            </LoadInfoControllerMainSkeleton>
        );
    }

    const truck = trucksMap[truckId];
    if (!truck) return null;

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="12px"
            justifyContent="space-between"
            overflow="hidden"
            width="100%"
            height="38px"
            flex={1}
        >
            <Stack
                direction="row"
                alignItems="center"
                overflow="hidden"
                height="100%"
            >
                <Stack
                    sx={{
                        svg: {
                            width : '40px',
                            height: '40px'
                        }
                    }}
                >
                    {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                </Stack>
                <Stack overflow="hidden">
                    <Typography
                        fontSize="12px"
                        fontWeight={600}
                        lineHeight={1.5}
                        color={(theme) => theme.palette.semantic.text.primary}
                        noWrap
                    >
                        {`#${truck.referenceId}`}
                    </Typography>
                    <Typography
                        fontSize="12px"
                        fontWeight={500}
                        lineHeight={1.5}
                        color={(theme) => theme.palette.semantic.text.secondary}
                        mt="-2px"
                        noWrap
                    >
                        {`${truck.year || '-'} ${truck.make}`}
                    </Typography>
                </Stack>
            </Stack>

            <LoadInfoControllerLocationBtn
                location={location}
                flyToPoint={flyToPoint}
            />
        </Stack>
    );
}

export default LoadInfoControllerMainTruck;
