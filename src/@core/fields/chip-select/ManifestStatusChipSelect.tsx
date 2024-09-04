import React from 'react';
import ChipSelect from '@/@core/fields/chip-select/components/ChipSelect';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';
import {
    MANIFEST_STATUS_GRPC_ENUM,
    MANIFEST_STATUS_TO_GRPC_ENUM
} from '@/models/manifests/mapping';
import {
    MANIFEST_STATUS_COLORS,
    MANIFEST_STATUS_GRPC_COLORS,
    MANIFEST_STATUS_GRPC_ICONS,
    MANIFEST_STATUS_ICONS
} from '@/@core/theme/entities/manifests/status';
import { ManifestStatus, ManifestStatuses } from '@/models/manifests/manifest';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';

type Props = {
    status: ManifestModel_Status;
    manifestId: string;
    onResponse?: () => void;
} & ChipSelectTypes.OtherProps;

const OPTIONS_MAP: Record<number, ManifestModel_Status> = {
    [ManifestModel_Status.PLANNING]   : ManifestModel_Status.PLANNING,
    [ManifestModel_Status.ASSIGNED]   : ManifestModel_Status.ASSIGNED,
    [ManifestModel_Status.IN_PROGRESS]: ManifestModel_Status.IN_PROGRESS,
    [ManifestModel_Status.DELIVERED]  : ManifestModel_Status.DELIVERED,
    [ManifestModel_Status.CANCELED]   : ManifestModel_Status.CANCELED,
    [ManifestModel_Status.TONU]       : ManifestModel_Status.TONU
};

function ManifestStatusChipSelect({
    status,
    manifestId,
    onResponse: callbackFn,
    ...rest
}: Props) {
    const [trigger, { isLoading }] = ManifestsGrpcService.useUpdateManifestStatusMutation();

    const options = Object.values(OPTIONS_MAP);

    const onChange: ChipSelectTypes.OnChange<ManifestModel_Status> = async (status) => {
        await trigger({
            manifestId,
            status
        }).unwrap();
        callbackFn?.();
    };
    return (
        <div
            style={{
                display   : 'flex',
                alignItems: 'center',
                height    : '100%'
            }}
        >
            <ChipSelect<ManifestModel_Status>
                status={status}
                ignoreWaitingResponse
                options={options}
                status_prefix="state_info:manifests.status"
                onChange={onChange}
                custom_colors={MANIFEST_STATUS_GRPC_COLORS}
                custom_icons={MANIFEST_STATUS_GRPC_ICONS}
                {...rest}
            />
        </div>
    );
}

export default ManifestStatusChipSelect;
