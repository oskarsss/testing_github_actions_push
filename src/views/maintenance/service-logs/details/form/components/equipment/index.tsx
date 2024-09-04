import { memo } from 'react';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useServiceLogForm } from '@/views/maintenance/service-logs/details/form';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import TrailersSelect from '@/@core/fields/select/trailer-select/TrailersSelect';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { useWatch } from 'react-hook-form';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EquipmentHeader from './EquipmentHeader';

function Equipment() {
    const { t } = useAppTranslation();
    const { control } = useServiceLogForm();

    const vehicleType = useWatch({
        control,
        name: 'vehicleType'
    });

    return (
        <>
            <EquipmentHeader />

            {vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK ? (
                <>
                    <FullDialog.Field xs={6}>
                        <TruckSelect
                            name="truckId"
                            control={control}
                            label="entity:truck"
                            required
                        />
                    </FullDialog.Field>

                    <FullDialog.Field xs={3}>
                        <NumericInput
                            control={control}
                            name="odometerMiles"
                            placeholder="maintenance:service_logs.modals.form.sections.equipment.fields.odometer.placeholder"
                            label="maintenance:service_logs.modals.form.sections.equipment.fields.odometer.label"
                            width="100%"
                            endAdornment={t('common:mi')}
                        />
                    </FullDialog.Field>

                    <FullDialog.Field xs={3}>
                        <NumericInput
                            control={control}
                            name="engineHours"
                            placeholder="maintenance:service_logs.modals.form.sections.equipment.fields.engine_hours.placeholder"
                            label="maintenance:service_logs.modals.form.sections.equipment.fields.engine_hours.label"
                            width="100%"
                            endAdornment={t('common:time.short.h')}
                        />
                    </FullDialog.Field>
                </>
            ) : (
                <FullDialog.Field xs={12}>
                    <TrailersSelect
                        name="trailerId"
                        control={control}
                        label="entity:trailer"
                        required
                    />
                </FullDialog.Field>
            )}
        </>
    );
}

export default memo(Equipment);
