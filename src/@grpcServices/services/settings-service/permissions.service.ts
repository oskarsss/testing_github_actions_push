import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { PermissionServiceClient } from '@proto/permission.client';
import { PermissionGetReply, PermissionGetRequest } from '@proto/permission';

const Client = new PermissionServiceClient(grpcTransport);

const PermissionsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ query }) => ({
        getPermissions: query<PermissionGetReply, PermissionGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'permissionGet'),
            providesTags: ['permission_groups']
        })
    })
});

export default PermissionsGrpcService;
