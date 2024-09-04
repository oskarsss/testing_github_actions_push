import { hookFabric } from '@/utils/dialog-hook-fabric';
import SendMessageForm from '@/views/fleet/drivers/Details/dialogs/SendMessageForm/SendMessageForm';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';

type Props = {
    id: string;
    message?: string;
    is_phone_exist: boolean;
};

export const useSendSMSDialog = hookFabric(SendSMS);

export default function SendSMS({
    id,
    message,
    is_phone_exist
}: Props) {
    const [send, { isLoading }] = DriversGrpcService.useSendDriverSMSMutation();
    const dialog = useSendSMSDialog(true);

    const onSend = (body: string) =>
        send({
            driverId: id,
            body
        }).unwrap();

    return (
        <SendMessageForm
            isLoading={isLoading}
            title="modals:drivers.send_critical_notification.error.feature_not_enabled.dialog.send_sms.header.title"
            onSend={onSend}
            onClose={dialog.close}
            body={message}
            is_phone_exist={is_phone_exist}
        />
    );
}
