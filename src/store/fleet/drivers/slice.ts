/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { api } from '@/store/api';

type CriticalNotificationPayload = {
    step: number;
    text: string;
    notification_id: string;
};

type InitialState = {
    isShow: boolean;
    tab_id: DETAILS_TABS_IDS;
    device_id: string;
    coordinates: number[];
    first_render_coordinates: number[];
    critical_notification: CriticalNotificationPayload;
};

const initialState: InitialState = {
    isShow                  : false,
    tab_id                  : DETAILS_TABS_IDS.MAIN_NOTES,
    device_id               : '',
    coordinates             : [],
    first_render_coordinates: [],
    critical_notification   : {
        step           : 0,
        text           : '',
        notification_id: ''
    }
};

const driversSlice = createSlice({
    name    : 'driver',
    initialState,
    reducers: {
        isShowEditDriverDialog(state, action: PayloadAction<boolean>) {
            state.isShow = action.payload;
        },
        selectTab(state, action: PayloadAction<DETAILS_TABS_IDS>) {
            state.tab_id = action.payload;
        },
        selectDeviceId(state, action: PayloadAction<string>) {
            state.device_id = action.payload;
        },
        setCoordinates(state, action: PayloadAction<number[]>) {
            state.coordinates = action.payload;
        },
        setFirstRenderCoordinates(state, action: PayloadAction<number[]>) {
            state.first_render_coordinates = action.payload;
        },
        updateCriticalNotification(state, action: PayloadAction<CriticalNotificationPayload>) {
            state.critical_notification = { ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const DriversReducer = driversSlice.reducer;

export const DriverActions = driversSlice.actions;
