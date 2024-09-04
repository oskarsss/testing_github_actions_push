import React, { useRef, useState } from 'react';
import { PixelCrop, ReactCropProps } from 'react-image-crop';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Stack, Typography } from '@mui/material';
import CropIcon from '@mui/icons-material/Crop';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import 'react-image-crop/dist/ReactCrop.css';
import CropImageAre from '@/@core/components/crop-image-dialog/CropImageAre';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useCropImageDialog = hookFabric(CropImageDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        paperStyle={{
            overflow: 'hidden',
            width   : 'auto'
        }}
        maxWidth="800px"
    />
));

type Props = {
    blobUrl: string;
    onCropSubmit: (file: File) => Promise<void>;
    cropAreaProps?: Omit<ReactCropProps, 'crop' | 'onChange' | 'onComplete' | 'style'>;
};

function CropImageDialog({
    blobUrl,
    onCropSubmit,
    cropAreaProps
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useCropImageDialog(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [loading, setLoading] = useState(false);

    const onDownloadCropClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const image = imgRef.current;
        if (!image || !completedCrop) {
            throw new Error('Crop image does not exist');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }

        try {
            setLoading(true);
            ctx.drawImage(
                image,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0,
                0,
                offscreen.width,
                offscreen.height
            );
            const blob = await offscreen.convertToBlob({ type: 'image/png' });
            if (!blob) {
                setLoading(false);
                return;
            }

            const file = new File([blob], 'cropped_image.png', { type: 'image/png' });
            await onCropSubmit(file);

            setLoading(false);
            dialog.close();
        } catch (error) {
            setLoading(false);
            console.error('Error cropping image');
        }
    };

    return (
        <DialogComponents.Form
            onSubmit={onDownloadCropClick}
            style={{
                display      : 'flex',
                flexDirection: 'column',
                width        : '100%',
                overflow     : 'hidden'
            }}
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="8px"
                mb="16px"
            >
                <CropIcon />
                <Typography
                    fontSize="20px"
                    fontWeight={600}
                    lineHeight={1.3}
                >
                    {t('core:crop_image_dialog.title')}
                </Typography>
            </Stack>

            <CropImageAre
                ref={imgRef}
                blobUrl={blobUrl}
                cropAreaProps={cropAreaProps}
                setCompletedCrop={setCompletedCrop}
            />

            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={loading}
                submitDisabled={!completedCrop}
                submitText="common:button.save"
            />
        </DialogComponents.Form>
    );
}
