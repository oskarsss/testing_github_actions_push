/* eslint-disable no-param-reassign */
import { LoadDraftsServiceClient } from '@proto/load_drafts.client';

import {
    CancelExtractReply,
    CancelExtractRequest,
    StartExtractReply,
    StartExtractRequest,
    LoadDraftCheckDuplicateReply,
    LoadDraftCheckDuplicateRequest,
    LoadDraftCreateReply,
    LoadDraftCreateRequest,
    LoadDraftDeleteReply,
    LoadDraftRetrieveReply,
    LoadDraftDeleteRequest,
    LoadDraftUpdateReply,
    LoadDraftsDeleteAllReply,
    LoadDraftsDeleteAllRequest,
    LoadDraftsGetRequest,
    LoadDraftsGetReply,
    LoadDraftUpdateRequest,
    LoadDraftRetrieveRequest,
    LoadDraftCreateLoadReply,
    LoadDraftCreateLoadRequest,
    LoadDraftCreateFromLoadRequest,
    LoadDraftCreateFromLoadReply
} from '@proto/load_drafts';
import { handleRequest } from '@/store/api';
import { DraftsActions } from '@/store/drafts/slice';
import { selectInitialDraft } from '@/store/drafts/actions';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

export const LS_SELECTED_DRAFT_ID = 'drafts.selected_draft_id';

const DraftsService = new LoadDraftsServiceClient(grpcTransport);

const LoadDraftsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        cloneLoad: mutation<LoadDraftCreateFromLoadReply, LoadDraftCreateFromLoadRequest>({
            queryFn: createPrivateQueryFn(DraftsService, 'loadDraftCreateFromLoad'),
            async onQueryStarted(_, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Cloning Order',
                    success: 'Order was cloned'
                });
            }
        }),
        startExtract: mutation<StartExtractReply, StartExtractRequest>({
            queryFn       : createPrivateQueryFn(DraftsService, 'startExtract'),
            onQueryStarted: (params, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Start extract file',
                    success: 'File stated extracting'
                });
            },
            invalidatesTags: ['drafts']
        }),
        cancelExtract: mutation<CancelExtractReply, CancelExtractRequest>({
            queryFn        : createPrivateQueryFn(DraftsService, 'cancelExtract'),
            invalidatesTags: ['drafts']
        }),
        getDrafts: query<LoadDraftsGetReply, LoadDraftsGetRequest>({
            queryFn     : createPrivateQueryFn(DraftsService, 'loadDraftsGet'),
            providesTags: ['drafts'],
            async onQueryStarted(_, {
                queryFulfilled,
                dispatch
            }) {
                const result = await queryFulfilled;
                dispatch(selectInitialDraft(result.data.loadDrafts));
            }
        }),
        createDraft: mutation<LoadDraftCreateReply, LoadDraftCreateRequest>({
            queryFn        : createPrivateQueryFn(DraftsService, 'loadDraftCreate'),
            invalidatesTags: ['drafts'],
            async onQueryStarted(isChangeTab, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(DraftsActions.SetCreateLoading(true));
                queryFulfilled.then((res) => {
                    const { loadDraftId } = res.data;
                    if (loadDraftId && isChangeTab) {
                        dispatch(DraftsActions.SetSelectedDraftId(loadDraftId));
                        localStorage.setItem(LS_SELECTED_DRAFT_ID, loadDraftId);
                    }
                    dispatch(DraftsActions.SetCreateLoading(false));
                });
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Draft',
                    success: 'Draft was added'
                });
            }
        }),
        retrieveDraft: query<LoadDraftRetrieveReply, LoadDraftRetrieveRequest>({
            queryFn     : createPrivateQueryFn(DraftsService, 'loadDraftRetrieve'),
            providesTags: (result, _, arg) => [{ type: 'draft', id: arg.loadDraftId }]
        }),
        deleteDraft: mutation<LoadDraftDeleteReply, LoadDraftDeleteRequest>({
            queryFn: createPrivateQueryFn(DraftsService, 'loadDraftDelete'),
            onQueryStarted(arg, { dispatch }) {
                dispatch(
                    LoadDraftsGrpcService.util.updateQueryData('getDrafts', {}, (drafts) => ({
                        ...drafts,
                        loadDrafts: drafts.loadDrafts.filter(
                            (draft) => draft.loadDraftId !== arg.loadDraftId
                        )
                    }))
                );
            }
        }),
        clearAllDrafts: mutation<LoadDraftsDeleteAllReply, LoadDraftsDeleteAllRequest>({
            queryFn        : createPrivateQueryFn(DraftsService, 'loadDraftsDeleteAll'),
            invalidatesTags: () => ['drafts'],
            async onQueryStarted(_, {
                dispatch,
                queryFulfilled
            }) {
                const patchResult = dispatch(
                    LoadDraftsGrpcService.util.updateQueryData('getDrafts', {}, (drafts) => {
                        drafts.loadDrafts = [];
                    })
                );
                try {
                    await queryFulfilled;
                    localStorage.removeItem(LS_SELECTED_DRAFT_ID);
                } catch (error) {
                    patchResult.undo();
                }
            }
        }),
        updateDraft: mutation<LoadDraftUpdateReply, LoadDraftUpdateRequest>({
            queryFn: createPrivateQueryFn(DraftsService, 'loadDraftUpdate')
        }),

        checkDraftDuplicate: mutation<LoadDraftCheckDuplicateReply, LoadDraftCheckDuplicateRequest>(
            {
                queryFn: createPrivateQueryFn(DraftsService, 'loadDraftCheckDuplicate')
            }
        ),
        createNewLoad: mutation<LoadDraftCreateLoadReply, LoadDraftCreateLoadRequest>({
            queryFn        : createPrivateQueryFn(DraftsService, 'loadDraftCreateLoad'),
            invalidatesTags: ['loads', 'manifests'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Creating Order',
                    success: 'Order was created'
                });
            }
        })
    })
});

export default LoadDraftsGrpcService;
