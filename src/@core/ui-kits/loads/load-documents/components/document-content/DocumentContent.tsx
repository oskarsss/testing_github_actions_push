import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import type Documents from '@/store/documents/types';
import { getTime } from '@/@core/ui-kits/loads/load-documents/utils';
import VectorIcons from '@/@core/icons/vector_icons';
import { useDownloadFile } from '@/hooks/useDownloadFile';
import VersionBox from '@/@core/components/documents/components/document-content/versions-select/VersionBox';
import { DocumentModel_Version } from '@proto/models/model_document';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import DocumentDriverInfo from '@/@core/ui-kits/loads/load-documents/components/document-content/DocumentDriverInfo';
import DocumentDispatcherInfo from '@/@core/ui-kits/loads/load-documents/components/document-content/DocumentDispatcherInfo';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';
import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import moment from 'moment-timezone';

type Props = {
    document: Documents.ConvertedDocument;
    version?: DocumentModel_Version;
};

export default function DocumentContent({
    document,
    version
}: Props) {
    const containerContentRef = useRef<HTMLImageElement | null>(null);
    const downloadFile = useDownloadFile();
    const { t } = useAppTranslation();

    const onDownloadDocument = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        downloadFile(version?.fileId || document.fileId, document.documentType?.title || '');
    };

    const handlePrint = useReactToPrint({});
    const now = moment.utc();

    const createdAt = moment.utc(version?.createdAt || document.createdAt);
    const diff = now.diff(createdAt);

    const diffFormatted = moment.duration(diff).humanize();

    const {
        data,
        isLoading
    } = useRetrieveFileStream(document.fileId);

    const onPrintDocument = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        handlePrint(null, () => containerContentRef.current);
    };

    return (
        <>
            <LoadDocumentComponents.CardPreviewDocument>
                {data.mimeType !== FileModel_MimeType.PDF ? (
                    <ImageContent
                        fullWidth
                        fullHeight
                        fit="cover"
                        isLoading={isLoading}
                        fileName={document.documentType?.title || ''}
                        blobUrl={data.blobUrl}
                        ref={containerContentRef}
                    />
                ) : (
                    <PDFContent
                        isLoading={isLoading}
                        blobUrl={data.blobUrl}
                        fileName={document.documentType?.title || ''}
                        setUpScroll
                    />
                )}
            </LoadDocumentComponents.CardPreviewDocument>

            <LoadDocumentComponents.CardBottomContainer>
                <LoadDocumentComponents.CardRow flexShrink={0}>
                    <LoadDocumentComponents.CardTime>
                        {/* {getTime(document.updatedAt || document.createdAt, t)} */}
                        {/* {diffFormatted} */}
                        {t('core:documents.fields.version.uploaded', { diffFormatted })}
                    </LoadDocumentComponents.CardTime>

                    {document.fileId && (
                        <LoadDocumentComponents.CardControllersContainer>
                            {data.mimeType !== FileModel_MimeType.PDF && (
                                <IconButtonWithTooltip
                                    onClick={onPrintDocument}
                                    icon={<VectorIcons.PrinterIcon />}
                                    tooltip="core:basic.load.documents.tooltip.print"
                                />
                            )}
                            <IconButtonWithTooltip
                                onClick={onDownloadDocument}
                                icon={<VectorIcons.LoadIcons.Download />}
                                tooltip="core:basic.load.documents.tooltip.download"
                            />
                        </LoadDocumentComponents.CardControllersContainer>
                    )}
                </LoadDocumentComponents.CardRow>
                {version && (
                    <LoadDocumentComponents.CardRow sx={{ justifyContent: 'flex-start' }}>
                        <VersionBox
                            version={version.version}
                            isCurrentVersion
                        />
                        {version.uploadedByDriverId ? (
                            <DocumentDriverInfo driverId={version.uploadedByDriverId} />
                        ) : (
                            <DocumentDispatcherInfo dispatcherId={version.uploadedByUserId} />
                        )}
                    </LoadDocumentComponents.CardRow>
                )}
            </LoadDocumentComponents.CardBottomContainer>
        </>
    );
}
