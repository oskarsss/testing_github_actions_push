import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import {
    CreditIcon,
    DebitIcon,
    TransactionFromRecurringTransaction
} from '@/@core/theme/entities/settlement/icons';
import { Settlements_Cycle_Period_Settlement_Transaction_Type } from '@proto/models/model_settlement';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    type: Settlements_Cycle_Period_Settlement_Transaction_Type;
    recurringTransactionId?: string;
};

function TransactionType({
    type,
    recurringTransactionId
}: Props) {
    const { t } = useAppTranslation('common');
    const isDebit =
        type === Settlements_Cycle_Period_Settlement_Transaction_Type.TRANSACTION_TYPE_DEBIT;

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            {isDebit ? <DebitIcon /> : <CreditIcon />}

            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight="18px"
                textTransform="capitalize"
                color="semantic.text.secondary"
            >
                {t(isDebit ? 'transaction_type.debit' : 'transaction_type.credit')}
            </Typography>

            {recurringTransactionId && <TransactionFromRecurringTransaction />}
        </Stack>
    );
}

export default memo(TransactionType);
