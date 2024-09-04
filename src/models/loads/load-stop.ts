import { LoadModel_Stop_Type } from '@proto/models/model_load';

export enum StopStatuses {
    PENDING = 'pending',
    COMPLETED = 'completed',
    EN_ROUTE = 'en_route',
    ON_LOCATION = 'on_location',
    CHECKED_IN = 'checked_in',
    CANCELED = 'canceled',
    TONU = 'tonu'
}

export enum LoadStopTypesEnum {
    PICKUP = 'pickup',
    DROPOFF = 'dropoff',
    PICKUP_DROPOFF = 'pickup_dropoff',
    PICKUP_TRAILER = 'pickup_trailer',
    DROPOFF_TRAILER = 'dropoff_trailer',
    PICKUP_CHASSIS = 'pickup_chassis',
    DROPOFF_CHASSIS = 'dropoff_chassis'
}

export const LoadStopTypes: Record<LoadModel_Stop_Type, LoadStopTypesEnum> = {
    [LoadModel_Stop_Type.pickup]          : LoadStopTypesEnum.PICKUP,
    [LoadModel_Stop_Type.dropoff]         : LoadStopTypesEnum.DROPOFF,
    [LoadModel_Stop_Type.pickup_dropoff]  : LoadStopTypesEnum.PICKUP_DROPOFF,
    [LoadModel_Stop_Type.type_unspecified]: LoadStopTypesEnum.PICKUP,
    [LoadModel_Stop_Type.dropoff_chassis] : LoadStopTypesEnum.DROPOFF_CHASSIS,
    [LoadModel_Stop_Type.pickup_chassis]  : LoadStopTypesEnum.PICKUP_CHASSIS,
    [LoadModel_Stop_Type.pickup_trailer]  : LoadStopTypesEnum.PICKUP_TRAILER,
    [LoadModel_Stop_Type.dropoff_trailer] : LoadStopTypesEnum.DROPOFF_TRAILER
};
