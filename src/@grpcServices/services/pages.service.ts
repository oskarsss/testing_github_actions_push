/* eslint-disable max-len */

import { PageServiceClient } from '@proto/page.client';
import {
    PageHeaderCreateReply,
    PageHeaderCreateRequest,
    PageHeaderDeleteReply,
    PageHeaderDeleteRequest,
    PageHeaderUpdateReply,
    PageHeaderUpdateRequest,
    PageViewCreateRequest,
    PageViewCreateReply,
    PageRetrieveReply,
    PageRetrieveRequest,
    PageViewDeleteReply,
    PageViewDeleteRequest,
    PageViewDuplicateRequest,
    PageViewDuplicateReply,
    PageViewUpdateReply,
    PageViewUpdateRequest,
    RecurringTransactionPageRetrieveReply,
    RecurringTransactionPageRetrieveRequest,
    PageViewColumnBatchUpdateRequest,
    PageViewColumnBatchUpdateReply,
    PageViewColumnWidthUpdateRequest,
    PageViewColumnWidthUpdateReply,
    PageViewSetRowHeightRequest,
    PageViewSetRowHeightReply,
    PageGetReply,
    PageGetRequest
} from '@proto/page';
import { handleRequest } from '@/store/api';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { PageModel_Page } from '@proto/models/model_page';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new PageServiceClient(grpcTransport);

const PagesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        retrievePage: query<PageRetrieveReply, PageRetrieveRequest>({
            queryFn          : createPrivateQueryFn(Client, 'pageRetrieve'),
            providesTags     : (res, err, arg) => [{ type: 'page_data', id: arg.page }],
            keepUnusedDataFor: 90000
        }),
        getPages: query<PageGetReply, PageGetRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageGet'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                try {
                    const result = await queryFulfilled;
                    result.data.pages.forEach((page) => {
                        dispatch(
                            PagesGrpcService.util.upsertQueryData(
                                'retrievePage',
                                { page: page.page },
                                {
                                    headers: page.headers,
                                    columns: page.columnsLayout,
                                    views  : page.views
                                }
                            )
                        );
                    });
                } catch (error) {
                    console.error('Error loading pages data:', error);
                }
            }
        }),
        retrieveRecurringTransactionPage: query<
            RecurringTransactionPageRetrieveReply,
            RecurringTransactionPageRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'recurringTransactionPageRetrieve'),
            providesTags: [{ type: 'page_data', id: 'recurringTransactionPageRetrieve' }]
        }),
        duplicateView: mutation<PageViewDuplicateReply, PageViewDuplicateRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageViewDuplicate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'View is duplicating',
                    success  : 'View duplicated',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        updateColumnBatch: mutation<
            PageViewColumnBatchUpdateReply,
            PageViewColumnBatchUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'pageViewColumnBatchUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Columns are updating',
                    success  : 'Columns updated',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        updateTableWidth: mutation<
            PageViewColumnWidthUpdateReply,
            PageViewColumnWidthUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'pageViewColumnWidthUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Saving width...',
                    success  : 'Saved!',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        updateRowHeight: mutation<PageViewSetRowHeightReply, PageViewSetRowHeightRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageViewSetRowHeight'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Row height is updating',
                    success  : 'Row height updated',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),

        createPageView: mutation<PageViewCreateReply, PageViewCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageViewCreate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'View is creating',
                    success  : 'View created',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        updatePageView: mutation<PageViewUpdateReply, PageViewUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageViewUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'View is updating',
                    success  : 'View updated',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        deletePageView: mutation<PageViewDeleteReply, PageViewDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageViewDelete'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'View is deleting',
                    success  : 'View deleting',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),

        updatePageHeader: mutation<PageHeaderUpdateReply, PageHeaderUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageHeaderUpdate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Header is updating',
                    success  : 'Header updated',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        createPageHeader: mutation<PageHeaderCreateReply, PageHeaderCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageHeaderCreate'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Group name is creating',
                    success  : 'Group name created',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        }),
        deletePageHeader: mutation<PageHeaderDeleteReply, PageHeaderDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'pageHeaderDelete'),
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                handleRequest({
                    queryFulfilled,
                    loading  : 'Group name is deleting',
                    success  : 'Group name deleted',
                    onSuccess: () => retrievePage(dispatch, arg.page)
                });
            }
        })
    })
});

export default PagesGrpcService;

export function retrievePage(
    dispatch: ThunkDispatch<any, any, UnknownAction>,
    page: PageModel_Page
) {
    dispatch(PagesGrpcService.endpoints.retrievePage.initiate({ page }, { forceRefetch: true }));
}
