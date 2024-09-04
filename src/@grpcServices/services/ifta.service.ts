import { IftaServiceClient } from '@proto/ifta.client';
import { GetPeriodReply, GetPeriodRequest, GetPeriodsReply, GetPeriodsRequest } from '@proto/ifta';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const IftaService = new IftaServiceClient(grpcTransport);

const IftaGrpcService = grpcAPI.injectEndpoints({
    endpoints: (builder) => ({
        getIftaPeriods: builder.query<GetPeriodsReply, GetPeriodsRequest>({
            queryFn: createPrivateQueryFn(IftaService, 'getPeriods')
        }),
        geIftatPeriod: builder.query<GetPeriodReply, GetPeriodRequest>({
            queryFn: createPrivateQueryFn(IftaService, 'getPeriod')
        })
    })
});

export default IftaGrpcService;
