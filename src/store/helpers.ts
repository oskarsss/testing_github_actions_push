import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

export function isServerError(
    error: unknown
): error is { status: number; data: { error: string } } {
    return (
        typeof error === 'object' &&
        error != null &&
        'status' in error &&
        typeof (error as any).status === 'number' &&
        'data' in error &&
        typeof (error as any).data === 'object' &&
        (error as any).data != null &&
        'error' in (error as any).data &&
        typeof (error as any).data.error === 'string'
    );
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    );
}

export function getApiErrorMessage(error: unknown): string | undefined {
    if (isErrorWithMessage(error)) {
        return error.message;
    }

    if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
            return error.data;
        }
        return JSON.stringify(error.data);
    }

    if (isServerError(error)) {
        return error.data.error;
    }

    return undefined;
}
