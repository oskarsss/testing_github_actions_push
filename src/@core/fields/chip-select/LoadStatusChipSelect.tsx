import { CSSProperties, useMemo } from 'react';
import { LoadStatus, LoadStatuses } from '@/models/loads/load';
import LoadsTypes from '@/store/dispatch/loads/types';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';

import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import { api } from '@/store/api';
import { useAppDispatch } from '@/store/hooks';
import { LOAD_STATUS_COLORS, loads_icons_with_width } from '@/@core/theme/entities/load/status';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';

import { LOAD_STATUS_TO_GRPC_ENUM } from '@/models/loads/load-mappings';

type Props = {
    load_id: LoadsTypes.Load.Load['loadId'];
    load_status: LoadStatus;
    styles?: CSSProperties;
    tooltip?: string;
    is_changing?: boolean;
    invalidateFns?: () => void;
    invalidateTags?: ChipSelectTypes.InvalidateTags;
} & ChipSelectTypes.OtherProps;

export default function LoadStatusChipSelect({
    load_id,
    load_status,
    invalidateTags = [],
    invalidateFns,
    ...other_props
}: Props) {
    const dispatch = useAppDispatch();
    const [updateLoadStatus, { isLoading }] = LoadsGrpcService.useUpdateLoadStatusMutation();

    const onChange: ChipSelectTypes.OnChange<LoadStatus> = (status) => {
        updateLoadStatus({
            loadId   : load_id,
            newStatus: LOAD_STATUS_TO_GRPC_ENUM[status]
        })
            .unwrap()
            .then(() => {
                if (invalidateTags?.length > 0) {
                    dispatch(api.util.invalidateTags(invalidateTags));
                }
                if (invalidateFns) {
                    invalidateFns();
                }
            });
    };

    const options = useMemo(
        () =>
            load_status !== 'deleted'
                ? Object.values(LoadStatuses).filter((status) => status !== 'deleted')
                : Object.values(LoadStatuses),
        [load_status]
    );

    return (
        <ChipSelect<LoadStatus>
            status={load_status}
            options={options}
            status_prefix="state_info:loads.status"
            onChange={onChange}
            ignoreWaitingResponse
            custom_icons={loads_icons_with_width(24)}
            custom_colors={LOAD_STATUS_COLORS}
            disabled={isLoading}
            {...other_props}
        />
    );
}
