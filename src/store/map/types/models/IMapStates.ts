export interface LocationState {
    truck_id: string;
    lat: number;
    lon: number;
    address: string;
    heading: number;
    accuracy: number;
    speed: number;
    timestamp: string;
}

export interface MapLocationStatesResponse {
    location_states: LocationState[];
}
