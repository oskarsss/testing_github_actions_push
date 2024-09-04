import { Stack } from '@mui/material';
import React from 'react';
import PaymentMethod from '@/views/settings/tabs/Billing/components/PaymentBlock/PaymentMethod';
import NextEstimatedPayment from '@/views/settings/tabs/Billing/components/PaymentBlock/NextEstimatedPayment';

export default function PaymentBlock() {
    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="stretch"
            gap="16px"
            padding="136px 32px 32px 32px"
            borderRadius="12px"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.secondary
            }}
        >
            <PaymentMethod />
            <NextEstimatedPayment />
        </Stack>
    );
}
