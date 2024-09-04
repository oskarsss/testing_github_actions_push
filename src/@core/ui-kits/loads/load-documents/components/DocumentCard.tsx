import Documents from '@/store/documents/types';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import { useState } from 'react';
import DocumentEmptyScreen from '@/@core/ui-kits/loads/load-documents/components/DocumentEmptyScreen';
import DocumentHeader from '@/@core/ui-kits/loads/load-documents/components/DocumentHeader';
import { useDropzone } from 'react-dropzone';
import DocumentDragActiveScreen from '@/@core/ui-kits/loads/load-documents/components/DocumentDragActiveScreen';
import DocumentContent from '@/@core/ui-kits/loads/load-documents/components/document-content/DocumentContent';
import { useGetDocumentVersionsQuery } from '@/@core/components/documents/components/document-content/versions-select/VersionsSelect';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';

type Props = {
    document: Documents.ConvertedDocument;
    openDocument: (document_type_id: Documents.Document['documentTypeId']) => void;
    uploadDocument: (files: File[], document: Documents.ConvertedDocument) => Promise<void>;
    entityId: string;
};

export default function DocumentCard({
    document,
    openDocument,
    uploadDocument,
    entityId
}: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const { t } = useAppTranslation();

    const { versions } = useGetDocumentVersionsQuery({
        documentTypeId: document.documentTypeId,
        entityId,
        entityType    : DocumentModel_DocumentEntityType.LOAD
    });

    const lastVersion = versions[0];

    const upload = (files: File[]) => {
        setIsUploading(true);
        uploadDocument(files, document).finally(() => setIsUploading(false));
    };

    const dropzone = useDropzone({ onDrop: upload });

    return (
        <LoadDocumentComponents.CardContainer
            {...dropzone.getRootProps()}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                openDocument(document.documentTypeId);
            }}
        >
            <DocumentHeader
                title={document.documentType?.title || ''}
                status={document.status}
            />

            {dropzone.isDragActive && <DocumentDragActiveScreen />}

            {!dropzone.isDragActive &&
                (document.fileId ? (
                    <DocumentContent
                        document={document}
                        version={lastVersion}
                    />
                ) : (
                    <DocumentEmptyScreen />
                ))}

            {(!document.fileId || dropzone.isDragActive) && (
                <LoadDocumentComponents.CardUploadButton
                    loading={isUploading}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        dropzone.open();
                    }}
                    variant={dropzone.isDragActive ? 'text' : 'contained'}
                >
                    {t('core:basic.load.documents.button.upload')}
                </LoadDocumentComponents.CardUploadButton>
            )}
            <input {...dropzone.getInputProps()} />
        </LoadDocumentComponents.CardContainer>
    );
}
