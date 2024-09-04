import {
    TagAssignReply,
    TagAssignRequest,
    TagCreateReply,
    TagCreateRequest,
    TagEntityGetReply,
    TagEntityGetRequest,
    TagGetReply,
    TagGetRequest,
    TagUnassignReply,
    TagUnassignRequest,
    TagDeleteReply,
    TagDeleteRequest,
    TagEntityUpdateReply,
    TagEntityUpdateRequest
} from '@proto/tag';
import { TagServiceClient } from '@proto/tag.client';
import { TagModel_EntityType } from '@proto/models/model_tag';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TagServiceClient(grpcTransport);

const TagsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        createTag: mutation<TagCreateReply, TagCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'tagCreate'),
            invalidatesTags: (_, __, arg) => ['tags', { type: 'tag', id: arg.entityType }]
        }),
        getTags: query<TagGetReply, TagGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'tagGet'),
            providesTags: ['tags']
        }),
        assignTag: mutation<TagAssignReply, TagAssignRequest>({
            queryFn        : createPrivateQueryFn(Client, 'tagAssign'),
            invalidatesTags: (_, __, arg) => [
                { type: 'tag', id: `${arg.entityType}_${arg.entityId}` }
            ]

            // onQueryStarted(_, { queryFulfilled }) {
            //     handleRequest({
            //         queryFulfilled,
            //         loading: 'Assigning tag',
            //         success: 'Tag was successfully assigned'
            //     });
            // }
        }),
        unassignTag: mutation<TagUnassignReply, TagUnassignRequest>({
            queryFn        : createPrivateQueryFn(Client, 'tagUnassign'),
            invalidatesTags: (_, __, arg) => [
                { type: 'tag', id: `${arg.entityType}_${arg.entityId}` }
            ]

            // onQueryStarted(_, { queryFulfilled }) {
            //     handleRequest({
            //         queryFulfilled,
            //         loading: 'Unassigning tag',
            //         success: 'Tag was successfully unassigned'
            //     });
            // }
        }),
        getEntityTag: query<TagEntityGetReply, TagEntityGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'tagEntityGet'),
            providesTags: (_, __, arg) => [
                { type: 'tag', id: `${arg.entityType}_${arg.entityId}` },
                { type: 'tag', id: arg.entityType }
            ]
        }),
        deleteTag: mutation<TagDeleteReply, TagDeleteRequest & { entityType: TagModel_EntityType }>(
            {
                queryFn        : createPrivateQueryFn(Client, 'tagDelete'),
                invalidatesTags: (_, __, arg) => ['tags', { type: 'tag', id: arg.entityType }]
            }
        ),
        updateEntityTag: mutation<TagEntityUpdateReply, TagEntityUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'tagEntityUpdate'),
            invalidatesTags: (_, __, arg) => [
                { type: 'tag', id: `${arg.entityType}_${arg.entityId}` }
            ]
        })
    })
});

export default TagsGrpcService;
