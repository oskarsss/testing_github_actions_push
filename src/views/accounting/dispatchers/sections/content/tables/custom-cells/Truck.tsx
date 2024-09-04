import { Stack, Typography } from '@mui/material';
import Dispatch from '@/store/accounting/dispatchers/types';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    truck: Dispatch.Truck;
};

function Truck({ truck }: Props) {
    const { t } = useAppTranslation();
    const driverIcon = DRIVER_TYPE_ICONS[truck?.driver?.type_icon || DriverTypeModel_Icon.DEFAULT];
    const truckIcon = TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck?.type]];

    return truck?.truck_id ? (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
            sx={{
                svg: {
                    width : '24px',
                    height: '24px'
                }
            }}
        >
            {truckIcon}

            <Stack
                gap="2px"
                direction="row"
                alignItems="center"
                sx={{
                    svg: {
                        width : '12px',
                        height: '12px'
                    }
                }}
            >
                <Typography
                    variant="body1"
                    color="semantic.text.secondary"
                    fontSize="12px"
                    fontWeight={500}
                >
                    #{truck?.referenceId}
                </Typography>

                {driverIcon}
            </Stack>
        </Stack>
    ) : (
        <Typography
            variant="body1"
            color="semantic.text.secondary"
            fontSize="12px"
            fontWeight={500}
        >
            {t('common:empty.no_truck')}
        </Typography>
    );
}

export default memo(Truck);
