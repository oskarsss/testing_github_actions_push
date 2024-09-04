import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

const grpcDataTransport = new GrpcWebFetchTransport({
    baseUrl: process.env.NEXT_PUBLIC_DATA_BACKEND_URL ?? ''
});

export default grpcDataTransport;
