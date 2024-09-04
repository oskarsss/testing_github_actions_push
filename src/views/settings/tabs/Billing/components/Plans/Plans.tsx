import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import { plans_config } from '@/views/settings/tabs/Billing/components/Plans/plans_config';
import PlanComponents from '@/views/settings/tabs/Billing/components/Plans/components';
import SubscribeBtn from '@/views/settings/tabs/Billing/components/Plans/SubscribeBtn';
import { Settings_Billing_Status } from '@proto/models/model_billing';
import { GetSubscriptionReply } from '@proto/settings_billing';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    subscription: GetSubscriptionReply | null;
};

export default function Plans({ subscription }: Props) {
    const { t } = useAppTranslation();
    const [plans, setPlans] = useState(plans_config);

    const quantity = subscription?.quantity || 0;
    const is_subscription = subscription
        ? subscription.subscriptionStatus === Settings_Billing_Status.subscription_active
        : false;

    useEffect(() => {
        if (subscription) {
            if (
                subscription?.subscription &&
                typeof subscription?.subscription?.currentTierIdx === 'number'
            ) {
                const newPlans = plans_config.map((plan, index) => {
                    if (index === subscription.subscription?.currentTierIdx) {
                        return { ...plan, active: true };
                    }
                    return { ...plan, active: false };
                });
                setPlans(newPlans);
            } else if (subscription.quantity > 0) {
                const { quantity } = subscription;
                const newPlans = plans.map((plan) => {
                    if (quantity >= plan.metadata.range[0] && quantity <= plan.metadata.range[1]) {
                        return { ...plan, active: true };
                    }
                    return { ...plan, active: false };
                });
                setPlans(newPlans);
            }
        }
    }, [subscription?.quantity]);

    return (
        <Stack
            position="absolute"
            top="160px"
            left="0"
            padding="0 64px"
            width="100%"
        >
            <Grid
                container
                spacing={3}
                alignItems="center"
            >
                {plans.map((plan) => (
                    <Grid
                        item
                        xs={12 / plans.length}
                        key={plan.id}
                    >
                        <PlanComponents.Container>
                            <PlanComponents.Title variant="h6">
                                {t(plan.metadata.name)}
                            </PlanComponents.Title>
                            <PlanComponents.Amount
                                amount={plan.amount}
                                active={plan.active}
                                interval={t(plan.interval)}
                            />
                            {!plan.active || is_subscription ? (
                                <PlanComponents.Range range={plan.metadata.range} />
                            ) : (
                                <SubscribeBtn />
                            )}
                            {plan.active && (
                                <>
                                    <PlanComponents.ActivePlanChip
                                        isSubscription={is_subscription}
                                    />
                                    <PlanComponents.PlanInfo
                                        subscription={is_subscription}
                                        quantity={quantity}
                                    />
                                </>
                            )}
                        </PlanComponents.Container>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
