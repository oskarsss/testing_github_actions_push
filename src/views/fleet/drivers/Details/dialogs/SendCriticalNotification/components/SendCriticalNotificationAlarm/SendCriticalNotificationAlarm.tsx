import { PropsOnlyId } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import SendCriticalNotificationActiveSiren from './SendCriticalNotificationActiveSiren';
import SendCriticalNotificationAlarmContent from './SendCriticalNotificationAlarmContent';

export default function SendCriticalNotificationAlarm({ id }: PropsOnlyId) {
    return (
        <>
            <SendCriticalNotificationAlarmContent />
            <SendCriticalNotificationActiveSiren id={id} />
        </>
    );
}
