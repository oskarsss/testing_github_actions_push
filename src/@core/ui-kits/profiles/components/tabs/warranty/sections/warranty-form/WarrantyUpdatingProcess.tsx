import { Stack, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isUpdating: boolean;
};

export default function WarrantyUpdatingProcess({ isUpdating }: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            position="absolute"
            right={0}
        >
            {isUpdating ? (
                <>
                    <CloudUploadIcon color="secondary" />
                    <Typography
                        color="semantic.text.secondary"
                        variant="subtitle1"
                        fontWeight={500}
                    >
                        {`${t('common:updating')}...`}
                    </Typography>
                </>
            ) : (
                <CloudDoneIcon color="secondary" />
            )}
        </Stack>
    );
}
