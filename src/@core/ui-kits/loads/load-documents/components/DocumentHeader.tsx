import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import React from 'react';
import Documents from '@/store/documents/types';
import { DOCUMENT_STATUS_ICONS } from '@/@core/theme/entities/document/status';

type Props = {
    title: string;
    status: Documents.Document['status'];
};

export default function DocumentHeader({
    title,
    status
}: Props) {
    return (
        <LoadDocumentComponents.CardHeaderContainer documentStatus={status}>
            <LoadDocumentComponents.CardTitle>{title}</LoadDocumentComponents.CardTitle>
            {DOCUMENT_STATUS_ICONS[status]}
        </LoadDocumentComponents.CardHeaderContainer>
    );
}
