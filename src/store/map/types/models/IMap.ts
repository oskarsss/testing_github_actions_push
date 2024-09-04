type StatusTruckType =
    | 'compliance_review'
    | 'available'
    | 'working'
    | 'deleted'
    | 'pending_termination'
    | 'terminated'
    | 'onboarding';
type StatusTrailerType = 'active' | 'deleted' | 'offline' | 'attached';
type StatusDriverType =
    | 'terminated'
    | 'active'
    | 'pending_termination'
    | 'compliance_review'
    | 'onboarding'
    | 'deleted';

export interface Truck {
    truck_id: string;
    reference_id: string;
    status: string;
    trailer_id: string;
    driver_id: string;
    lat: number | null;
    lon: number | null;
    heading: number | null;
    timestamp: number | null;
    gps_current: boolean;
}

export interface Stop {
    id: string;
    sequence: number;
    reference_id: string;
    note: string;
    at: any;
    eta: any;
    miles_to_next_stop: any;
    appointment_start_at: string;
    appointment_end_at: string;
    type: string;
    status: string;
    arrived_at: any;
    loaded_at: any;
    unloaded_at: any;
    location_id: string;
    location_name: string;
    location_city: string;
    location_state: string;
    location_address: string;
    location_lat: number;
    location_lon: number;
    waypoint_duration?: number;
    waypoint_at?: string;
}

export interface Load {
    id: string;
    truck_id?: string;
    truck_reference_id: string;
    stops: Stop[];
    directions_polyline?: string;
}

export interface Driver {
    id: string;
    full_name: string;
    status: StatusDriverType;
    lat: number;
    lon: number;
    heading: number;
    created_at: string;
    gps_current: boolean;
}

export interface Trailer {
    id: string;
    reference_id: string;
    status: StatusTrailerType;
    lat: any;
    lon: any;
    heading: any;
    created_at: any;
    gps_current: boolean;
}

export interface MapResponse {
    trucks: Truck[];
    trailers: Trailer[];
    drivers: Driver[];
    loads: Load[];
}
