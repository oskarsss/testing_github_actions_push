import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status,
    ManifestModel_Stop
} from '@proto/models/model_manifest';
import ManifestsTypes from '@/store/dispatch/manifests/types';

export const isCompletedLoadStop = (status: ManifestModel_LoadStop_Status) =>
    [
        ManifestModel_LoadStop_Status.COMPLETED,
        ManifestModel_LoadStop_Status.TONU,
        ManifestModel_LoadStop_Status.CANCELLED
    ].includes(status);

export const isCompletedManifestStop = (status: ManifestModel_ManifestStop_Status) =>
    [
        ManifestModel_ManifestStop_Status.COMPLETED,
        ManifestModel_ManifestStop_Status.CANCELLED
    ].includes(status);

export const isCompletedStop = (stop: ManifestModel_Stop) =>
    stop.loadId
        ? isCompletedLoadStop(stop.loadStopStatus)
        : isCompletedManifestStop(stop.manifestStopStatus);
