import {
    useMemo,
    CSSProperties,
    useContext,
    createContext,
    useEffect,
    useState,
    useCallback
} from 'react';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import type Documents from '@/store/documents/types';
import { Stack } from '@mui/material';
import { DocumentsActions } from '@/store/documents/slice';
import { useAppDispatch } from '@/store/hooks';
import DocumentsComponents from './components/document-content/styled';
import DocumentsEmptyState from './DocumentsEmptyState';
import DocumentsView from './DocumentsContent';

export type DocumentContextType = {
    documentsList: Documents.ConvertedDocument[];
    entityType: DocumentModel_DocumentEntityType;
    entityId: string;
    title: string;
    selectedDocument?: Documents.ConvertedDocument;
};

export const DocumentContext = createContext<DocumentContextType>({
    documentsList: [] as Documents.ConvertedDocument[],
    entityType   : DocumentModel_DocumentEntityType.BROKER,
    entityId     : '',
    title        : ''
});

export const useDocumentsContext = () => useContext(DocumentContext);

type Props = {
    entityId: string;
    entityType: DocumentModel_DocumentEntityType;
    title: string;
    styles?: CSSProperties;
    documentId?: string;
};

export default function DocumentsContainer({
    entityId,
    entityType,
    title,
    styles,
    documentId = ''
}: Props) {
    const {
        isLoading,
        documents,
        documentsMap
    } = useGetDocumentsByEntityType({
        entityId,
        entityType
    });
    const dispatch = useAppDispatch();
    const [selectedDocumentTypeId, selectDocumentTypeId] = useState(documentId);

    const selectedDocument = useMemo(
        () => documentsMap[selectedDocumentTypeId],
        [documentsMap, selectedDocumentTypeId]
    );

    const handleTabChange = useCallback(
        (document_id: string, setLocalDocumentId = true) => {
            if (setLocalDocumentId) {
                selectDocumentTypeId(document_id);
            }
            if (entityType === DocumentModel_DocumentEntityType.DRIVER) {
                dispatch(DocumentsActions.selectDocumentDriver(document_id));
            }
            if (entityType === DocumentModel_DocumentEntityType.TRUCK) {
                dispatch(DocumentsActions.selectDocumentTruck(document_id));
            }
            if (entityType === DocumentModel_DocumentEntityType.TRAILER) {
                dispatch(DocumentsActions.selectDocumentTrailer(document_id));
            }

            if (entityType === DocumentModel_DocumentEntityType.BROKER) {
                dispatch(DocumentsActions.selectDocumentBroker(document_id));
            }

            if (entityType === DocumentModel_DocumentEntityType.CUSTOMER) {
                dispatch(DocumentsActions.selectDocumentCustomer(document_id));
            }
        },
        [dispatch, entityType]
    );

    useEffect(() => {
        if (documents.length && !documentId) {
            selectDocumentTypeId((prev) => {
                const hasDocument = documents.some((doc) => doc.documentTypeId === prev);
                if (hasDocument) return prev;
                handleTabChange(documents[0].documentTypeId, false);
                return documentId || documents[0].documentTypeId;
            });
        } else {
            selectDocumentTypeId(documentId);
        }
    }, [documentId, documents.length]);

    const contextValue: DocumentContextType = useMemo(
        () => ({
            documentsList: documents,
            entityType,
            entityId,
            title,
            selectedDocument
        }),
        [documents, entityType, entityId, title, selectedDocument]
    );

    if (isLoading) {
        return <Preloader sx={{ width: '100%' }} />;
    }

    return (
        <DocumentContext.Provider value={contextValue}>
            <Stack
                direction="row"
                height="100%"
                width="100%"
                pl="15px"
                style={styles}
                overflow="hidden"
            >
                {documents.length ? (
                    <DocumentsView
                        selectedDocumentTypeId={selectedDocumentTypeId}
                        handleTabChange={handleTabChange}
                    />
                ) : (
                    <DocumentsComponents.Wrapper>
                        <DocumentsEmptyState handleTabChange={handleTabChange} />
                    </DocumentsComponents.Wrapper>
                )}
            </Stack>
        </DocumentContext.Provider>
    );
}
