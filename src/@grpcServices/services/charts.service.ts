import {
    ChartAgingReportRetrieveReply,
    ChartAgingReportRetrieveRequest,
    ChartTopDebtorsGetReply,
    ChartTopDebtorsGetRequest,
    ChartTotalOrdersGetReply,
    ChartTotalOrdersGetRequest,
    ChartTotalUnpaidRetrieveRequest,
    ChartTotalUnpaidRetrieveReply
} from '@proto/chart';
import { ChartServiceClient } from '@proto/chart.client';
import { tagIdList } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new ChartServiceClient(grpcTransport);

const ChartsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ query }) => ({
        getChartTotalUnpaid: query<ChartTotalUnpaidRetrieveReply, ChartTotalUnpaidRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'chartTotalUnpaidRetrieve'),
            providesTags: [{ type: 'settlements', id: tagIdList }]
        }),
        getChartTotalOrders: query<ChartTotalOrdersGetReply, ChartTotalOrdersGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'chartTotalOrdersGet'),
            providesTags: ['loads']
        }),
        getChartTopDebtors: query<ChartTopDebtorsGetReply, ChartTopDebtorsGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'chartTopDebtorsGet'),
            providesTags: [{ type: 'settlements', id: tagIdList }]
        }),
        getChartAgingReport: query<ChartAgingReportRetrieveReply, ChartAgingReportRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'chartAgingReportRetrieve'),
            providesTags: [{ type: 'settlements', id: tagIdList }]
        })
    })
});

export default ChartsGrpcService;
