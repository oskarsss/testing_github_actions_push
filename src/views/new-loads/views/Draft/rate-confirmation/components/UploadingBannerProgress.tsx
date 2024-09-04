import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadButtonStyled from '../UploadButtonStyled.styled';

const UploadingBannerProgress = () => {
    const { t } = useAppTranslation();
    return (
        <UploadButtonStyled.Button>
            <Stack
                direction="row"
                alignItems="center"
            >
                <UploadButtonStyled.ButtonIcon>
                    <FileUploadOutlinedIcon color="primary" />
                </UploadButtonStyled.ButtonIcon>
                <UploadButtonStyled.ButtonText>
                    <UploadButtonStyled.Title>
                        {t('new_loads:draft.rate_confirmation.uploading.title')}
                    </UploadButtonStyled.Title>
                    <UploadButtonStyled.Subtitle>
                        {t('new_loads:draft.rate_confirmation.uploading.description')}
                    </UploadButtonStyled.Subtitle>
                </UploadButtonStyled.ButtonText>
            </Stack>
        </UploadButtonStyled.Button>
    );
};

export default UploadingBannerProgress;
