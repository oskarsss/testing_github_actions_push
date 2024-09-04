import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

const grpcTransport = new GrpcWebFetchTransport({
    baseUrl: process.env.NEXT_PUBLIC_GRPC_URL ?? ''
});

export default grpcTransport;
