import { TruckStatuses } from '@/models/fleet/trucks/truck-status';
import { DriverStatuses } from '@/models/fleet/drivers/driver-status';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';

export enum TypeParams {
    TRUCK_TO_TRAILER = 'truck_to_trailer',
    TRUCK_TO_DRIVER = 'truck_to_driver',
    SELECT_TRUCK = 'select_truck',
    DRIVER = 'driver',
    TRAILER = 'trailer',
    TRUCK = 'truck',
    VENDOR = 'vendor'
}

const activeTruckStatuses = [
    TruckStatuses.ONBOARDING,
    TruckStatuses.ACTIVE,
    TruckStatuses.INACTIVE,
    TruckStatuses.PENDING_TERMINATED
];

const activeDriverStatuses = [
    DriverStatuses.ONBOARDING,
    DriverStatuses.COMPLIANCE_REVIEW,
    DriverStatuses.ACTIVE,
    DriverStatuses.PENDING_TERMINATED
];

const activeTrailerStatuses = [TrailerStatuses.ACTIVE, TrailerStatuses.OFFLINE];

const filtered_config: Record<TypeParams, object> = {
    truck  : {},
    trailer: {
        status : activeTrailerStatuses,
        truckId: ''
    },
    driver: {
        status : activeDriverStatuses,
        truckId: ''
    },
    truck_to_trailer: {
        trailerId: '',
        status   : activeTruckStatuses
    },
    truck_to_driver: {
        driverId: '',
        status  : activeTruckStatuses
    },
    select_truck: {
        status: activeTruckStatuses
    },
    vendor: {}
};

function itemMatchesConfig<T>(item: T, config: object): boolean {
    return Object.entries(config).every(([key, value]) => {
        if (Array.isArray(value)) {
            return value.includes(item[key as keyof T]);
        }
        return item[key as keyof T] === value;
    });
}

function getFilteredData<T>(data: T[] | null, type: TypeParams): T[] {
    if (!data) return [];
    const config = filtered_config[type];
    if (!config) return data;

    return data.filter((item) => itemMatchesConfig<T>(item, config));
}

export default getFilteredData;
