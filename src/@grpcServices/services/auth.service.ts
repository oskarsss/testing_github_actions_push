import { AuthServiceClient } from '@proto/auth.client';
import {
    InviteAcceptRequest,
    InviteAcceptReply,
    InviteDeclineRequest,
    InviteDeclineReply,
    InviteAcceptAndLoginReply,
    InviteAcceptAndLoginRequest,
    InviteGetReply,
    InviteGetRequest,
    InviteRetrieveReply,
    InviteRetrieveRequest
} from '@proto/auth';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn, createPublicQueryFn } from '../createQueryFn';

const AuthService = new AuthServiceClient(grpcTransport);

export const authGrpcApi = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        requestCode: mutation({
            queryFn: createPublicQueryFn(AuthService, 'requestCode')
        }),
        verifyCode: mutation({
            queryFn: createPublicQueryFn(AuthService, 'verifyCode')
        }),
        sendResetPasswordLink: mutation({
            queryFn: createPublicQueryFn(AuthService, 'sendResetPasswordLink')
        }),
        resetPassword: mutation({
            queryFn: createPublicQueryFn(AuthService, 'resetPassword')
        }),

        // for unregister users
        retrieveInvite: query({
            queryFn: createPublicQueryFn(AuthService, 'inviteRetrieve')
        }),
        registerViaInvite: mutation({
            queryFn: createPublicQueryFn(AuthService, 'inviteAcceptAndRegister')
        }),

        // fot registered users
        inviteAcceptAndLogin: mutation<InviteAcceptAndLoginReply, InviteAcceptAndLoginRequest>({
            queryFn: createPublicQueryFn(AuthService, 'inviteAcceptAndLogin')
        }),

        // for registered users and authorized users
        invitesGet: query<InviteGetReply, InviteGetRequest>({
            queryFn     : createPrivateQueryFn(AuthService, 'inviteGet'),
            providesTags: ['invites']
        }),

        inviteAccept: mutation<InviteAcceptReply, InviteAcceptRequest>({
            queryFn        : createPrivateQueryFn(AuthService, 'inviteAccept'),
            invalidatesTags: ['invites'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Accepting Invite',
                    success: 'Invite accepted'
                });
            }
        }),
        inviteDecline: mutation<InviteDeclineReply, InviteDeclineRequest>({
            queryFn        : createPrivateQueryFn(AuthService, 'inviteDecline'),
            invalidatesTags: ['invites'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Declining Invite',
                    success: 'Invite declined'
                });
            }
        })
    })
});
