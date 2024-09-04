import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    retry
} from '@reduxjs/toolkit/query/react';
import toast, { ToastPosition } from 'react-hot-toast';
import { PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { QueryFulfilledRejectionReason } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { ROOT_URL } from '@/configs';
import API_TAGS, { ProvideTagsType } from '@/store/api_tags';
import { CSSProperties } from 'react';
import { RootState } from './types';

const baseQuery = fetchBaseQuery({
    baseUrl       : ROOT_URL,
    method        : 'GET',
    prepareHeaders: (headers, { getState }) => {
        try {
            const state = getState() as RootState;

            if (!state) return headers;

            const { token } = state.app;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);

                const company_id = state.app.company_id || '';
                if (company_id) {
                    headers.set('X-Company-Id', company_id.toString());
                }
            }

            return headers;
        } catch (error) {
            console.log('fetchBaseQuery', error);
            return headers;
        }
    }
});

export const api = createApi({
    baseQuery,
    reducerPath: 'api',
    endpoints  : () => ({}),
    tagTypes   : Object.values(API_TAGS)
});

type QueryFulfilledType<T> = PromiseWithKnownReason<
    {
        data: T;
        meta: FetchBaseQueryMeta | undefined;
        // eslint-disable-next-line max-len
    },
    QueryFulfilledRejectionReason<
        BaseQueryFn<
            string | FetchArgs,
            unknown,
            FetchBaseQueryError | { status?: string | number; message?: string },
            RetryOptions,
            FetchBaseQueryMeta
        >
    >
>;

type Props<T> = {
    queryFulfilled: QueryFulfilledType<T>;
    loading?: string;
    success?: string;
    onSuccess?: (data: T) => void;
    onError?: (err: Error | unknown) => void;
    position?: ToastPosition;
    styles?: CSSProperties;
};

export async function handleRequest<T>({
    queryFulfilled,
    loading = 'Sending Settlement',
    success = 'Settlement was sent',
    onSuccess,
    onError,
    position = 'top-right',
    styles
}: Props<T>) {
    // loader
    const toast_id = Math.random();
    toast.loading(loading, {
        id      : toast_id.toString(),
        position,
        duration: 5000,
        style   : styles
    });

    try {
        const { data } = await queryFulfilled;

        // stop loading
        toast.remove(toast_id.toString());

        // success
        toast.success(success, {
            position,
            duration: 2500,
            style   : styles
        });

        // onSuccess
        if (onSuccess) {
            onSuccess(data);
        }
    } catch (error) {
        // eslint-disable-next-line no-ex-assign
        const errorMessage =
            (error as { error: { data: { error: string } } })?.error.data?.error ||
            (error as { error: { message: string } })?.error.message ||
            (error as { error: { error: string } })?.error.error;

        const message = typeof errorMessage === 'string' ? errorMessage : 'Something went wrong';

        // stop loading
        toast.remove(toast_id.toString());

        // show error
        toast.error(message, {
            position,
            duration: 2500,
            style   : styles
        });

        // onError
        if (onError) {
            onError(error);
        }
    }
}

export const tagIdList = 'LIST';

type InvalidateTagsType = {
    id: string | number | typeof tagIdList;
    type: ProvideTagsType;
};

export function providesList<Response extends object>(
    results: Response[] | undefined,
    firstTag: ProvideTagsType,
    key?: keyof Response,
    secondTag?: ProvideTagsType
): InvalidateTagsType[] {
    if (!results) return [];
    if (results.length && secondTag && key) {
        return [
            {
                type: firstTag,
                id  : tagIdList
            },

            // @ts-ignore
            ...results.map((data) => ({
                type: secondTag,
                id  : data[key]
            }))
        ];
    }
    return [
        {
            type: firstTag,
            id  : tagIdList
        }
    ];
}

// set up function for provide only one tag

// set up js doc with example for provideTag

/**
 *
 * @param result
 * @param tag
 * @param id
 * @returns  [{ type: T } | InvalidateTagsType]
 *
 * @example
 *
 * const { data } = useGetSettlementQuery(
 *    { settlement_id, cycle_id, period_id },
 *   {
 *      selectFromResult: ({ data }) => data?.settlement,
 *     providesTags: (result) => provideTag(result, 'settlement', result?.settlement_id)
 *  }
 *
 */

export function provideTag<
    R extends object | undefined,
    ID extends string | number | undefined,
    T extends ProvideTagsType
>(result: R, tag: T, id?: ID): ({ type: T } | InvalidateTagsType)[] {
    if (!result) return [];
    if (id) return [{ type: tag, id }];
    return [{ type: tag }];
}

export function invalidateTags<
    R extends object | undefined,
    ID extends string | number | undefined,
    F extends ProvideTagsType,
    S extends ProvideTagsType
>(result: R, firstTag: F, id?: ID, secondTag?: S): InvalidateTagsType[] {
    if (!result) return [];
    return secondTag && id
        ? [
            { type: firstTag, id: tagIdList },
            { type: secondTag, id }
        ]
        : [{ type: firstTag, id: tagIdList }];
}

// TODO: change name, this function can use provide and invalidate
export function invalidateTag<
    R extends object | undefined,
    ID extends string | typeof tagIdList | number,
    T extends ProvideTagsType
>(result: R, tag: T, id?: ID): ({ type: T } | InvalidateTagsType)[] {
    if (!result) return [];
    if (id) return [{ type: tag, id }];
    return [{ type: tag }];
}
