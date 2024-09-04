import Image from 'next/image';
import LoadDocumentComponents from '@/@core/ui-kits/loads/load-documents/LoadDocumentsComponents';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Fade } from '@mui/material';
import DocumentDragAndDropDark from '../../../../../../public/images/icons/loads/DocumentDragAndDropDark.svg';
import DocumentDragAndDropLight from '../../../../../../public/images/icons/loads/DocumentDragAndDropLight.svg';

const DragAndDropIcons = {
    light: DocumentDragAndDropLight,
    dark : DocumentDragAndDropDark
};

export default function DocumentDragActiveScreen() {
    const { mode } = useTheme().palette;
    return (
        <Fade in>
            <LoadDocumentComponents.CardPreviewDocument sx={{ margin: '0 auto', padding: '8px' }}>
                <Image
                    src={DragAndDropIcons[mode]}
                    alt="DocumentDragAndDrop"
                    height={110}
                />
            </LoadDocumentComponents.CardPreviewDocument>
        </Fade>
    );
}
