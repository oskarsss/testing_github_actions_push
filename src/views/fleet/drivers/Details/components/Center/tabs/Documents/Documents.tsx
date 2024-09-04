import DocumentsList from '@/@core/components/documents/Documents';
import { useAppSelector } from '@/store/hooks';
import { styled } from '@mui/material/styles';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useMemo } from 'react';

export const DocumentWrapper = styled('div')(() => ({
    width    : '100%',
    marginTop: 20,
    height   : 'calc(100% - 40px)'
}));

type Props = {
    title: string;
    entity_type: DocumentModel_DocumentEntityType;
    entity_id: string;
};

export default function DetailsDocuments({
    title,
    entity_type,
    entity_id
}: Props) {
    const driverDocumentId = useAppSelector((state) => state.documents.driver);
    const truckDocumentId = useAppSelector((state) => state.documents.truck);
    const trailerDocumentId = useAppSelector((state) => state.documents.trailer);
    const brokerDocumentId = useAppSelector((state) => state.documents.broker);
    const customerDocumentId = useAppSelector((state) => state.documents.customer);

    const document_id = useMemo(() => {
        if (entity_type === DocumentModel_DocumentEntityType.DRIVER) {
            return driverDocumentId;
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRUCK) {
            return truckDocumentId;
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRAILER) {
            return trailerDocumentId;
        }
        if (entity_type === DocumentModel_DocumentEntityType.BROKER) {
            return brokerDocumentId;
        }
        if (entity_type === DocumentModel_DocumentEntityType.CUSTOMER) {
            return customerDocumentId;
        }

        return '';
    }, [
        brokerDocumentId,
        customerDocumentId,
        driverDocumentId,
        entity_type,
        trailerDocumentId,
        truckDocumentId
    ]);

    return (
        <DocumentWrapper>
            <DocumentsList
                title={title}
                entityType={entity_type}
                entityId={entity_id}
                documentId={document_id}
            />
        </DocumentWrapper>
    );
}
