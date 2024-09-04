import SendCriticalNotificationIcons from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/icons';
import { useInviteDriverDialog } from '@/views/fleet/drivers/dialogs/InviteDriver/InviteDriver';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import SendCriticalNotificationErrorsLayout from './SendCriticalNotificationErrorsLayout';

type Props = {
    id: string;
    is_phone_exist: boolean;
};

export default function AppNotInstalled({
    id,
    is_phone_exist
}: Props) {
    const sendSMSDialog = useInviteDriverDialog();

    const driversMap = useDriversMap();

    const send_link = () => {
        sendSMSDialog.open({
            email       : driversMap[id]?.email || '',
            phone_number: driversMap[id]?.phoneNumber || ''
        });
    };

    return (
        <SendCriticalNotificationErrorsLayout
            icon={SendCriticalNotificationIcons.PhoneIcon()}
            title="modals:drivers.send_critical_notification.error.app_not_installed.sub_title"
            message="modals:drivers.send_critical_notification.error.app_not_installed.message"
            button_text="modals:drivers.send_critical_notification.error.button.send_link"
            onClick={send_link}
        />
    );
}
