/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import App from '@/store/app/types';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import { AUTHORIZED_USER } from '../auth/api';
import { api } from '../api';

export type InitialState = {
    token: string;
    company_id: string;
    isHideOnboarding: boolean;
    currentAppVersion: null | number;
};

const initialState: InitialState = {
    token            : '',
    company_id       : '',
    isHideOnboarding : false,
    currentAppVersion: null
};

const appSlice = createSlice({
    name    : 'app',
    initialState,
    reducers: {
        SelectCompany(state, action: PayloadAction<string>) {
            state.company_id = action.payload;
            localStorage.setItem(AUTHORIZED_USER.COMPANY_ID, action.payload);
        },
        SetToken(state, action: PayloadAction<App.Redux.Actions.SetTokenPayload>) {
            localStorage.setItem(AUTHORIZED_USER.ID_TOKEN, action.payload);
            state.token = action.payload;
        },
        Logout() {
            return { ...initialState };
        },
        SetHideOnboarding(state, action: PayloadAction<boolean>) {
            state.isHideOnboarding = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, ({
            token,
            company_id
        }) => ({
            ...initialState,
            token,
            company_id
        }));
        builder.addMatcher(UsersGrpcService.endpoints.pingUser.matchFulfilled, (state, action) => {
            state.currentAppVersion = action.payload.appMinVersionCode;
        });
    }
});

export const AppReducer = appSlice.reducer;

export const AppActions = appSlice.actions;
