import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import React from 'react';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';

type Props = {
    doc_type_title: string;
    fileId: string;
};

export default function DocumentPreview({
    fileId,
    doc_type_title
}: Props) {
    const {
        data,
        isLoading
    } = useRetrieveFileStream(fileId);

    if (data.mimeType !== FileModel_MimeType.PDF) {
        return (
            <ImageContent
                fullWidth
                fullHeight
                fit="cover"
                isLoading={isLoading}
                fileName={doc_type_title}
                blobUrl={data.blobUrl}
            />
        );
    }

    return (
        <PDFContent
            isLoading={isLoading}
            blobUrl={data.blobUrl}
            fileName={doc_type_title}
            setUpScroll
        />
    );
}
