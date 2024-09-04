import DriverDocumentsStyled from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/styled';
import StatusIcon from '@/@core/components/documents/components/document-tabs/StatusIcon';
import TabContext from '@mui/lab/TabContext';
import { DocumentsActions } from '@/store/documents/slice';
import Documents from '@/store/documents/types';
import { useAppDispatch } from '@/store/hooks';
import clsx from 'clsx';
import { DocumentModel_Status } from '@proto/models/model_document';

type Props = {
    documents: Documents.ConvertedDocument[];
    selected_document_id: string;
    selectedDocument: (document_id: string) => void;
    chooseTab: () => void;
};

export default function EntityDocumentsList({
    documents,
    selected_document_id,
    selectedDocument,
    chooseTab
}: Props) {
    const dispatch = useAppDispatch();

    const handleTabChange = (document_id: string) => {
        chooseTab();
        selectedDocument(document_id);
        dispatch(DocumentsActions.selectDocumentDriver(document_id));
    };

    return (
        <TabContext value={String(selected_document_id)}>
            <DriverDocumentsStyled.TabList
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                onChange={(e, value) => handleTabChange(value)}
            >
                {documents.map(({
                    documentType,
                    documentTypeId,
                    status,
                    expiresAt
                }) => (
                    <DriverDocumentsStyled.Tab
                        key={documentTypeId}
                        value={documentTypeId}
                        label={`${documentType?.title || ''}`}
                        className={clsx({
                            valid  : status === DocumentModel_Status.DOCUMENT_STATUS_VALID,
                            pending: status === DocumentModel_Status.DOCUMENT_STATUS_PENDING,
                            invalid: status === DocumentModel_Status.DOCUMENT_STATUS_INVALID
                        })}
                        icon={(
                            <StatusIcon
                                expires_at={expiresAt}
                                status={status}
                                doc_type_expirable={documentType?.expirable || false}
                            />
                        )}
                    />
                ))}
            </DriverDocumentsStyled.TabList>
        </TabContext>
    );
}
