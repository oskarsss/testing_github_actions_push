import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { TruckModel_Truck } from '@proto/models/model_truck';
import TruckProfileHeaderTopContent from './TruckProfileHeaderTopContent';
import TruckTripInformation from './TruckTripInformation';

type Props = {
    truck: TruckModel_Truck;
};

export default function TruckProfileHeader({ truck }: Props) {
    return (
        <LeftStyled.CardContentHeader>
            <TruckProfileHeaderTopContent
                truck_id={truck.truckId}
                reference_id={truck.referenceId}
                status={truck.status}
                type={truck.type}
            />

            <TruckTripInformation truck={truck} />
        </LeftStyled.CardContentHeader>
    );
}
