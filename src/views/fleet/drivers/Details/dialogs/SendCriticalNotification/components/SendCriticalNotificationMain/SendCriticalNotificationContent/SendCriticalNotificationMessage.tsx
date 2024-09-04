import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CriticalNotificationStyled from '../../../styled';

export default function SendCriticalNotificationMessage() {
    const { t } = useAppTranslation();

    return (
        <CriticalNotificationStyled.Notification>
            <InfoSharpIcon />
            <Typography
                variant="body2"
                color="#F78009"
                fontWeight={500}
            >
                {t('modals:drivers.send_critical_notification.notification')}
            </Typography>
        </CriticalNotificationStyled.Notification>
    );
}
