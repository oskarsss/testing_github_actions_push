import CardComponents from '@/views/settings/tabs/Billing/components/PaymentBlock/components';
import { Button, Typography } from '@mui/material';
import React from 'react';
import CARD_BRAND_CONFIG from '@/views/settings/tabs/Billing/card-brand-config';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function PaymentMethod() {
    const { t } = useAppTranslation();
    const router = useRouter();

    const { data } = SettingsBillingGrpcService.useSettingsBillingCreateSessionQuery({});
    const { data: card } = SettingsBillingGrpcService.useGetSettingsBillingPaymentMethodQuery({});

    const onClick = () => {
        if (data) {
            router.push(data.sessionUrl);
        }
    };

    return (
        <CardComponents.Container>
            <CardComponents.FirstRow.Container>
                <CardComponents.FirstRow.Title title="settings:billing.payment_method.title" />
                <Button
                    onClick={onClick}
                    disabled={!data}
                    variant="outlined"
                    sx={{ padding: '4px 10px' }}
                >
                    {t(`common:button.${card ? 'update' : 'add'}`)}
                </Button>
            </CardComponents.FirstRow.Container>
            <CardComponents.SecondRow.Container>
                {card ? (
                    <>
                        <CardComponents.SecondRow.Wrap>
                            <CardComponents.SecondRow.IconWrap>
                                {CARD_BRAND_CONFIG[card.cardBrand].icon}
                            </CardComponents.SecondRow.IconWrap>
                            <Typography variant="body1">
                                {`${CARD_BRAND_CONFIG[card.cardBrand].name} ···· ${
                                    card.cardLastFour
                                }`}
                            </Typography>
                        </CardComponents.SecondRow.Wrap>
                        <Typography variant="body1">
                            {t('settings:billing.payment_method.expires', {
                                month: card.cardExpMonth,
                                year : card.cardExpYear
                            })}
                        </Typography>
                    </>
                ) : (
                    <CardComponents.SecondRow.EmptyState title="settings:billing.payment_method.empty_state.title" />
                )}
            </CardComponents.SecondRow.Container>
        </CardComponents.Container>
    );
}
