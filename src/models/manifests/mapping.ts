import { ManifestModel_Status } from '@proto/models/model_manifest';
import {
    ManifestFilterStatus,
    ManifestFilterStatuses,
    ManifestStatus,
    ManifestStatuses
} from './manifest';

export const MANIFEST_STATUS_GRPC_ENUM: Record<ManifestModel_Status, ManifestStatus> =
    Object.freeze({
        [ManifestModel_Status.UNSPECIFIED]: ManifestStatuses.DELETED,
        [ManifestModel_Status.ASSIGNED]   : ManifestStatuses.ASSIGNED,
        [ManifestModel_Status.DELIVERED]  : ManifestStatuses.DELIVERED,
        [ManifestModel_Status.CANCELED]   : ManifestStatuses.CANCELED,
        [ManifestModel_Status.IN_PROGRESS]: ManifestStatuses.IN_PROGRESS,
        [ManifestModel_Status.PLANNING]   : ManifestStatuses.PLANNING,
        [ManifestModel_Status.DELETED]    : ManifestStatuses.DELETED,
        [ManifestModel_Status.TONU]       : ManifestStatuses.TONNU
    });

export const MANIFEST_STATUS_TO_GRPC_ENUM: Record<ManifestStatus, ManifestModel_Status> =
    Object.freeze({
        [ManifestStatuses.DELETED]    : ManifestModel_Status.DELETED,
        [ManifestStatuses.ASSIGNED]   : ManifestModel_Status.ASSIGNED,
        [ManifestStatuses.DELIVERED]  : ManifestModel_Status.DELIVERED,
        [ManifestStatuses.CANCELED]   : ManifestModel_Status.CANCELED,
        [ManifestStatuses.IN_PROGRESS]: ManifestModel_Status.IN_PROGRESS,
        [ManifestStatuses.PLANNING]   : ManifestModel_Status.PLANNING,
        [ManifestStatuses.TONNU]      : ManifestModel_Status.TONU
    });

export const FORMATTED_MANIFEST_STATUS_TO_GRPC_ENUM: Record<
    ManifestFilterStatus,
    ManifestModel_Status
> = {
    [ManifestFilterStatuses.STATUS_ASSIGNED]   : ManifestModel_Status.ASSIGNED,
    [ManifestFilterStatuses.STATUS_PLANNING]   : ManifestModel_Status.PLANNING,
    [ManifestFilterStatuses.STATUS_IN_PROGRESS]: ManifestModel_Status.IN_PROGRESS,
    [ManifestFilterStatuses.STATUS_DELIVERED]  : ManifestModel_Status.DELIVERED,
    [ManifestFilterStatuses.STATUS_CANCELED]   : ManifestModel_Status.CANCELED,
    [ManifestFilterStatuses.STATUS_DELETED]    : ManifestModel_Status.DELETED,
    [ManifestFilterStatuses.STATUS_UNSPECIFIED]: ManifestModel_Status.UNSPECIFIED,
    [ManifestFilterStatuses.STATUS_TONNU]      : ManifestModel_Status.TONU
};

export const FORMATTED_MANIFEST_STATUS: Record<ManifestModel_Status, ManifestFilterStatus> = {
    [ManifestModel_Status.ASSIGNED]   : ManifestFilterStatuses.STATUS_ASSIGNED,
    [ManifestModel_Status.PLANNING]   : ManifestFilterStatuses.STATUS_PLANNING,
    [ManifestModel_Status.IN_PROGRESS]: ManifestFilterStatuses.STATUS_IN_PROGRESS,
    [ManifestModel_Status.DELIVERED]  : ManifestFilterStatuses.STATUS_DELIVERED,
    [ManifestModel_Status.CANCELED]   : ManifestFilterStatuses.STATUS_CANCELED,
    [ManifestModel_Status.DELETED]    : ManifestFilterStatuses.STATUS_DELETED,
    [ManifestModel_Status.UNSPECIFIED]: ManifestFilterStatuses.STATUS_UNSPECIFIED,
    [ManifestModel_Status.TONU]       : ManifestFilterStatuses.STATUS_TONNU
};

export type manifestStatuses =
    (typeof FORMATTED_MANIFEST_STATUS)[keyof typeof FORMATTED_MANIFEST_STATUS];
