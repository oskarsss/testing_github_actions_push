import { ManifestStatus, ManifestStatuses } from '@/models/manifests/manifest';
import VectorIcons from '@/@core/icons/vector_icons';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import React from 'react';
import { COLORS, IChipColors } from '../../chip';

export const MANIFEST_STATUS_COLORS: Record<ManifestStatus, IChipColors> = {
    [ManifestStatuses.ASSIGNED]   : COLORS.warning,
    [ManifestStatuses.DELIVERED]  : COLORS.success,
    [ManifestStatuses.CANCELED]   : COLORS.error,
    [ManifestStatuses.IN_PROGRESS]: COLORS.blue_dark,
    [ManifestStatuses.PLANNING]   : COLORS.yellow,
    [ManifestStatuses.DELETED]    : COLORS.gray,
    [ManifestStatuses.TONNU]      : COLORS.pink
};

export const MANIFEST_STATUS_ICONS: Record<ManifestStatus, React.ReactElement> = {
    [ManifestStatuses.ASSIGNED]   : <VectorIcons.Manifests.Assigned />,
    [ManifestStatuses.DELIVERED]  : <VectorIcons.Manifests.Completed />,
    [ManifestStatuses.CANCELED]   : <VectorIcons.Manifests.Canceled />,
    [ManifestStatuses.IN_PROGRESS]: <VectorIcons.Manifests.Moving />,
    [ManifestStatuses.PLANNING]   : <VectorIcons.Manifests.Planning />,
    [ManifestStatuses.DELETED]    : <VectorIcons.Manifests.Deleted />,
    [ManifestStatuses.TONNU]      : <VectorIcons.Manifests.Canceled />
} as const;

export const MANIFEST_STATUS_GRPC_ICONS: Record<ManifestModel_Status, React.ReactElement> = {
    [ManifestModel_Status.ASSIGNED]   : <VectorIcons.Manifests.Assigned />,
    [ManifestModel_Status.DELIVERED]  : <VectorIcons.Manifests.Completed />,
    [ManifestModel_Status.CANCELED]   : <VectorIcons.Manifests.Canceled />,
    [ManifestModel_Status.IN_PROGRESS]: <VectorIcons.Manifests.Moving />,
    [ManifestModel_Status.PLANNING]   : <VectorIcons.Manifests.Planning />,
    [ManifestModel_Status.DELETED]    : <VectorIcons.Manifests.Deleted />,
    [ManifestModel_Status.UNSPECIFIED]: <VectorIcons.Manifests.Deleted />,
    [ManifestModel_Status.TONU]       : <VectorIcons.Manifests.Canceled />
} as const;

export const MANIFEST_STATUS_GRPC_COLORS: Record<ManifestModel_Status, IChipColors> = {
    [ManifestModel_Status.ASSIGNED]   : COLORS.warning,
    [ManifestModel_Status.DELIVERED]  : COLORS.success,
    [ManifestModel_Status.CANCELED]   : COLORS.error,
    [ManifestModel_Status.IN_PROGRESS]: COLORS.blue_dark,
    [ManifestModel_Status.PLANNING]   : COLORS.yellow,
    [ManifestModel_Status.DELETED]    : COLORS.gray,
    [ManifestModel_Status.UNSPECIFIED]: COLORS.gray,
    [ManifestModel_Status.TONU]       : COLORS.pink
};

// available  : COLORS.yellow,
// pending    : COLORS.yellow,
// assigned   : COLORS.warning,
// in_progress: COLORS.blue_dark,
// delivered  : COLORS.success,
// canceled   : COLORS.error,
// tonu       : COLORS.pink,
// deleted    : COLORS.gray
