import { memo } from 'react';
import { Fade } from '@mui/material';
import Preloader from '../preloader/Preloader';

type Props = {
    fileName?: string;
    setUpScroll?: boolean;
    blobUrl: string;
    isLoading?: boolean;
};

function PDFContent({
    fileName = '',
    setUpScroll,
    blobUrl,
    isLoading
}: Props) {
    if (isLoading) {
        return <Preloader />;
    }

    return blobUrl ? (
        <Fade in>
            <object
                data={blobUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                style={setUpScroll ? { pointerEvents: 'none' } : {}}
            >
                <img
                    src={blobUrl}
                    alt={fileName}
                    style={{
                        width : '100%',
                        height: '100%'
                    }}
                />
            </object>
        </Fade>
    ) : null;
}

export default memo(PDFContent);
