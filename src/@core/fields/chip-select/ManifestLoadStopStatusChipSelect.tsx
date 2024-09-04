import React from 'react';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { ManifestModel_LoadStop_Status } from '@proto/models/model_manifest';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import {
    MANIFEST_LOAD_STOP_ICONS,
    MANIFEST_LOAD_STOP_STATUS_COLORS
} from '@/@core/theme/entities/manifests/stop-status';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';

type Props = {
    status?: ManifestModel_LoadStop_Status;
    stopId: string;
    loadId: string;
    manifestId: string;
    onSuccessfulUpdate?: (stopId: string) => void;
} & ChipSelectTypes.OtherProps;

const OPTIONS_MAP: Record<number, ManifestModel_LoadStop_Status> = {
    [ManifestModel_LoadStop_Status.CANCELLED]  : ManifestModel_LoadStop_Status.CANCELLED,
    [ManifestModel_LoadStop_Status.COMPLETED]  : ManifestModel_LoadStop_Status.COMPLETED,
    [ManifestModel_LoadStop_Status.EN_ROUTE]   : ManifestModel_LoadStop_Status.EN_ROUTE,
    [ManifestModel_LoadStop_Status.PLANNING]   : ManifestModel_LoadStop_Status.PLANNING,
    [ManifestModel_LoadStop_Status.CHECKED_IN] : ManifestModel_LoadStop_Status.CHECKED_IN,
    [ManifestModel_LoadStop_Status.ON_LOCATION]: ManifestModel_LoadStop_Status.ON_LOCATION,
    [ManifestModel_LoadStop_Status.TONU]       : ManifestModel_LoadStop_Status.TONU
};

function ManifestLoadStopStatusChipSelect({
    status,
    stopId,
    loadId,
    manifestId,
    onSuccessfulUpdate,
    ...rest
}: Props) {
    const options = Object.values(OPTIONS_MAP);

    const [trigger] = ManifestStopsGrpcService.useUpdateManifestStopStatusMutation();

    const onChange: ChipSelectTypes.OnChange<ManifestModel_LoadStop_Status> = (status) => {
        trigger({
            manifestId,
            loadId,
            stopStatusUpdates: {
                stopId: {
                    oneofKind: 'loadStop',
                    loadStop : {
                        loadId,
                        stopId,
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
            status_prefix="state_info:stop.load_stop_status"
            onChange={onChange}
            custom_icons={MANIFEST_LOAD_STOP_ICONS}
            custom_colors={MANIFEST_LOAD_STOP_STATUS_COLORS}
            {...rest}
        />
    );
}

export default ManifestLoadStopStatusChipSelect;
