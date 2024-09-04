import ManifestsTypes from '@/store/dispatch/manifests/types';
import {
    ManifestModel_LoadStop_Status,
    ManifestModel_ManifestStop_Status
} from '@proto/models/model_manifest';

export const checkHideButtonCheckIn = (stop: ManifestsTypes.AnyPreparedStop) => {
    let arrivedAt = false;
    let checkedInAt = false;
    let checkedOutAt = false;
    let noCompleted = false;

    if (stop.originType === ManifestsTypes.OriginType.MANIFEST) {
        arrivedAt = ![
            ManifestModel_ManifestStop_Status.ON_LOCATION,
            ManifestModel_ManifestStop_Status.CHECKED_IN,
            ManifestModel_ManifestStop_Status.COMPLETED
        ].includes(stop.manifestStopStatus);
        checkedInAt = ![
            ManifestModel_ManifestStop_Status.CHECKED_IN,
            ManifestModel_ManifestStop_Status.COMPLETED
        ].includes(stop.manifestStopStatus);
        checkedOutAt = stop.manifestStopStatus !== ManifestModel_ManifestStop_Status.COMPLETED;
        noCompleted = stop.manifestStopStatus !== ManifestModel_ManifestStop_Status.COMPLETED;
    }

    if (stop.originType === ManifestsTypes.OriginType.LOAD) {
        arrivedAt = ![
            ManifestModel_LoadStop_Status.ON_LOCATION,
            ManifestModel_LoadStop_Status.CHECKED_IN,
            ManifestModel_LoadStop_Status.COMPLETED
        ].includes(stop.loadStopStatus);
        checkedInAt = ![
            ManifestModel_LoadStop_Status.CHECKED_IN,
            ManifestModel_LoadStop_Status.COMPLETED
        ].includes(stop.loadStopStatus);
        checkedOutAt = stop.loadStopStatus !== ManifestModel_LoadStop_Status.COMPLETED;
        noCompleted = stop.loadStopStatus !== ManifestModel_LoadStop_Status.COMPLETED;
    }

    return {
        arrivedAt,
        checkedInAt,
        checkedOutAt,
        noCompleted
    };
};
