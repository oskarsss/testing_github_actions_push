/* eslint-disable no-param-reassign */
import { api } from '@/store/api';
import { Event_Truck_ManifestRoute_Stop } from '@proto/events/events';
import {
    ListenReply_DriverDeviceLocations,
    ListenReply_DriverPings,
    ListenReply_TrailerLocations,
    ListenReply_TruckDiagnostics,
    ListenReply_TruckLocations,
    ListenReply_TruckRoutes,
    ListenReply_UserPings
} from '@proto/events_serv';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export namespace EventsTypes {
    export type ManifestTruckRouteStops = (Event_Truck_ManifestRoute_Stop & {
        localeStopId: string;
        loadId: string;
    })[];
    export type ManifestTruckRouteItem = {
        truckId: string;

        stops: ManifestTruckRouteStops;
    };

    export type DriverDeviceLocations = Record<
        string,
        Record<string, ListenReply_DriverDeviceLocations['locations'][0]>
    >;
    export type DriverDevicePings = Record<
        string,
        Record<string, ListenReply_DriverPings['pings'][0]>
    >;
    export type TrailerLocations = Record<string, ListenReply_TrailerLocations['locations'][0]>;
    export type TrucksDiagnostics = Record<string, ListenReply_TruckDiagnostics['diagnostics'][0]>;
    export type TruckLocations = Record<string, ListenReply_TruckLocations['locations'][0]>;
    export type TruckRoutes = Record<string, ListenReply_TruckRoutes['routes'][0]>;
    export type UsersPing = Record<string, ListenReply_UserPings['pings'][0]>;

    export type TrucksRoutes = Record<string, ListenReply_TruckRoutes['routes'][0]>;

    export type ManifestTruckRoute = Record<string, ManifestTruckRouteStops>;
}

type InitialState = {
    driverDeviceLocations: EventsTypes.DriverDeviceLocations;
    driverDevicePings: EventsTypes.DriverDevicePings;
    trailerLocations: EventsTypes.TrailerLocations;
    trucksDiagnostics: EventsTypes.TrucksDiagnostics;
    truckLocations: EventsTypes.TruckLocations;
    truckRoutes: EventsTypes.TruckRoutes;
    usersPing: EventsTypes.UsersPing;
    trucksRoutes: EventsTypes.TrucksRoutes;
    manifestTruckRoutes: EventsTypes.ManifestTruckRoute;
};

export const initialState: InitialState = {
    driverDeviceLocations: {},
    driverDevicePings    : {},
    trailerLocations     : {},
    trucksDiagnostics    : {},
    truckLocations       : {},
    truckRoutes          : {},
    usersPing            : {},
    trucksRoutes         : {},
    manifestTruckRoutes  : {}
};

const eventsSlice = createSlice({
    name    : 'events',
    initialState,
    reducers: {
        setDriverDeviceLocations(
            state,
            action: PayloadAction<InitialState['driverDeviceLocations']>
        ) {
            state.driverDeviceLocations = { ...state.driverDeviceLocations, ...action.payload };
        },
        setDriverDevicePings(state, action: PayloadAction<InitialState['driverDevicePings']>) {
            state.driverDevicePings = { ...state.driverDevicePings, ...action.payload };
        },
        setTrailerLocations(state, action: PayloadAction<InitialState['trailerLocations']>) {
            state.trailerLocations = { ...state.trailerLocations, ...action.payload };
        },
        setTrucksDiagnostics(state, action: PayloadAction<InitialState['trucksDiagnostics']>) {
            state.trucksDiagnostics = { ...state.trucksDiagnostics, ...action.payload };
        },
        setTruckLocations(state, action: PayloadAction<InitialState['truckLocations']>) {
            state.truckLocations = { ...state.truckLocations, ...action.payload };
        },
        setTruckRoutes(state, action: PayloadAction<InitialState['truckRoutes']>) {
            state.truckRoutes = { ...state.truckRoutes, ...action.payload };
        },
        setUsersPing(state, action: PayloadAction<InitialState['usersPing']>) {
            state.usersPing = { ...state.usersPing, ...action.payload };
        },
        setTrucksRoutes(state, action: PayloadAction<InitialState['trucksRoutes']>) {
            state.trucksRoutes = { ...state.trucksRoutes, ...action.payload };
        },
        setManifestTruckRoutes(state, action: PayloadAction<InitialState['manifestTruckRoutes']>) {
            state.manifestTruckRoutes = { ...state.manifestTruckRoutes, ...action.payload };
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const EventsReducer = eventsSlice.reducer;

export const EventsActions = eventsSlice.actions;
