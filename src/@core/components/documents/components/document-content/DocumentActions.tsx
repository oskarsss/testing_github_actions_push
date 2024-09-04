import type { ReactInstance } from 'react';
import { Stack } from '@mui/material';
import type { DocumentModel_Document, DocumentModel_Version } from '@proto/models/model_document';
import { FileModel_MimeType } from '@proto/models/model_file';
import DocumentOpenNewWindow from '@/@core/components/documents/components/document-content/action-buttons/DocumentOpenNewWindow';
import isImage from '@/utils/is-image';
import DocumentImageCropButton from '@/@core/components/documents/components/document-content/action-buttons/DocumentImageCropButton';
import DocumentsComponents from './styled';
import DocumentHeaderTitle from './header-title/DocumentHeaderTitle';
import DocumentUploadFileButton from './action-buttons/DocumentUploadFileButton';
import DocumentPrintButton from './action-buttons/DocumentPrintButton';
import DocumentDownLoadDocument from './action-buttons/DocumentDownloadButton';
import DocumentRotateButton from './action-buttons/DocumentRotateButton';
import DocumentDeleteButton from './action-buttons/DocumentDeleteButton';
import DocumentClearButton from './action-buttons/DocumentClearButton';

type Props = {
    document_title: string;
    document_id: string;
    file_name: string;
    contentRef: () => ReactInstance | null;
    isUpdating: boolean;
    uploadFile: () => void;
    blobUrl: string;
    fileId: string;
    document: DocumentModel_Document;
    isCurrentVersion: boolean;
    versionNumber?: number;
    mimeType: FileModel_MimeType;
    selectedVersion?: DocumentModel_Version;
    setSelectedVersion: (version: DocumentModel_Version) => void;
};

export default function DocumentActions({
    document_title,
    document_id,
    file_name,
    contentRef,
    isUpdating,
    uploadFile,
    fileId,
    document,
    isCurrentVersion,
    versionNumber,
    mimeType,
    blobUrl,
    setSelectedVersion,
    selectedVersion
}: Props) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            alignItems="center"
            overflow="hidden"
        >
            <DocumentHeaderTitle
                document_title={document_title}
                isUpdating={isUpdating}
            />
            <Stack
                direction="column"
                alignItems="flex-end"
            >
                <DocumentsComponents.ActionsWrapper>
                    {isCurrentVersion && (
                        <DocumentUploadFileButton
                            uploadFile={uploadFile}
                            url={fileId}
                        />
                    )}

                    {fileId && (
                        <>
                            <DocumentImageCropButton
                                blobUrl={blobUrl}
                                hidden={!isImage(mimeType) || !isCurrentVersion}
                            />

                            <DocumentPrintButton
                                contentRef={contentRef}
                                hidden={mimeType === FileModel_MimeType.PDF || !isCurrentVersion}
                            />

                            <DocumentDownLoadDocument
                                url={fileId}
                                file_name={file_name}
                            />

                            <DocumentRotateButton
                                hidden={mimeType === FileModel_MimeType.PDF || !isCurrentVersion}
                                versionNumber={versionNumber}
                                document_id={document_id}
                            />

                            <DocumentOpenNewWindow blobUrl={blobUrl} />

                            <DocumentClearButton
                                hidden={!isCurrentVersion}
                                document_title={document_title}
                                documentTypeId={document.documentTypeId}
                            />
                        </>
                    )}

                    <DocumentDeleteButton
                        document_id={document_id}
                        document_title={document_title}
                    />
                </DocumentsComponents.ActionsWrapper>
            </Stack>
        </Stack>
    );
}
