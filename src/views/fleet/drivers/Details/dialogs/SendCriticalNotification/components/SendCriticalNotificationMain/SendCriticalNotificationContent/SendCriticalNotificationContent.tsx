import CriticalNotificationStyled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/styled';
import { PropsOnlyId } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import SendCriticalNotificationMessage from './SendCriticalNotificationMessage';
import SendCriticalNotificationHistory from './SendCriticalNotificationHistory/SendCriticalNotificationHistory';

export default function SendCriticalNotificationContent({ id }: PropsOnlyId) {
    return (
        <CriticalNotificationStyled.Content>
            <SendCriticalNotificationMessage />

            <SendCriticalNotificationHistory id={id} />
        </CriticalNotificationStyled.Content>
    );
}
