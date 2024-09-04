import { TruckStatus, TruckStatuses } from '@/models/fleet/trucks/truck-status';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TRUCK_STATUS_TO_GRPC_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    truck_id: string;
    truck_status: TruckStatus;
} & ChipSelectTypes.OtherProps;

export default function TruckStatusChipSelect({
    truck_id,
    truck_status,
    ...other_props
}: Props) {
    const [updateStatus] = TrucksGrpcService.useUpdateTruckStatusMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<TruckStatus> = (status) => {
        if (status === truck_status) return;

        updateStatus({
            truckId: truck_id,
            status : TRUCK_STATUS_TO_GRPC_ENUM[status]
        });
    };

    const isDeleted = truck_status === TruckStatuses.DELETED;
    const options = Object.values(TruckStatuses).filter((status) =>
        isDeleted ? true : status !== TruckStatuses.DELETED);

    return (
        <ChipSelect<TruckStatus>
            ignoreWaitingResponse
            status={truck_status}
            options={options}
            onChange={onSelectStatus}
            status_prefix="state_info:trucks.status"
            {...other_props}
        />
    );
}
