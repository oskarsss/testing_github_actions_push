import { TrailerStatus, TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { TRAILER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/trailers/trailers-mappings';

type Props = {
    trailer_id: string;
    trailer_status: TrailerStatus;
} & ChipSelectTypes.OtherProps;

export default function TrailerStatusChipSelect({
    trailer_id,
    trailer_status,
    ...other_props
}: Props) {
    const [updateStatus] = TrailersGrpcService.useTrailerStatusUpdateMutation();

    const onSelectStatus: ChipSelectTypes.OnChange<TrailerStatus> = (status) => {
        if (status === trailer_status) return;

        updateStatus({
            trailerId: trailer_id,
            status   : TRAILER_STATUS_TO_GRPC_ENUM[status]
        });
    };

    const isDeleted = trailer_status === TrailerStatuses.DELETED;

    const options = Object.values(TrailerStatuses).filter((status) =>
        isDeleted ? true : status !== TrailerStatuses.DELETED);

    return (
        <ChipSelect<TrailerStatus>
            status={trailer_status}
            options={options}
            ignoreWaitingResponse
            onChange={onSelectStatus}
            status_prefix="state_info:trailers.status"
            {...other_props}
        />
    );
}
