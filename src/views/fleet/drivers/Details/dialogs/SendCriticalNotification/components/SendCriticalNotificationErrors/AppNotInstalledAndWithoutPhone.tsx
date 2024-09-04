import SendCriticalNotificationErrorsLayout from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationErrors/SendCriticalNotificationErrorsLayout';
import {
    PropsOnlyId,
    useSendCriticalNotificationDialog
} from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import SendCriticalNotificationIcons from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/icons';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';

export default function AppNotInstalledAndWithoutPhone({ id }: PropsOnlyId) {
    const dialog = useSendCriticalNotificationDialog(true);
    const editDriverDialog = useEditDriverDialog();

    const moveToDriverProfile = () => {
        editDriverDialog.open({ driver_id: id });
        dialog.close();
    };

    return (
        <SendCriticalNotificationErrorsLayout
            icon={SendCriticalNotificationIcons.ErrorIcon()}
            title="modals:drivers.send_critical_notification.error.missing_app_and_contact_info.sub_title"
            message="modals:drivers.send_critical_notification.error.missing_app_and_contact_info.message"
            button_text="modals:drivers.send_critical_notification.error.button.edit_profile"
            onClick={moveToDriverProfile}
        />
    );
}
