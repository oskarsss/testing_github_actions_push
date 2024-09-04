import LoadingButton from '@mui/lab/LoadingButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Fade, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadIcon from '../icons';
import DocumentsComponents from '../styled';

type Props = {
    open: () => void;
    isDragActive: boolean;
};
export default function UploadBanner({
    open,
    isDragActive
}: Props) {
    const { t } = useAppTranslation('core');
    return (
        <Fade in>
            <DocumentsComponents.UploadContainer isDragActive={isDragActive}>
                <UploadIcon />
                <LoadingButton
                    variant="contained"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        open();
                    }}
                >
                    {t('documents.upload_banner.title')}
                    <AddPhotoAlternateIcon />
                </LoadingButton>
                <Stack
                    direction="column"
                    paddingTop={5}
                    spacing={1}
                >
                    <span>{t('documents.upload_banner.sub_title')}</span>
                    <span>{t('documents.upload_banner.format_files')}</span>
                </Stack>
            </DocumentsComponents.UploadContainer>
        </Fade>
    );
}
