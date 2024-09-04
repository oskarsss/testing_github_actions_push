import {
    ManifestModel_ManifestStop_Status,
    ManifestModel_ManifestStop_Type
} from '@proto/models/model_manifest';

export const ManifestStopStatuses = {
    [ManifestModel_ManifestStop_Status.CANCELLED]  : 'cancelled',
    [ManifestModel_ManifestStop_Status.COMPLETED]  : 'completed',
    [ManifestModel_ManifestStop_Status.EN_ROUTE]   : 'en_route',
    [ManifestModel_ManifestStop_Status.DELETED]    : 'deleted',
    [ManifestModel_ManifestStop_Status.PLANNING]   : 'planning',
    [ManifestModel_ManifestStop_Status.UNSPECIFIED]: 'unspecified',
    [ManifestModel_ManifestStop_Status.CHECKED_IN] : 'checked_in',
    [ManifestModel_ManifestStop_Status.ON_LOCATION]: 'on_location'
} as const;

export enum ManifestStopTypesEnum {
    PICKUP = 'pickup',
    DROPOFF = 'dropoff',
    PICKUP_DROPOFF = 'pickup_dropoff',
    PICKUP_TRAILER = 'pickup_trailer',
    DROPOFF_TRAILER = 'dropoff_trailer',
    PICKUP_CHASSIS = 'pickup_chassis',
    DROPOFF_CHASSIS = 'dropoff_chassis',
    BORDER_CROSSING = 'border_crossing',
    START = 'start',
    END = 'end'
}

export const ManifestStopTypes: Record<ManifestModel_ManifestStop_Type, ManifestStopTypesEnum> = {
    [ManifestModel_ManifestStop_Type.DROPOFF]        : ManifestStopTypesEnum.DROPOFF,
    [ManifestModel_ManifestStop_Type.PICKUP]         : ManifestStopTypesEnum.PICKUP,
    [ManifestModel_ManifestStop_Type.PICKUP_DROPOFF] : ManifestStopTypesEnum.PICKUP_DROPOFF,
    [ManifestModel_ManifestStop_Type.UNSPECIFIED]    : ManifestStopTypesEnum.PICKUP,
    [ManifestModel_ManifestStop_Type.DROPOFF_CHASSIS]: ManifestStopTypesEnum.DROPOFF_CHASSIS,
    [ManifestModel_ManifestStop_Type.PICKUP_CHASSIS] : ManifestStopTypesEnum.PICKUP_CHASSIS,
    [ManifestModel_ManifestStop_Type.PICKUP_TRAILER] : ManifestStopTypesEnum.PICKUP_TRAILER,
    [ManifestModel_ManifestStop_Type.DROPOFF_TRAILER]: ManifestStopTypesEnum.DROPOFF_TRAILER,
    [ManifestModel_ManifestStop_Type.BORDER_CROSSING]: ManifestStopTypesEnum.BORDER_CROSSING,
    [ManifestModel_ManifestStop_Type.START]          : ManifestStopTypesEnum.START,
    [ManifestModel_ManifestStop_Type.END]            : ManifestStopTypesEnum.END
};

export const ManifestStopTypeToGRPC: Record<
    ManifestStopTypesEnum,
    ManifestModel_ManifestStop_Type
> = {
    [ManifestStopTypesEnum.DROPOFF]        : ManifestModel_ManifestStop_Type.DROPOFF,
    [ManifestStopTypesEnum.PICKUP]         : ManifestModel_ManifestStop_Type.PICKUP,
    [ManifestStopTypesEnum.PICKUP_DROPOFF] : ManifestModel_ManifestStop_Type.PICKUP_DROPOFF,
    [ManifestStopTypesEnum.PICKUP_TRAILER] : ManifestModel_ManifestStop_Type.PICKUP_TRAILER,
    [ManifestStopTypesEnum.DROPOFF_TRAILER]: ManifestModel_ManifestStop_Type.DROPOFF_TRAILER,
    [ManifestStopTypesEnum.PICKUP_CHASSIS] : ManifestModel_ManifestStop_Type.PICKUP_CHASSIS,
    [ManifestStopTypesEnum.DROPOFF_CHASSIS]: ManifestModel_ManifestStop_Type.DROPOFF_CHASSIS,
    [ManifestStopTypesEnum.BORDER_CROSSING]: ManifestModel_ManifestStop_Type.BORDER_CROSSING,
    [ManifestStopTypesEnum.START]          : ManifestModel_ManifestStop_Type.START,
    [ManifestStopTypesEnum.END]            : ManifestModel_ManifestStop_Type.END
};
