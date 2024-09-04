import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';
import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import ClearedDocument from '@/@core/components/documents/components/document-content/file-content/ClearedDocument';

type Props = {
    fileId: string;
    documentName: string;
};

export default function SendSettlementRightSideDocument({
    fileId,
    documentName
}: Props) {
    const {
        data,
        isLoading
    } = useRetrieveFileStream(fileId);

    if (isLoading) {
        return <Preloader />;
    }

    if (!fileId) {
        return <ClearedDocument />;
    }

    if ([FileModel_MimeType.PNG, FileModel_MimeType.JPEG].includes(data.mimeType)) {
        return (
            <ImageContent
                fullWidth
                fullHeight
                fit="contain"
                fileName={documentName}
                blobUrl={data.blobUrl}
                isLoading={isLoading}
            />
        );
    }

    return (
        <PDFContent
            isLoading={isLoading}
            blobUrl={data.blobUrl}
            fileName={documentName}
        />
    );
}
