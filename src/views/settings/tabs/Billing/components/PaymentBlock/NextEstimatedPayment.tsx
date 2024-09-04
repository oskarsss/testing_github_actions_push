import CardComponents from '@/views/settings/tabs/Billing/components/PaymentBlock/components';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import vector_icons from './vector_icon.png';

export default function NextEstimatedPayment() {
    const { t } = useAppTranslation();
    const { data: subscription } =
        SettingsBillingGrpcService.useGetSettingsBillingSubscriptionQuery({});

    const upcoming_invoice_data = subscription?.subscription?.upcomingInvoice;

    return (
        <CardComponents.Container>
            <CardComponents.FirstRow.Container>
                <CardComponents.FirstRow.Title title="settings:billing.next_estimate_payment.title" />
                {subscription?.subscription?.endDate && (
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        gap="4px"
                        flexShrink={0}
                        borderRadius="4px"
                        padding="4px 8px"
                        sx={{
                            backgroundColor: ({ palette }) => palette.semantic.background.secondary
                        }}
                    >
                        <AccessTimeFilledIcon
                            color="secondary"
                            fontSize="small"
                        />
                        <Typography
                            variant="body1"
                            fontSize="12px"
                            letterSpacing={0}
                            sx={{ color: ({ palette }) => palette.semantic.text.secondary }}
                            fontWeight={500}
                        >
                            {t('settings:billing.next_estimate_payment.revenue_on', {
                                endDate: subscription?.subscription?.endDate
                            })}
                        </Typography>
                    </Stack>
                )}
            </CardComponents.FirstRow.Container>
            <CardComponents.SecondRow.Container>
                {upcoming_invoice_data ? (
                    <>
                        <CardComponents.SecondRow.Wrap>
                            <CardComponents.SecondRow.IconWrap>
                                <img
                                    src={vector_icons.src}
                                    alt="Vector icon"
                                    width={32}
                                    height={32}
                                />
                            </CardComponents.SecondRow.IconWrap>
                            <Typography variant="body1">
                                {upcoming_invoice_data.description}
                            </Typography>
                        </CardComponents.SecondRow.Wrap>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                        >
                            {upcoming_invoice_data.amountDue}
                        </Typography>
                    </>
                ) : (
                    <CardComponents.SecondRow.EmptyState title="settings:billing.next_estimate_payment.empty_state.title" />
                )}
            </CardComponents.SecondRow.Container>
        </CardComponents.Container>
    );
}
