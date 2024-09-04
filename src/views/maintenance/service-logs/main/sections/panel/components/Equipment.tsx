import { memo, useMemo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import ServiceLogPanelInfoSection from '@/views/maintenance/service-logs/main/sections/panel/components/Section';
import infoSectionsConfig from '@/views/maintenance/service-logs/main/sections/panel/components/info-sections-config';
import { useAppSelector } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import WarrantyItemsButton from '@/views/maintenance/service-logs/ui-elements/WarrantyItemsButton';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';

function ServiceLogPanelDetails() {
    const { t } = useAppTranslation();
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);

    const equipmentInfo = useMemo(
        () => infoSectionsConfig.getEquipmentInfo(selectedServiceLog, t),
        [selectedServiceLog, t]
    );

    if (!selectedServiceLog) return;

    const vehicleId =
        selectedServiceLog.vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK
            ? selectedServiceLog.truckId
            : selectedServiceLog.trailerId;

    return (
        <ServiceLogPanelInfoSection
            icon={(
                <VectorIcons.Maintenance.Equipment
                    sx={{
                        fontSize: '24px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />
            )}
            title="common:equipment"
            config={equipmentInfo}
        >
            <WarrantyItemsButton
                vehicleId={vehicleId}
                vehicleType={selectedServiceLog?.vehicleType}
            />
        </ServiceLogPanelInfoSection>
    );
}

export default memo(ServiceLogPanelDetails);
