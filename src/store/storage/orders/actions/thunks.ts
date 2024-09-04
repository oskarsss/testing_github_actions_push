import { LoadsClient } from '@/@grpcServices/services/loads-service/loads.service';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { RootState } from '@/pages/_app';
import { getMeta } from '@/store/dispatch/manifests/actions/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEntitiesDocumentsThunk } from '@/store/documents/slice';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { OrdersDataActions } from '../slice';

export const getArchivedOrdersThunk = createAsyncThunk(
    'ordersData/getArchivedOrders',
    async (
        {
            autoSelectOrder,
            filterId
        }: { autoSelectOrder: boolean; filterId: string },
        {
            getState,
            dispatch
        }
    ) => {
        const state = getState() as RootState;
        const { orderIdToIndexMap } = state.ordersData.indexes;
        const existingOrdersIds = new Set(Object.keys(orderIdToIndexMap));

        const selected_filters = state.filters[filterId] as unknown as typeof default_loads_filters;

        dispatch(OrdersDataActions.SetIsFetching(true));

        const res = await LoadsClient.getLoads(
            {
                page           : 0,
                perPage        : 1000000,
                statuses       : [],
                startDate      : selected_filters.start_at,
                endDate        : selected_filters.end_at,
                search         : '',
                brokerIds      : [],
                customerIds    : [],
                dispatcherIds  : [],
                driverIds      : [],
                invoiceStatuses: [],
                sortBy         : 1,
                truckIds       : []
            },
            {
                meta: getMeta(state)
            }
        );

        const data = res.response.loads;

        const orders = data.filter((manifest) => !existingOrdersIds.has(manifest.loadId));

        const entityIds = orders.map((order) => order.loadId);
        dispatch(
            getEntitiesDocumentsThunk({
                entities: [
                    {
                        entityIds,
                        entityType: DocumentModel_DocumentEntityType.LOAD
                    }
                ]
            })
        );

        return {
            originalData: res.response.loads,
            autoSelectOrder,
            orders
        };
    }
);
