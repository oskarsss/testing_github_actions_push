import { useCallback } from 'react';
import { saveAs } from 'file-saver';
import { useLazyRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';

// eslint-disable-next-line import/prefer-default-export
export function useDownloadFile() {
    const { retrieveFileStream } = useLazyRetrieveFileStream();

    return useCallback(
        async (url: string, fileName?: string) => {
            retrieveFileStream(url).then(({ blobUrl }) => {
                saveAs(blobUrl, fileName);
            });
        },
        [retrieveFileStream]
    );
}
