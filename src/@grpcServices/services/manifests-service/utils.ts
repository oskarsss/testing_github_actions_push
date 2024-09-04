// import ManifestsTypes from '@/services/dispatch/manifests/types';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import {
    ManifestModel_Manifest,
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status,
    ManifestModel_Status,
    ManifestModel_Stop,
    ManifestModel_ManifestStop_Type
} from '@proto/models/model_manifest';

export const getPrepareStops = (
    stops: ManifestModel_Manifest['stops']
): ManifestsTypes.AnyPreparedStop[] =>
    stops?.map((stop) => ({
        ...stop,
        stopId    : stop.loadStopId || stop.manifestStopId,
        originType: stop.loadId
            ? ManifestsTypes.OriginType.LOAD
            : ManifestsTypes.OriginType.MANIFEST
    })) || [];

const hiddenStops = [ManifestModel_ManifestStop_Type.START, ManifestModel_ManifestStop_Type.END];

export const getPrepareSchedulingStops = (stops: ManifestModel_Manifest['stops']) => {
    const pStops = getPrepareStops(stops);
    return pStops.filter((stop) => {
        if (stop.manifestStopId) {
            return !hiddenStops.includes(stop.manifestStopType);
        }
        return true;
    });
};

export function isCompletedManifest(status: ManifestModel_Status) {
    return ManifestModel_Status.DELIVERED === status;
}

export function isNotChangeManifest(status: ManifestModel_Status) {
    return [
        ManifestModel_Status.DELIVERED,
        ManifestModel_Status.CANCELED,
        ManifestModel_Status.TONU
    ].includes(status);
}

export function getFirstActiveStopLocation(stops?: ManifestModel_Stop[]) {
    if (stops) {
        const firstActiveStop = getFirstActiveStop(stops);
        return firstActiveStop?.location;
    }
}

export function getActiveStopsCount(stops: ManifestModel_Stop[]) {
    return stops?.filter(
        (stop) =>
            [
                ManifestModel_LoadStop_Status.PLANNING,
                ManifestModel_LoadStop_Status.EN_ROUTE,
                ManifestModel_LoadStop_Status.ON_LOCATION,
                ManifestModel_LoadStop_Status.CHECKED_IN
            ].includes(stop.loadStopStatus) ||
            [
                ManifestModel_ManifestStop_Status.EN_ROUTE,
                ManifestModel_ManifestStop_Status.CHECKED_IN,
                ManifestModel_ManifestStop_Status.ON_LOCATION,
                ManifestModel_ManifestStop_Status.PLANNING
            ].includes(stop.manifestStopStatus)
    );
}

export function getFirstActiveStop(stops: ManifestModel_Stop[]) {
    return stops.find(
        (stop) =>
            [
                ManifestModel_LoadStop_Status.PLANNING,
                ManifestModel_LoadStop_Status.EN_ROUTE,
                ManifestModel_LoadStop_Status.ON_LOCATION,
                ManifestModel_LoadStop_Status.CHECKED_IN
            ].includes(stop.loadStopStatus) ||
            [
                ManifestModel_ManifestStop_Status.EN_ROUTE,
                ManifestModel_ManifestStop_Status.CHECKED_IN,
                ManifestModel_ManifestStop_Status.ON_LOCATION,
                ManifestModel_ManifestStop_Status.PLANNING
            ].includes(stop.manifestStopStatus)
    );
}
