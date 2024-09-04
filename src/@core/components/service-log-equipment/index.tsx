import { memo } from 'react';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import Truck from '@/@core/components/service-log-equipment/Truck';
import Trailer from '@/@core/components/service-log-equipment/Trailer';

type Props = {
    vehicleType: VehicleMaintenanceModel_VehicleType;
    truckId: string;
    trailerId: string;
    fontSize?: string;
};

function Equipment({
    vehicleType,
    truckId,
    trailerId,
    fontSize = '12px'
}: Props) {
    const isTruck = vehicleType === VehicleMaintenanceModel_VehicleType.TRUCK;

    if (isTruck) {
        return (
            <Truck
                truckId={truckId}
                fontSize={fontSize}
            />
        );
    }

    return (
        <Trailer
            trailerId={trailerId}
            fontSize={fontSize}
        />
    );
}

export default memo(Equipment);
