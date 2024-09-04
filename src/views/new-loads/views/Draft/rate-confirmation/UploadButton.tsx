import React from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useController, useWatch } from 'react-hook-form';
import useFiles from '@/views/new-loads/hooks/useFiles';
import { useAppSelector } from '@/store/hooks';
import useExtractFile from '@/views/new-loads/hooks/useExtractFile';
import { DraftsIsUploadingDocumentSelector } from '@/store/drafts/selectors';
import { Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadingBannerProgress from './components/UploadingBannerProgress';
import UploadedBannerControllers from './components/UploadedBannerControllers';
import { useDraftFormContext } from '../Draft';
import UploadButtonStyled from './UploadButtonStyled.styled';

function UploadButton() {
    const isLoading = useAppSelector(DraftsIsUploadingDocumentSelector);

    const {
        setValue,
        control,
        reset,
        getValues
    } = useDraftFormContext();

    const {
        fieldState: { error }
    } = useController({ name: 'rateConUrl', control });
    const rateConUrl = useWatch({ control, name: 'rateConUrl' });
    const { t } = useAppTranslation();

    const onExtract = useExtractFile({
        getValues,
        reset
    });

    const {
        open,
        getInputProps
    } = useFiles({
        merge        : true,
        location     : 'drafts/files',
        onResCallback: (data) => {
            const { url } = data.paths[0];
            setValue('rateConUrl', url);
            setValue('rateConFileName', data.paths[0].name);
            onExtract(url);
        }
    });

    if (isLoading) return <UploadingBannerProgress />;

    if (rateConUrl) return <UploadedBannerControllers />;

    return (
        <UploadButtonStyled.Button
            onClick={open}
            data-error={Boolean(error)}
        >
            <Stack
                direction="row"
                alignItems="center"
            >
                <UploadButtonStyled.ButtonIcon>
                    <FileUploadOutlinedIcon />
                </UploadButtonStyled.ButtonIcon>
                <UploadButtonStyled.ButtonText>
                    <UploadButtonStyled.Title>
                        {t('new_loads:draft.rate_confirmation.buttons.upload.title')}
                    </UploadButtonStyled.Title>
                    <UploadButtonStyled.Subtitle>
                        {t('new_loads:draft.rate_confirmation.buttons.upload.description')}
                    </UploadButtonStyled.Subtitle>
                </UploadButtonStyled.ButtonText>
            </Stack>
            <input {...getInputProps()} />
        </UploadButtonStyled.Button>
    );
}

export default UploadButton;
