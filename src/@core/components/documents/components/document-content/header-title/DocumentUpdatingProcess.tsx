import { Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isUpdating: boolean;
};

export default function DocumentUpdatingProcess({ isUpdating }: Props) {
    const { t } = useAppTranslation();

    if (isUpdating) {
        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <CloudUploadIcon color="secondary" />
                <Typography
                    color="semantic.text.secondary"
                    variant="subtitle1"
                    fontWeight={500}
                >
                    {`${t('core:documents.upload_banner.loading')}...`}
                </Typography>
            </Stack>
        );
    }
    return <CloudDoneIcon color="secondary" />;
}
