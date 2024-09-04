import {
    EquipmentTypeCreateReply,
    EquipmentTypeCreateRequest,
    EquipmentTypeDeleteReply,
    EquipmentTypeDeleteRequest,
    EquipmentTypeRestoreReply,
    EquipmentTypeRestoreRequest,
    EquipmentTypeRetrieveReply,
    EquipmentTypeRetrieveRequest,
    EquipmentTypesGetReply,
    EquipmentTypesGetRequest,
    EquipmentTypeUpdateReply,
    EquipmentTypeUpdateRequest
} from '@proto/equipment_type';
import { EquipmentTypeServiceClient } from '@proto/equipment_type.client';
import { handleRequest, tagIdList } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new EquipmentTypeServiceClient(grpcTransport);

const EquipmentTypeGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getEquipmentTypes: query<EquipmentTypesGetReply, EquipmentTypesGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'equipmentTypesGet'),
            providesTags: [{ type: 'equipment_types', id: tagIdList }]
        }),
        retrieveEquipmentType: query<EquipmentTypeRetrieveReply, EquipmentTypeRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'equipmentTypeRetrieve'),
            providesTags: (result, _, arg) =>
                result ? [{ type: 'equipment_types', id: arg.equipmentTypeId }] : []
        }),
        updateEquipmentType: mutation<EquipmentTypeUpdateReply, EquipmentTypeUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'equipmentTypeUpdate'),

            invalidatesTags: (result, _, arg) =>
                result
                    ? [
                        { type: 'equipment_types', id: tagIdList },
                        { type: 'equipment_types', id: arg.equipmentTypeId }
                    ]
                    : [],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Equipment Type',
                    success: 'Equipment Type was updated'
                });
            }
        }),
        createEquipmentType: mutation<EquipmentTypeCreateReply, EquipmentTypeCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'equipmentTypeCreate'),
            invalidatesTags: (result) =>
                result ? [{ type: 'equipment_types', id: tagIdList }] : [],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Equipment Type',
                    success: 'Equipment Type was added'
                });
            }
        }),
        deleteEquipmentType: mutation<EquipmentTypeDeleteReply, EquipmentTypeDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'equipmentTypeDelete'),
            invalidatesTags: (result, _, arg) =>
                result ? [{ type: 'equipment_types', id: tagIdList }] : [],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Equipment Type',
                    success: 'Equipment Type was deleted'
                });
            }
        }),
        restoreEquipmentType: mutation<EquipmentTypeRestoreReply, EquipmentTypeRestoreRequest>({
            queryFn        : createPrivateQueryFn(Client, 'equipmentTypeRestore'),
            invalidatesTags: (result) =>
                result ? [{ type: 'equipment_types', id: tagIdList }] : [],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Equipment Type',
                    success: 'Equipment Type was restored'
                });
            }
        })
    })
});

export default EquipmentTypeGrpcService;
