import SendCriticalNotificationContent from './SendCriticalNotificationContent/SendCriticalNotificationContent';
import SendCriticalNotificationForm from './SendCriticalNotificationForm';
import { PropsOnlyId } from '../../SendCriticalNotification';

export default function SendCriticalNotificationMain({ id }: PropsOnlyId) {
    return (
        <>
            <SendCriticalNotificationContent id={id} />
            <SendCriticalNotificationForm id={id} />
        </>
    );
}
