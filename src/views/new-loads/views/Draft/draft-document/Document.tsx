import React from 'react';
import { useWatch } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import ImageContent from '@/views/new-loads/views/Draft/draft-document/components/ImageContent';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import { DraftsIsUploadingDocumentSelector } from '@/store/drafts/selectors';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import DocumentContent from './components/DocumentContent';
import DocumentUploadProcess from './components/DocumentUploadProcess';
import { useDraftFormContext } from '../Draft';

// import PDFContent from './components/PDFContent';

const Document = () => {
    const isLoading = useAppSelector(DraftsIsUploadingDocumentSelector);

    const { control } = useDraftFormContext();

    const file_url = useWatch({ control, name: 'rateConUrl' });
    const file_name = useWatch({ control, name: 'rateConFileName' });

    const {
        data,
        isLoading: isRetrievingFile
    } = useRetrieveFileStream(file_url);

    const IMG_TYPES = ['svg', 'png', 'jpeg', 'jpg'];
    // eslint-disable-next-line no-mixed-operators
    const getFileExtension = (file_name: string) => (file_name && file_name.split('.').pop()) || '';

    if (isLoading) {
        return (
            <div style={{ flex: '1 1 100%' }}>
                <DocumentUploadProcess />
            </div>
        );
    }
    if (data.blobUrl || isRetrievingFile) {
        const fileExtension = getFileExtension(file_name);

        return (
            <div style={{ flex: '1 1 100%' }}>
                {IMG_TYPES.includes(fileExtension) ? (
                    <ImageContent
                        isLoading={isRetrievingFile}
                        key={file_url}
                        src={data.blobUrl}
                        alt={file_name}
                    />
                ) : (
                    <PDFContent
                        isLoading={isRetrievingFile}
                        key={file_url}
                        blobUrl={data.blobUrl}
                    />
                )}
            </div>
        );
    }

    return <DocumentContent />;
};

export default Document;
