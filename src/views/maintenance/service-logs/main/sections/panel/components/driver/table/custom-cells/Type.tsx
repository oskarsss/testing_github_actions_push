import { memo } from 'react';
import { useSettlementTransactionCategoriesMap } from '@/store/hash_maps/hooks';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import Typography from '@mui/material/Typography';
import { TRANSACTION_CATEGORIES_TYPE } from '@/models/settlements/settlements-mappings';
import { Stack } from '@mui/material';
import { TransactionFromRecurringTransaction } from '@/@core/theme/entities/settlement/icons';

type Props = {
    categoryId: string;
};

function Type({ categoryId }: Props) {
    const category = useSettlementTransactionCategoriesMap(categoryId);

    if (!category) return '-';

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            {category.type === SettlementTransactionCategoryModel_Type.DEBIT ? (
                <EditSettlementIcons.Overview.Debits isSelected={false} />
            ) : (
                <EditSettlementIcons.Overview.Credits isSelected={false} />
            )}
            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight="18px"
                textTransform="capitalize"
                color="semantic.text.secondary"
            >
                {TRANSACTION_CATEGORIES_TYPE[category.type]}
            </Typography>

            <TransactionFromRecurringTransaction sx={{ fontSize: '20px' }} />
        </Stack>
    );
}

export default memo(Type);
