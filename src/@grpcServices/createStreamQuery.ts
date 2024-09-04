/* eslint-disable import/no-unresolved */
import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { APP_ENV } from '@/configs';
import { RootState } from '@/pages/_app';
import API_TAGS from '@/store/api_tags';
import { devGroup } from '@/utils/devdebug';
import { MessageType } from '@protobuf-ts/runtime';
import { RpcError, RpcOptions, ServerStreamingCall } from '@protobuf-ts/runtime-rpc';
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { BaseQueryFn, QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import toast from 'react-hot-toast';
import { Dispatch } from 'redux';

type InitialData<Service, Key extends keyof Service> = Service[Key] extends (
    ...args: infer _Args
) => // eslint-disable-next-line @typescript-eslint/no-unused-vars
ServerStreamingCall<infer _Request, infer Response>
    ? Response
    : object;

type OnStreamUpdate<Response = unknown> = (
    response: Response,
    data: MaybeDrafted<Response>,
    dispatch: Dispatch
) => void | MaybeDrafted<Response>;

export const createBlankQueryFn = <Service, Key extends keyof Service, Response>(
    service: Service,
    method: Key,

    // @ts-ignore
    initialData: Response = {}
) => {
    type ServiceCall = Service[Key] extends (
        ...args: infer _Args
    ) => ServerStreamingCall<infer Request, infer Response>
        ? (input: Request, options?: RpcOptions) => ServerStreamingCall<Request, Response>
        : never;
    type Request = Parameters<ServiceCall>[0];

    // type Response = InitialData<Service, Key>;

    if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method.toString()} not found in service ${String(service)}`);
    }

    return async (
        args: Request

        // @ts-ignore
    ): MaybePromise<QueryReturnValue<Response, FetchBaseQueryError, FetchBaseQueryMeta>> => {
        try {
            devGroup(
                `INIT gRPC Stream: ${(service as MessageType<object>).typeName} -> ${String(
                    method
                )}`,
                ['Arg:', args],
                ['Initial Data', initialData]
            );
            return Promise.resolve({
                data : initialData ?? ({} as Response),
                error: undefined

                // meta : { args }
            });
        } catch (err) {
            devGroup(
                `ERROR! INIT gRPC Stream: ${(service as MessageType<object>).typeName} -> ${String(
                    method
                )}`,
                ['Arg:', args],
                ['Error:', err]
            );
            console.error(err);
            const error = err instanceof RpcError ? err : new RpcError((err as Error).message);
            return Promise.resolve({
                error: {
                    status : Number(error.code) ?? 'CUSTOM_ERROR',
                    data   : error.message,
                    code   : error.code,
                    message: error.message
                }
            });
        }
    };
};

export const createStreamQuery = <
    Service,
    Key extends keyof Service,
    Response extends InitialData<Service, Key>
>(
        service: Service,
        method: Key,
        onStreamUpdate?: OnStreamUpdate<Response>
    ) => {
    type ServiceCall = Service[Key] extends (
        ...args: infer _Args
    ) => ServerStreamingCall<infer Request, infer Response>
        ? (input: Request, options?: RpcOptions) => ServerStreamingCall<Request, Response>
        : never;
    type Request = Parameters<ServiceCall>[0];

    // type Response = ReturnType<ServiceCall>['responses'] extends RpcOutputStream<infer T>
    //     ? T
    //     : object;

    if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method.toString()} not found in service ${String(service)}`);
    }

    const onCacheEntryAdded: QueryDefinition<
        Request,
        BaseQueryFn,
        keyof typeof API_TAGS,
        Response,
        'api'
    >['onCacheEntryAdded'] = async (
        arg,
        {
            getState,
            dispatch,
            cacheDataLoaded,
            cacheEntryRemoved,
            updateCachedData
        }
    ) => {
        const {
            token,
            company_id
        } = (getState() as unknown as RootState).app;
        const headers = {
            Authorization: `Bearer ${token}`,
            ...(company_id ? { company_id } : {})
        };
        const Abort = new AbortController();

        try {
            const Service = (service[method] as ServiceCall)(arg, {
                meta : headers,
                abort: Abort.signal
            });

            // wait for the initial query to resolve before proceeding
            await cacheDataLoaded;

            // when data is received from the socket connection to the server,
            // if it is a message and for the appropriate channel,
            // update our query result with the received message
            const listener = (response: Response) => {
                devGroup(
                    `gRPC Stream Message: ${(service as MessageType<object>).typeName} -> ${String(
                        method
                    )}`,
                    ['Arg:', arg],
                    ['Response:', response]
                );
                if (!response) return;
                try {
                    updateCachedData((data) => {
                        if (onStreamUpdate) {
                            const update = onStreamUpdate(response, data, dispatch);
                            if (update) return update as MaybeDrafted<Response>;
                            // eslint-disable-next-line consistent-return
                            return;
                        }
                        return { ...response };
                    });
                } catch (error) {
                    if (APP_ENV === 'development') {
                        toast.error((error as Error).message, { duration: 5000 });
                    }
                    console.error(error);
                }
            };

            // @ts-ignore
            Service.responses.onMessage(listener);
            Service.responses.onError((err) => {
                devGroup(
                    `ERROR! gRPC Stream: ${(service as MessageType<object>).typeName} -> ${String(
                        method
                    )}`,
                    ['Arg:', arg],
                    ['Error:', err]
                );
                if (APP_ENV === 'development') {
                    toast.error(err.message, { duration: 5000 });
                }
                console.error(err);

                devGroup(
                    `Clean gRPC Stream: ${(service as MessageType<object>).typeName} -> ${String(
                        method
                    )}`,
                    ['Arg:', arg]
                );

                try {
                    console.debug('ABORTING QUERY STREAM', Abort);
                    Abort?.abort?.();
                } catch (error) {
                    console.error('ABORTING QUERY STREAM ERROR', error);
                }
            });
        } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;

        // perform cleanup steps once the `cacheEntryRemoved` promise resolves

        try {
            console.debug('ABORTING QUERY STREAM', Abort);
            Abort?.abort?.();
        } catch (error) {
            console.error('ABORTING QUERY STREAM ERROR', error);
        }

        devGroup(
            `Clean gRPC Stream: ${(service as MessageType<object>).typeName} -> ${String(method)}`,
            ['Arg:', arg]
        );
    };
    return onCacheEntryAdded;
};

export const createRTKStream = <
    Service,
    Key extends keyof Service,
    Resp extends InitialData<Service, Key>
>(
        service: Service,
        method: Key,
        ResponseBuilder: Resp,
        onStreamUpdate?: OnStreamUpdate<Resp>
    ) => ({
        queryFn          : createBlankQueryFn(service, method, ResponseBuilder),
        onCacheEntryAdded: createStreamQuery(service, method, onStreamUpdate)
    });
