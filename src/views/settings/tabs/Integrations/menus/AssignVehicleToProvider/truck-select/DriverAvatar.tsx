import { memo } from 'react';
import { Avatar, Stack } from '@mui/material';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    truck: TruckModel_Truck;
};

function DriverAvatar({ truck }: Props) {
    const drivers = useDriversMap();
    const driverId = truck?.drivers.find((dr) => dr.primary)?.driverId || '';
    const driver = drivers[driverId];
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);
    const driverFirstName = driver?.firstName || '';
    const driverLastName = driver?.lastName || '';
    const { t } = useAppTranslation();

    return (
        <Stack
            position="relative"
            marginRight="5px"
        >
            <Avatar
                alt={driver ? `${driver.firstName} ${driver.lastName}` : 'N/A'}
                src={url}
                sx={{ width: 40, height: 40, fontSize: '14px', marginRight: '5px' }}
            >
                {driverFirstName && driverFirstName?.charAt(0).toUpperCase()}
                {driverLastName && driverLastName?.charAt(0).toUpperCase()}
                {!driverFirstName && !driverLastName && t('common:not_provided')}
            </Avatar>

            <Stack
                height="18px"
                width="18px"
                alignItems="center"
                position="absolute"
                bottom={0}
                right={0}
            >
                {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
            </Stack>
        </Stack>
    );
}

export default memo(DriverAvatar);
