/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Auth from '@/store/auth/types';
import { VerificationType } from '@proto/auth';

const initialState: Auth.Redux.Login.InitialState = {
    step: 1,
    data: {
        email           : '',
        password        : '',
        verificationType: VerificationType.SMS
    },
    loading: false
};

const loginSlice = createSlice({
    name    : 'login',
    initialState,
    reducers: {
        SetStep(state, action: PayloadAction<number>) {
            state.step = action.payload;
        },
        SetData(state, action: PayloadAction<Auth.Redux.Login.Data>) {
            state.data = action.payload;
        },
        SetEmail(state, action: PayloadAction<Auth.Redux.Login.Data['email']>) {
            state.data.email = action.payload;
        },
        SetLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const LoginReducer = loginSlice.reducer;

export const LoginActions = loginSlice.actions;
