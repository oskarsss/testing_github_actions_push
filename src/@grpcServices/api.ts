import { api } from '@/store/api';
import { BaseQueryFn, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

export type GrpcBaseQueryFn = BaseQueryFn<
    void,
    symbol,
    FetchBaseQueryError & { code?: string | number; message?: string },
    object,
    FetchBaseQueryMeta
>;

const grpcAPI = api;

export default grpcAPI;
