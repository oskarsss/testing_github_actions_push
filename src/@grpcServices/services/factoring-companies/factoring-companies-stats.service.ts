import { StatsServiceClient } from '@proto/stats.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { StatsFactoringCompaniesGetReply, StatsFactoringCompaniesGetRequest } from '@proto/stats';
import { createRTKStream } from '@/@grpcServices/createStreamQuery';

const Client = new StatsServiceClient(grpcTransport);

const FactoringCompaniesStatsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getFactoringCompanyStats: query<
            StatsFactoringCompaniesGetReply,
            StatsFactoringCompaniesGetRequest
        >(
            createRTKStream(
                Client,
                'statsFactoringCompaniesGet',
                StatsFactoringCompaniesGetReply.create()
            )
        )
    })
});

export default FactoringCompaniesStatsGrpcService;
