import React from 'react';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { ManifestModel_ManifestStop_Status } from '@proto/models/model_manifest';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import {
    MANIFEST_STOP_STATUS_COLORS,
    MANIFEST_STOP_STATUS_ICONS
} from '@/@core/theme/entities/manifests/stop-status';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';

type Props = {
    status?: ManifestModel_ManifestStop_Status;
    stopId: string;
    loadId: string;
    manifestId: string;
    onSuccessfulUpdate?: (stopId: string) => void;
} & ChipSelectTypes.OtherProps;

const OPTIONS_MAP: Record<number, ManifestModel_ManifestStop_Status> = {
    [ManifestModel_ManifestStop_Status.CANCELLED]  : ManifestModel_ManifestStop_Status.CANCELLED,
    [ManifestModel_ManifestStop_Status.COMPLETED]  : ManifestModel_ManifestStop_Status.COMPLETED,
    [ManifestModel_ManifestStop_Status.EN_ROUTE]   : ManifestModel_ManifestStop_Status.EN_ROUTE,
    [ManifestModel_ManifestStop_Status.PLANNING]   : ManifestModel_ManifestStop_Status.PLANNING,
    [ManifestModel_ManifestStop_Status.CHECKED_IN] : ManifestModel_ManifestStop_Status.CHECKED_IN,
    [ManifestModel_ManifestStop_Status.ON_LOCATION]: ManifestModel_ManifestStop_Status.ON_LOCATION
};

function ManifestStopStatusChipSelect({
    status,
    manifestId,
    stopId,
    onSuccessfulUpdate,
    loadId,
    ...rest
}: Props) {
    const options = Object.values(OPTIONS_MAP);

    const [trigger] = ManifestStopsGrpcService.useUpdateManifestStopStatusMutation();

    const onChange: ChipSelectTypes.OnChange<ManifestModel_ManifestStop_Status> = (status) => {
        trigger({
            manifestId,
            loadId,
            stopStatusUpdates: {
                stopId: {
                    oneofKind   : 'manifestStop',
                    manifestStop: {
                        manifestStopId: stopId,
                        status
                    }
                }
            }
        })
            .unwrap()
            .then(() => {
                onSuccessfulUpdate?.(stopId);
            });
    };

    if (!status) return null;
    return (
        <ChipSelect
            status={status}
            options={options}
            ignoreWaitingResponse
            status_prefix="state_info:stop.manifest_stop_status"
            onChange={onChange}
            custom_icons={MANIFEST_STOP_STATUS_ICONS}
            custom_colors={MANIFEST_STOP_STATUS_COLORS}
            {...rest}
        />
    );
}

export default ManifestStopStatusChipSelect;
