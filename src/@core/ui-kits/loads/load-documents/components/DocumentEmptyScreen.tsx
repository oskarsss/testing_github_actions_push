import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import { Fade } from '@mui/material';

export default function DocumentEmptyScreen() {
    return (
        <Fade in>
            <LoadDocumentComponents.CardDocumentEmptyWrapper>
                <VectorIcons.DocumentType />
            </LoadDocumentComponents.CardDocumentEmptyWrapper>
        </Fade>
    );
}
