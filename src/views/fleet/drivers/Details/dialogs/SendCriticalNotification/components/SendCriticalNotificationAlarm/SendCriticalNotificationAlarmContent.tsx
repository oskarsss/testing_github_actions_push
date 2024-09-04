import { Typography } from '@mui/material';
import CriticalNotificationStyled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function SendCriticalNotificationAlarmContent() {
    const { t } = useAppTranslation();
    return (
        <CriticalNotificationStyled.AlarmContent>
            <Typography variant="h5">
                {t('modals:drivers.send_critical_notification.alarm.sub_title')}
            </Typography>
            <Typography variant="body2">
                {t('modals:drivers.send_critical_notification.alarm.message')}
            </Typography>
        </CriticalNotificationStyled.AlarmContent>
    );
}
