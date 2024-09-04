// eslint-disable-next-line import/no-unresolved
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { RpcError } from 'grpc-web';
import { SerializedError } from '@reduxjs/toolkit';

type Error = {
    data: {
        error: string;
        status_code: number;
        title: string;
    };
};

// eslint-disable-next-line import/prefer-default-export
export const renderError = (error: FetchBaseQueryError | SerializedError) => {
    if ('error' in error && typeof error.error === 'string') {
        return error.error;
    }
    if ('data' in error) {
        const { data } = error as Error;
        return data.error;
    }
    return 'Something went wrong.';
};

export const renderGrpcError = (error: RpcError | null) => {
    if (error?.message) {
        return error.message;
    }
    return 'Something went wrong.';
};
