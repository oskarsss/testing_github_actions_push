import SendCriticalNotificationIcons from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/icons';
import { useSendSMSDialog } from '@/views/fleet/drivers/Details/dialogs/SendSMS';
import { useAccountCompanies } from '@/store/app/hooks';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import SendCriticalNotificationErrorsLayout from './SendCriticalNotificationErrorsLayout';

type Props = {
    driver_id: string;
    first_name: string;
};

export default function FeatureNotEnabled({
    driver_id,
    first_name
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useSendSMSDialog();
    const { company } = useAccountCompanies();

    const send_link = () => {
        dialog.open({
            id            : driver_id,
            is_phone_exist: true,
            message       : t(
                'modals:drivers.send_critical_notification.error.feature_not_enabled.dialog.send_sms.header.sub_title',
                {
                    driverName : first_name,
                    companyName: company?.name || '',
                    name       : SYSTEM.TMS_FRIENDLY_NAME
                }
            )
        });
    };

    return (
        <SendCriticalNotificationErrorsLayout
            icon={SendCriticalNotificationIcons.SettingIcon()}
            title="modals:drivers.send_critical_notification.error.feature_not_enabled.sub_title"
            message="modals:drivers.send_critical_notification.error.feature_not_enabled.message"
            button_text="modals:drivers.send_critical_notification.error.button.send_link"
            onClick={send_link}
        />
    );
}
