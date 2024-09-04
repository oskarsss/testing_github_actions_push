import moment from 'moment-timezone';
import { useDriverCriticalNotification } from '@/store/fleet/drivers/hooks';
import { useMemo } from 'react';
import { PropsOnlyId } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SendCriticalNotificationHistoryTable from './SendCriticalNotificationHistoryTable';

export type Notifications = {
    id: string;
    full_name: string;
    body: string;
    send_at: string;
    status: 'delivered' | 'not_delivered';
}[];

export default function SendCriticalNotificationHistory({ id }: PropsOnlyId) {
    const { t } = useAppTranslation();
    const {
        critical_notifications,
        isLoading: isCriticalNotificationLoading
    } =
        useDriverCriticalNotification(id);

    const array: Notifications = useMemo(() => {
        const sorted_array = [...critical_notifications].sort((a, b) =>
            moment(b.sentAt).diff(moment(a.sentAt)));

        return sorted_array.map((notification) => {
            const full_name = `${notification.userFirstName} ${notification.userLastName}`;
            const format_time = 'HH:mm';
            const format_date = 'MM/DD/YYYY';

            const getFormattedDate = () => {
                const date = moment(notification.sentAt).clone().utc()
                    .format(format_date);
                const time = moment(notification.sentAt).clone().utc()
                    .format(format_time);
                return `${date} ${time}`;
            };

            return {
                id     : notification.notificationId,
                full_name,
                body   : notification.body,
                send_at: getFormattedDate(),
                status : notification.delivered ? 'delivered' : 'not_delivered'
            };
        });
    }, [critical_notifications]);

    return (
        <>
            <Typography
                variant="body1"
                fontWeight={600}
            >
                {t('modals:drivers.send_critical_notification.sub_title')}
            </Typography>

            <SendCriticalNotificationHistoryTable
                isLoading={isCriticalNotificationLoading}
                array={array}
            />
        </>
    );
}
