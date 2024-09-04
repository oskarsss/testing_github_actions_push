import { memo } from 'react';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import DriversTypes from '@/store/fleet/drivers/types';
import { Stack } from '@mui/material';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';

type Props = {
    driverType?: DriversTypes.ConvertedDriverRow['driverType'];
};

function DriverType({ driverType }: Props) {
    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            {DRIVER_TYPE_ICONS[driverType?.icon || DriverTypeModel_Icon.DEFAULT]}

            <span>{driverType?.name || ''}</span>
        </Stack>
    );
}

export default memo(DriverType);
