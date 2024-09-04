import { PlateStatus, PlateStatuses } from '@/models/fleet/plates/plate-status';
import PlatesTypes from '@/store/fleet/plates/types';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import PlatesGrpcService, { PlateStatusGrpcReverse } from '@/@grpcServices/services/plates.service';

type Props = {
    plate_id: PlatesTypes.Plate['plate_id'];
    plate_status: PlateStatus;
} & ChipSelectTypes.OtherProps;

export default function PlateStatusChipSelect({
    plate_id,
    plate_status,
    ...other_props
}: Props) {
    const [updateStatus] = PlatesGrpcService.useUpdatePlateStatusMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<PlateStatus> = (status) => {
        if (status === plate_status) return;

        updateStatus({
            plateId: plate_id,
            status : PlateStatusGrpcReverse[status]
        });
    };

    return (
        <ChipSelect<PlateStatus>
            status={plate_status}
            options={Object.values(PlateStatuses)}
            status_prefix="state_info:plates.status"
            onChange={onSelectStatus}
            {...other_props}
        />
    );
}
