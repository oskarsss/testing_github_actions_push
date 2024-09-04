import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import DriversTypes from '@/store/fleet/drivers/types';
import { DriverStatus, DriverStatuses } from '@/models/fleet/drivers/driver-status';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DRIVER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';

type Props = {
    driver_id: DriversTypes.Driver['driverId'];
    driver_status: DriverStatus;
} & ChipSelectTypes.OtherProps;

export default function DriverStatusChipSelect({
    driver_id,
    driver_status,
    ...props
}: Props) {
    const [updateDriverStatus] = DriversGrpcService.useUpdateDriverStatusMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<DriverStatus> = (status) => {
        if (status === driver_status) return;

        updateDriverStatus({
            driverId: driver_id,
            status  : DRIVER_STATUS_TO_GRPC_ENUM[status]
        });
    };

    const options =
        driver_status !== 'deleted'
            ? Object.values(DriverStatuses).filter((status) => status !== 'deleted')
            : Object.values(DriverStatuses);

    return (
        <ChipSelect<DriverStatus>
            status={driver_status}
            options={options}
            ignoreWaitingResponse
            onChange={onSelectStatus}
            status_prefix="state_info:drivers.full_status"
            {...props}
        />
    );
}
