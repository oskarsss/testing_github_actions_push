import React, { forwardRef, memo } from 'react';
import { Fade } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';

type Props = {
    blobUrl: string;
    fileName: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fit?: React.CSSProperties['objectFit'];
    styles?: Omit<React.CSSProperties, 'width' | 'objectFit' | 'height'>;
    isLoading: boolean;
};

const ImageContent = forwardRef<HTMLImageElement, Props>((props, ref) => {
    const {
        fileName,
        fullHeight,
        fullWidth,
        fit,
        styles = {},
        blobUrl,
        isLoading
    } = props;

    // const {
    //     isLoading,
    //     blobUrl
    // } = StorageGrpcService.useRetrieveFileQuery(
    //     { filePath: `${file_url}` },
    //     {
    //         selectFromResult: (res) => {
    //             if (!res.data) return { ...res, blobUrl: '' };
    //             const blob = new Blob([res.data.data], { type: 'image/png' });
    //             return {
    //                 blobUrl: URL.createObjectURL(blob),
    //                 ...res
    //             };
    //         },
    //         refetchOnMountOrArgChange: true,
    //         refetchOnFocus           : true
    //     }
    // );

    if (isLoading) {
        return <Preloader />;
    }

    return blobUrl ? (
        <Fade in>
            <img
                src={blobUrl}
                alt={fileName}
                ref={ref}
                style={{
                    ...(fullWidth ? { width: '100%' } : {}),
                    ...(fullHeight ? { height: '100%' } : {}),
                    ...(fit ? { objectFit: fit } : {}),
                    ...styles
                }}
            />
        </Fade>
    ) : null;
});

export default memo(ImageContent);
