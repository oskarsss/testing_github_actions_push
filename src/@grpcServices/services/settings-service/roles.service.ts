import { RolesServiceClient } from '@proto/roles.client';
import {
    RoleGetReply,
    RoleGetRequest,
    RoleCreateReply,
    RoleCreateRequest,
    RoleUpdateReply,
    RoleUpdateRequest,
    RoleDeleteReply,
    RoleDeleteRequest,
    RolePermissionAssignReply,
    RolePermissionAssignRequest,
    RolePermissionRemoveReply,
    RolePermissionRemoveRequest,
    RoleRestoreReply,
    RoleRestoreRequest
} from '@proto/roles';
import { handleRequest, invalidateTags } from '@/store/api';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const Client = new RolesServiceClient(grpcTransport);

const RolesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getRoles: query<RoleGetReply, RoleGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'roleGet'),
            providesTags: ['roles']
        }),
        updateRole: mutation<RoleUpdateReply, RoleUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'roleUpdate'),
            invalidatesTags: ['roles'],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Role',
                    success: 'Role was updated',
                    onSuccess() {
                        dispatch(grpcAPI.util.invalidateTags(['account']));
                    }
                });
            }
        }),
        createRole: mutation<RoleCreateReply, RoleCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'roleCreate'),
            invalidatesTags: ['roles'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Role',
                    success: 'Role was added'
                });
            }
        }),
        deleteRole: mutation<RoleDeleteReply, RoleDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'roleDelete'),
            invalidatesTags: ['roles'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Role',
                    success: 'Role was deleted'
                });
            }
        }),
        assignPermission: mutation<RolePermissionAssignReply, RolePermissionAssignRequest>({
            queryFn        : createPrivateQueryFn(Client, 'rolePermissionAssign'),
            invalidatesTags: ['roles', 'permission_groups'],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Assigning Permission',
                    success: 'Permission was assigned',
                    onSuccess() {
                        dispatch(grpcAPI.util.invalidateTags(['account']));
                    }
                });
            }
        }),
        removePermission: mutation<RolePermissionRemoveReply, RolePermissionRemoveRequest>({
            queryFn        : createPrivateQueryFn(Client, 'rolePermissionRemove'),
            invalidatesTags: (result) => ['roles', 'permission_groups'],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Removing Permission',
                    success: 'Permission was removed',
                    onSuccess() {
                        dispatch(grpcAPI.util.invalidateTags(['account']));
                    }
                });
            }
        }),
        restoreRole: mutation<RoleRestoreReply, RoleRestoreRequest>({
            queryFn        : createPrivateQueryFn(Client, 'roleRestore'),
            invalidatesTags: ['roles'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Role',
                    success: 'Role was restored'
                });
            }
        })
    })
});

export default RolesGrpcService;
