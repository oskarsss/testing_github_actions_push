import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';

const usePrivateFileUrl = (fileId?: string) => {
    const {
        data,
        isLoading
    } = useRetrieveFileStream(fileId || '');

    return { url: data.blobUrl, isLoading };
};

export default usePrivateFileUrl;
