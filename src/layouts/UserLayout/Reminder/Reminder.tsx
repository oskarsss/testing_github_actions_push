import AccountGrpcService from '@/@grpcServices/services/account.service';
import { Collapse, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { GetSubscriptionReply } from '@proto/settings_billing';
import FreeTrial from './Variants/FreeTrial';
import SubscribeDontSuspend from './Variants/SubscribeDontSuspend';
import SubscribeSuspend from './Variants/SubscribeSuspend';
import PaymentMethodDontSuspend from './Variants/PaymentMethodDontSuspend';
import PaymentMethodSuspend from './Variants/PaymentMethodSuspend';
import ReminderConfig from './ReminderConfig';
import CloseReminderButton from './CloseReminderButton';

const getSubscriptionInfo = (response?: GetSubscriptionReply | null) => {
    if (!response) return null;
    switch (response.subscriptionStatus) {
    case ReminderConfig.Statuses.ACTIVE:
        return null;
    case ReminderConfig.Statuses.FREE_TRIAL_ACTIVE:
        return <FreeTrial response={response} />;
    case ReminderConfig.Statuses.FREE_TRIAL_ENDED_MUST_SUBSCRIBE_DONT_SUSPEND:
        return <SubscribeDontSuspend />;
    case ReminderConfig.Statuses.FREE_TRIAL_ENDED_MUST_SUBSCRIBE_SUSPEND:
        return <SubscribeSuspend />;
    case ReminderConfig.Statuses.MUST_FIX_PAYMENT_METHOD_DONT_SUSPEND:
        return <PaymentMethodDontSuspend />;
    case ReminderConfig.Statuses.MUST_FIX_PAYMENT_METHOD_SUSPEND:
        return <PaymentMethodSuspend />;
    default:
        return null;
    }
};

export default function Reminder() {
    const router = useRouter();
    const { t } = useAppTranslation();
    const { data: subscriptionData } =
        SettingsBillingGrpcService.useGetSettingsBillingSubscriptionQuery({});

    const [isShowReminder, setIsShowReminder] = useState<boolean>(false);

    useEffect(() => {
        if (subscriptionData && !router.pathname.includes('/join')) {
            if (subscriptionData.freeTrial) {
                const reminderCache = localStorage.getItem('reminder');
                const reminderCacheParsed = reminderCache ? JSON.parse(reminderCache) : null;
                if (
                    reminderCacheParsed &&
                    reminderCacheParsed?.status === subscriptionData.subscriptionStatus
                ) {
                    setIsShowReminder(
                        reminderCacheParsed.nextShowDate === subscriptionData.freeTrial.daysLeft
                    );
                } else {
                    setIsShowReminder(true);
                }
            } else if (subscriptionData.subscriptionStatus !== ReminderConfig.Statuses.ACTIVE) {
                setIsShowReminder(true);
            }
        }
    }, [subscriptionData, router.pathname]);

    const { data: accountData } = AccountGrpcService.useGetAccountQuery({});

    const isDanger =
        subscriptionData?.subscriptionStatus ===
            ReminderConfig.Statuses.FREE_TRIAL_ENDED_MUST_SUBSCRIBE_SUSPEND ||
        subscriptionData?.subscriptionStatus ===
            ReminderConfig.Statuses.MUST_FIX_PAYMENT_METHOD_SUSPEND;
    return (
        <Collapse
            in={Boolean(isShowReminder)}
            timeout="auto"
            unmountOnExit
            sx={{
                zIndex: 1000
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    backgroundColor: (theme) =>
                        isDanger
                            ? theme.palette.utility.foreground.error.tertiary
                            : theme.palette.utility.foreground.blue_dark.tertiary,
                    color: isDanger ? 'error' : 'primary'
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    flex="1 1 100%"
                    sx={{
                        padding  : '4px 10px',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        fontSize={14}
                        component="span"
                        sx={{
                            color: (theme) =>
                                theme.palette.utility.foreground[isDanger ? 'error' : 'blue_dark']
                                    .primary
                        }}
                    >
                        {t('reminder:subscribe_suspend.hi')}, {accountData?.user?.firstName}{' '}
                        {accountData?.user?.lastName}!{' '}
                    </Typography>

                    {getSubscriptionInfo(subscriptionData)}
                </Stack>

                <CloseReminderButton
                    isDanger={isDanger}
                    setIsShowReminder={setIsShowReminder}
                />
            </Stack>
        </Collapse>
    );
}
