import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useAllCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { TRANSACTION_CATEGORIES_TYPE } from '@/models/settlements/settlements-mappings';

type Props = {
    categoryId: string;
};

export default function TransactionTypeCell({ categoryId }: Props) {
    const { categories } = useAllCategories();
    const category = categories.find((category) => category.transactionCategoryId === categoryId);

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
        </Stack>
    );
}
