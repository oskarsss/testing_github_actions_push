import ReactCrop, {
    centerCrop,
    Crop,
    makeAspectCrop,
    PixelCrop,
    ReactCropProps
} from 'react-image-crop';
import React, { forwardRef, useState } from 'react';

type Props = {
    blobUrl: string;
    cropAreaProps?: Omit<ReactCropProps, 'crop' | 'onChange' | 'onComplete' | 'style'>;
    setCompletedCrop: React.Dispatch<React.SetStateAction<PixelCrop | undefined>>;
};

const CropImageAre = forwardRef<HTMLImageElement, Props>(
    ({
        blobUrl,
        cropAreaProps,
        setCompletedCrop
    }, ref) => {
        const [crop, setCrop] = useState<Crop>();
        const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
            const {
                width,
                height
            } = e.currentTarget;

            const centerAspectCrop = centerCrop(
                makeAspectCrop(
                    {
                        unit : '%',
                        width: 90
                    },
                    width / height,
                    width,
                    height
                ),
                width,
                height
            );

            setCrop(centerAspectCrop);
        };

        return (
            <ReactCrop
                {...(cropAreaProps || {})}
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{
                    width   : 'fit-content',
                    overflow: 'hidden'
                }}
            >
                <img
                    ref={ref}
                    alt="crop"
                    src={blobUrl}
                    onLoad={onImageLoad}
                    style={{
                        maxHeight: '75vh',
                        objectFit: 'contain',
                        overflow : 'hidden'
                    }}
                />
            </ReactCrop>
        );
    }
);

export default CropImageAre;
