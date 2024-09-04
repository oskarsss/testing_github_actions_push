/* eslint-disable import/no-named-as-default-member */
import { LoadboardServiceClient } from '@proto/loadboard.client';
import {
    LB_CreateSearchReply,
    LB_CreateSearchRequest,
    LB_DeleteSearchReply,
    LB_DeleteSearchRequest,
    LB_GetEquipmentsReply,
    LB_GetEquipmentsRequest,
    LB_GetSearchesReply,
    LB_GetSearchesRequest,
    LB_RefreshSearchResultsReply,
    LB_RefreshSearchResultsRequest,
    LB_UpdateSearchReply,
    LB_UpdateSearchRequest,
    LB_GetViewedSearchResultsRequest,
    LB_GetViewedSearchResultsReply,
    LB_CreateViewedSearchResultReply,
    LB_CreateViewedSearchResultRequest,
    LB_MuteSearchReply,
    LB_MuteSearchRequest,
    LB_SearchResultRouteRetrieveReply,
    LB_SearchResultRouteRetrieveRequest
} from '@proto/loadboard';
import { handleRequest } from '@/store/api';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

export const LoadboardService = new LoadboardServiceClient(grpcTransport);

const LoadboardGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getLoadboardRoute: query<
            LB_SearchResultRouteRetrieveReply,
            LB_SearchResultRouteRetrieveRequest
        >({
            queryFn: createPrivateQueryFn(LoadboardService, 'lBSearchResultRouteRetrieve')
        }),
        muteSearch: mutation<LB_MuteSearchReply, LB_MuteSearchRequest>({
            queryFn       : createPrivateQueryFn(LoadboardService, 'lBMuteSearch'),
            onQueryStarted: (arg, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Muting search',
                    success: 'Search was muted'
                });
            },
            invalidatesTags: (res, _, arg) => ['loadboard.search']
        }),
        unmuteSearch: mutation<LB_MuteSearchReply, LB_MuteSearchRequest>({
            queryFn       : createPrivateQueryFn(LoadboardService, 'lBUnmuteSearch'),
            onQueryStarted: (arg, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unmuting search',
                    success: 'Search was unmuted'
                });
            },
            invalidatesTags: (res, _, arg) => ['loadboard.search']
        }),
        getViewedSearchResults: query<
            LB_GetViewedSearchResultsReply,
            LB_GetViewedSearchResultsRequest
        >({
            queryFn     : createPrivateQueryFn(LoadboardService, 'lBGetViewedSearchResults'),
            providesTags: ['loadboard.search.viewed.results']
        }),
        viewLoad: mutation<LB_CreateViewedSearchResultReply, LB_CreateViewedSearchResultRequest>({
            queryFn        : createPrivateQueryFn(LoadboardService, 'lBCreateViewedSearchResult'),
            invalidatesTags: ['loadboard.search.viewed.results']
        }),
        createSearches: mutation<LB_CreateSearchReply, LB_CreateSearchRequest>({
            queryFn        : createPrivateQueryFn(LoadboardService, 'lBCreateSearch'),
            invalidatesTags: ['loadboard.search'],
            onQueryStarted : (arg, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating search',
                    success: 'Search was created'
                });
            }
        }),
        getSearches: query<LB_GetSearchesReply, LB_GetSearchesRequest>({
            queryFn     : createPrivateQueryFn(LoadboardService, 'lBGetSearches'),
            providesTags: ['loadboard.search']
        }),
        refreshSearchResult: mutation<LB_RefreshSearchResultsReply, LB_RefreshSearchResultsRequest>(
            {
                queryFn        : createPrivateQueryFn(LoadboardService, 'lBRefreshSearchResults'),
                invalidatesTags: ['loadboard.search.results']
            }
        ),
        deleteSearch: mutation<LB_DeleteSearchReply, LB_DeleteSearchRequest>({
            queryFn       : createPrivateQueryFn(LoadboardService, 'lBDeleteSearch'),
            onQueryStarted: async (arg, {
                queryFulfilled,
                dispatch
            }) => {
                const patch = dispatch(
                    LoadboardGrpcService.util.updateQueryData(
                        'getSearches',
                        {},
                        ({ searches }) => ({
                            searches: searches.filter((search) => search.searchId !== arg.searchId)
                        })
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: (res, _, arg) => ['loadboard.search']
        }),
        updateSearch: mutation<LB_UpdateSearchReply, LB_UpdateSearchRequest>({
            queryFn       : createPrivateQueryFn(LoadboardService, 'lBUpdateSearch'),
            onQueryStarted: (arg, { queryFulfilled }) => {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating search',
                    success: 'Search was updated'
                });
            },
            invalidatesTags: (res, _, arg) => [
                'loadboard.search'

                // { type: 'loadboard.search.results', id: arg.searchId }
            ]
        }),
        getEquipments: query<LB_GetEquipmentsReply, LB_GetEquipmentsRequest>({
            queryFn: createPrivateQueryFn(LoadboardService, 'lBGetEquipments')
        })
    })
});

export default LoadboardGrpcService;
