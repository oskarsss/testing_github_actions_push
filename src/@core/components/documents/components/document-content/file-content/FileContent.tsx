import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import { FileModel_MimeType } from '@proto/models/model_file';
import { memo } from 'react';
import PDFContent from '../../../../../ui-kits/basic/pdf-content/PDFContent';
import UploadBanner from './UploadBanner';
import DocumentUploadingProcess from './UploadingProcess';
import ClearedDocument from './ClearedDocument';

type Props = {
    fileName: string;
    open: () => void;
    isUpdating: boolean;
    isDragActive: boolean;
    fileId: string;
    isLoading: boolean;
    mimeType: FileModel_MimeType;
    blobUrl: string;
    isCurrentVersion: boolean;
    isVersionsFetching: boolean;
};
function FileContent({
    fileName,
    open,
    isUpdating,
    isDragActive,
    fileId,
    isLoading,
    mimeType,
    blobUrl,
    isCurrentVersion,
    isVersionsFetching
}: Props) {
    if (fileId && !isDragActive) {
        if (mimeType === FileModel_MimeType.PNG || mimeType === FileModel_MimeType.JPEG) {
            return (
                <ImageContent
                    fullWidth
                    fullHeight
                    fit="contain"
                    fileName={fileName}
                    blobUrl={blobUrl}
                    isLoading={isLoading}
                />
            );
        }

        return (
            <PDFContent
                isLoading={isLoading}
                blobUrl={blobUrl}
                fileName={fileName}
            />
        );
    }

    if (isUpdating) {
        return <DocumentUploadingProcess />;
    }
    if (!fileId && !isCurrentVersion && !isVersionsFetching) {
        return <ClearedDocument />;
    }

    return (
        <UploadBanner
            isDragActive={isDragActive}
            open={open}
        />
    );
}

export default memo(FileContent);
