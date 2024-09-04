import { UsersServiceClient } from '@proto/users.client';
import {
    CreateUserReply,
    CreateUserRequest,
    DeleteUserReply,
    DeleteUserRequest,
    GetUsersReply,
    GetUsersRequest,
    InviteUserReply,
    InviteUserRequest,
    ResendUserInviteReply,
    ResendUserInviteRequest,
    UpdateUserReply,
    UpdateUserRequest,
    PingUserReply,
    PingUserRequest
} from '@proto/users';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest } from '@/store/api';

const UsersService = new UsersServiceClient(grpcTransport);

const UsersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getUsers: query<GetUsersReply, GetUsersRequest>({
            queryFn     : createPrivateQueryFn(UsersService, 'getUsers'),
            providesTags: ['users']
        }),
        createUser: mutation<CreateUserReply, CreateUserRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'createUser'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating User',
                    success: 'User was created'
                });
            },
            invalidatesTags: ['users']
        }),
        updateUser: mutation<UpdateUserReply, UpdateUserRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'updateUser'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating User',
                    success: 'User was updated'
                });
            },
            invalidatesTags: ['users']
        }),
        deleteUser: mutation<DeleteUserReply, DeleteUserRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'deleteUser'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting User',
                    success: 'User was deleted'
                });
            },
            invalidatesTags: ['users']
        }),
        inviteUser: mutation<InviteUserReply, InviteUserRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'inviteUser'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Inviting User',
                    success: 'User was invited'
                });
            },
            invalidatesTags: ['users']
        }),
        resendInvite: mutation<ResendUserInviteReply, ResendUserInviteRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'resendUserInvite'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Re-Sending Invite',
                    success: 'Invite was re-sent'
                });
            }
        }),
        pingUser: mutation<PingUserReply, PingUserRequest>({
            queryFn: createPrivateQueryFn(UsersService, 'pingUser')
        })
    })
});

export default UsersGrpcService;
