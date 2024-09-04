import type { BaseQueryFn, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { BaseQueryApi, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { MessageType } from '@protobuf-ts/runtime';
import { RpcError, RpcOptions, UnaryCall } from '@protobuf-ts/runtime-rpc';
import { devGroup, dev_toSnakeCase } from '@/utils/devdebug';
import { RootState } from '@/store/types';
import { api as API } from '@/store/api';

export const createPublicQueryFn = <Service, Key extends keyof Service>(
    service: Service,
    method: Key
) => {
    type ServiceCall = Service[Key] extends (
        ...args: infer _Args
    ) => UnaryCall<infer Request, infer Response>
        ? (input: Request, options?: RpcOptions) => UnaryCall<Request, Response>
        : never;

    type Request = Parameters<ServiceCall>[0];
    type Response = ReturnType<ServiceCall>['response'] extends Promise<infer T> ? T : never;

    if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method.toString()} not found in service ${String(service)}`);
    }

    const queryFn: BaseQueryFn<
        Request,
        Response,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
    > = async (arg: Request, api: BaseQueryApi) => {
        const time = performance.now();

        let data: UnaryCall<Request, object> | undefined;
        try {
            data = (service[method] as ServiceCall)(arg, {
                abort: api.signal
            });

            const { response } = await data;

            const ms = Math.round(performance.now() - time);
            devGroup(
                `gRPC: ${(service as MessageType<object>).typeName} -> ${String(method)}`,
                ['Arg:', dev_toSnakeCase(arg)],
                ['Response:', response],
                ['Time:', ms]
            );
            return { data: response as Response };
        } catch (err) {
            const ms = Math.round(performance.now() - time);
            devGroup(
                `ERROR! gRPC: ${(service as MessageType<object>).typeName} -> ${String(method)}`,
                ['Arg:', arg],
                ['Error:', err],
                ['Time:', ms]
            );
            console.error(err);
            const error = err instanceof RpcError ? err : new RpcError((err as Error).message);
            return {
                error: {
                    status : 'CUSTOM_ERROR',
                    data   : error,
                    error  : error.message,
                    message: error.message,
                    code   : error.code
                }
            };
        }
    };

    return queryFn;
};

export const createPrivateQueryFn = <Service, Key extends keyof Service>(
    service: Service,
    method: Key,
    excludeFleetIdMeta = false
) => {
    type ServiceCall = Service[Key] extends (
        ...args: infer _Args
    ) => UnaryCall<infer Request, infer Response>
        ? (input: Request, options?: RpcOptions) => UnaryCall<Request, Response>
        : never;

    type Request = Parameters<ServiceCall>[0];
    type Response = ReturnType<ServiceCall>['response'] extends Promise<infer T> ? T : object;

    if (typeof service[method] !== 'function') {
        throw new Error(`Method ${method.toString()} not found in service ${String(service)}`);
    }

    const queryFn: BaseQueryFn<
        Request,
        Response,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
    > = async (arg: Request, api: BaseQueryApi) => {
        const time = performance.now();
        try {
            const {
                token,
                company_id
            } = (api.getState() as RootState).app;
            if (!token) {
                api.dispatch(API.util.resetApiState());
                throw new Error('Not authenticated!');
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                ...(company_id && !excludeFleetIdMeta ? { company_id } : {})
            };

            const {
                response,
                request
            } = await (service[method] as ServiceCall)(arg, {
                meta : headers,
                abort: api.signal
            });
            const ms = Math.round(performance.now() - time);
            devGroup(
                `gRPC: ${(service as MessageType<object>).typeName} -> ${String(method)}`,
                ['Arg:', dev_toSnakeCase(arg)],
                ['Response:', response],
                ['Headers:', headers],
                ['Time:', ms]
            );
            return {
                data : response as Response,
                error: undefined,
                meta : { args: arg, request, response } as FetchBaseQueryMeta
            };
        } catch (err) {
            const ms = Math.round(performance.now() - time);
            devGroup(
                `ERROR! gRPC: ${(service as MessageType<object>).typeName} -> ${String(method)}`,
                ['Arg:', dev_toSnakeCase(arg)],
                ['Error:', err],
                ['Time:', ms]
            );
            console.error(err);
            const error = err instanceof RpcError ? err : new RpcError((err as Error).message);

            if (
                (err instanceof RpcError && Number(err.code) === 16) ||
                (err &&
                    typeof err === 'object' &&
                    'message' in err &&
                    typeof err.message === 'string' &&
                    err?.message?.toLowerCase().includes('not authenticated'))
            ) {
                // api.dispatch(LogoutAction());
                api.dispatch(API.util.resetApiState());
            }

            return {
                error: {
                    status : 'CUSTOM_ERROR',
                    data   : error,
                    error  : error.message,
                    message: error.message,
                    code   : error.code
                }
            };
        }
    };

    return queryFn;
};
