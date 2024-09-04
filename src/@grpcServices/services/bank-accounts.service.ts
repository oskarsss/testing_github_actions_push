import { BankAccountServiceClient } from '@proto/bank_accounts.client';
import {
    BankAccountCreateReply,
    BankAccountCreateRequest,
    BankAccountDeleteReply,
    BankAccountDeleteRequest,
    BankAccountGetReply,
    BankAccountGetRequest,
    BankAccountNumberRetrieveReply,
    BankAccountNumberRetrieveRequest,
    BankAccountRestoreReply,
    BankAccountRestoreRequest
} from '@proto/bank_accounts';
import { handleRequest } from '@/store/api';
import API_TAGS from '@/store/api_tags';
import { BankAccountModel_Entity_Type as EntityType } from '@proto/models/model_bank_account';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new BankAccountServiceClient(grpcTransport);

const getEntityInvalidation = (entityId?: string) => {
    if (!entityId) return [];
    return {
        [EntityType.ENTITY_TYPE_DRIVER]     : [{ id: entityId, type: API_TAGS.driver }],
        [EntityType.ENTITY_TYPE_COMPANY]    : [],
        [EntityType.ENTITY_TYPE_VENDOR]     : [{ id: entityId, type: API_TAGS.vendor }],
        [EntityType.ENTITY_TYPE_UNSPECIFIED]: [],
        [EntityType.ENTITY_TYPE_USER]       : [{ id: entityId, type: API_TAGS.user }]
    };
};

const BankAccountsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getBankAccounts: query<BankAccountGetReply, BankAccountGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'bankAccountGet'),
            providesTags: ['bank_accounts']
        }),
        getBankAccountNumber: query<
            BankAccountNumberRetrieveReply,
            BankAccountNumberRetrieveRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'bankAccountNumberRetrieve')
        }),
        addBankAccount: mutation<BankAccountCreateReply, BankAccountCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'bankAccountCreate'),
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding new bank account',
                    success: 'New bank account was added'
                });
            },
            invalidatesTags: (result, _, arg) => [
                'bank_accounts',
                ...getEntityInvalidation(arg.entityId)[arg.entityType]
            ]
        }),
        deleteBankAccount: mutation<BankAccountDeleteReply, BankAccountDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'bankAccountDelete'),
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting bank account',
                    success: 'Bank account was deleted'
                });
            },
            invalidatesTags: (result) => [
                'bank_accounts',
                ...getEntityInvalidation(result?.entityId)[
                    result?.entityType || EntityType.ENTITY_TYPE_UNSPECIFIED
                ]
            ]
        }),
        restoreBankAccount: mutation<BankAccountRestoreReply, BankAccountRestoreRequest>({
            queryFn: createPrivateQueryFn(Client, 'bankAccountRestore'),
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Restoring bank account',
                    success: 'Bank account was restored'
                });
            },
            invalidatesTags: (result) => [
                'bank_accounts',
                ...getEntityInvalidation(result?.entityId)[
                    result?.entityType || EntityType.ENTITY_TYPE_UNSPECIFIED
                ]
            ]
        })
    })
});

export default BankAccountsGrpcService;
