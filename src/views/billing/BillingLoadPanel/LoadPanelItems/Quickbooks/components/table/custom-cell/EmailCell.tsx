import Stack from '@mui/material/Stack';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import React from 'react';

type Props = {
    quickbooksInvoiceId: string;
    emailStatus: string;
};

export default function EmailCell({
    quickbooksInvoiceId,
    emailStatus
}: Props) {
    if (!quickbooksInvoiceId) return '-';

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
        >
            {emailStatus === 'NeedToSend' ? (
                <CancelRoundedIcon
                    sx={{
                        width : '16px',
                        height: '16px',
                        color : ({ palette }) => palette.colors.gray[600]
                    }}
                />
            ) : (
                <CheckCircleRounded
                    sx={{
                        width : '16px',
                        height: '16px',
                        color : ({ palette }) => palette.utility.foreground.success.primary
                    }}
                />
            )}
        </Stack>
    );
}
