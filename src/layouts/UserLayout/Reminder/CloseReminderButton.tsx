import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import ReminderConfig from './ReminderConfig';

type Props = {
    setIsShowReminder: (param: boolean) => void;
    isDanger: boolean;
};
export default function CloseReminderButton({
    setIsShowReminder,
    isDanger
}: Props) {
    const { data: subscriptionData } =
        SettingsBillingGrpcService.useGetSettingsBillingSubscriptionQuery({});

    const onClose = () => {
        switch (subscriptionData?.subscriptionStatus) {
        case ReminderConfig.Statuses.FREE_TRIAL_ACTIVE:
            // eslint-disable-next-line no-case-declarations
            if (subscriptionData.freeTrial) {
                localStorage.setItem(
                    'reminder',
                    JSON.stringify({
                        status      : subscriptionData.subscriptionStatus,
                        nextShowDate: subscriptionData.freeTrial.daysLeft - 3
                    })
                );
            }
            setIsShowReminder(false);
            break;
        default:
            setIsShowReminder(false);
            break;
        }
    };

    return (
        <IconButton
            onClick={onClose}
            sx={{
                color: ({ palette }) => palette.utility.text[isDanger ? 'error' : 'blue_dark']
            }}
            size="small"
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
}
