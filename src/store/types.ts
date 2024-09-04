import { ThunkAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
// eslint-disable-next-line import/no-cycle
import { createStore } from './createStore';

type Store = ReturnType<typeof createStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export type AppThunkAction<ReturnsType = void> = ThunkAction<
    ReturnsType,
    RootState,
    unknown,
    AnyAction
>;

export type APIResponse<T = unknown> = T & {
    status_code: number;
};

export type APIRequestBody<T = unknown> = {
    body: T;
};

export type APIRequestParams<T = unknown> = {
    params: T;
};
