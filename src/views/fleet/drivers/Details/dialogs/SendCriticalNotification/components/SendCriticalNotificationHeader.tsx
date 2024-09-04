import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Typography } from '@mui/material';

export default function SendCriticalNotificationHeader() {
    const { t } = useAppTranslation();

    return (
        <Typography
            variant="h6"
            padding="12px 16px"
            height="64px"
            fontWeight={600}
            display="flex"
            alignItems="center"
        >
            {t('modals:drivers.send_critical_notification.title')}
        </Typography>
    );
}
