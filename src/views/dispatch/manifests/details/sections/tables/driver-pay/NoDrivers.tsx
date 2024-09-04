import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NoDrivers() {
    const { t } = useAppTranslation('common');
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            border={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
            padding={4}
            borderRadius={1}
        >
            <Typography
                variant="body1"
                color="semantic.text.secondary"
                fontWeight={500}
            >
                {t('empty.no_driver_pay_item')}
            </Typography>
        </Stack>
    );
}
