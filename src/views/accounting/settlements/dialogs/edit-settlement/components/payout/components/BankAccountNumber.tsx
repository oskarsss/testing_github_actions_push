import React, { MouseEvent, useState } from 'react';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import { Stack, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getHiddenCardNumber } from '@/views/settings/tabs/BankAccounts/components/Table/utils';
import { formatCardNumber } from '@/utils/formatting';

type Props = {
    lastFour: string;
    bankAccountId: string;
};

export default function BankAccountNumber({
    lastFour,
    bankAccountId
}: Props) {
    const [showFullNumber, setShowFullNumber] = useState(false);
    const [accountNumber, setAccountNumber] = useState<string>(getHiddenCardNumber(lastFour));

    const [getAccountNumber] = BankAccountsGrpcService.useLazyGetBankAccountNumberQuery();

    const onClick = async (e: MouseEvent<HTMLDivElement>) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            if (!bankAccountId) return;
            if (showFullNumber) {
                setAccountNumber(getHiddenCardNumber(lastFour));
                setShowFullNumber(false);
                return;
            }
            const response = await getAccountNumber({ bankAccountId }).unwrap();
            setShowFullNumber(true);
            setAccountNumber(formatCardNumber(response.accountNumber));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Stack
            onClick={onClick}
            flexDirection="row"
            gap="4px"
            alignItems="flex-start"
            sx={{
                cursor: 'pointer',
                svg   : {
                    fontSize: '16px',
                    color   : (theme) => theme.palette.semantic.foreground.primary
                }
            }}
        >
            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight={1.5}
            >
                {accountNumber}
            </Typography>
            {showFullNumber ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </Stack>
    );
}
