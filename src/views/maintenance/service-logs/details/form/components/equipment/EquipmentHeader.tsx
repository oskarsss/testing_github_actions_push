import { memo, type SyntheticEvent } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import WarrantyItemsButton from '@/views/maintenance/service-logs/ui-elements/WarrantyItemsButton';
import { useWatch } from 'react-hook-form';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useServiceLogForm } from '@/views/maintenance/service-logs/details/form';
import VehicleTabs from '@/views/maintenance/service-logs/ui-elements/VehicleTabs';

function EquipmentHeader() {
    const { t } = useAppTranslation();

    const {
        control,
        setValue
    } = useServiceLogForm();

    const vehicleType = useWatch({
        control,
        name: 'vehicleType'
    });

    const truckId = useWatch({
        control,
        name: 'truckId'
    });

    const trailerId = useWatch({
        control,
        name: 'trailerId'
    });

    const handleChange = (
        e: SyntheticEvent<Element>,
        value: VehicleMaintenanceModel_VehicleType
    ) => {
        setValue('vehicleType', value);
    };

    return (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            xs={12}
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="15px"
            >
                <VectorIcons.Maintenance.Equipment
                    sx={{
                        fontSize: '32px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {t('common:equipment')}
                </Typography>

                <WarrantyItemsButton
                    vehicleType={vehicleType}
                    vehicleId={
                        vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK
                            ? truckId
                            : trailerId
                    }
                />
            </Stack>

            <VehicleTabs
                vehicleType={vehicleType}
                handleChange={handleChange}
            />
        </Grid>
    );
}

export default memo(EquipmentHeader);
