import { RegisterServiceClient } from '@proto/register.client';
import { RegisterReply, RegisterRequest, GetByDotReply, GetByDotRequest } from '@proto/register';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPublicQueryFn } from '../createQueryFn';

const Client = new RegisterServiceClient(grpcTransport);

const RegisterGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        register: mutation<RegisterReply, RegisterRequest>({
            queryFn: createPublicQueryFn(Client, 'register')
        }),
        getByDot: mutation<GetByDotReply, GetByDotRequest>({
            queryFn: createPublicQueryFn(Client, 'getByDot')
        })
    })
});

export default RegisterGrpcService;
