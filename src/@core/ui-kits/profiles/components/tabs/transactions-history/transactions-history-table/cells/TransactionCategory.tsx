import Typography from '@mui/material/Typography';
import { useSettlementTransactionCategoriesMap } from '@/store/hash_maps/hooks';
import { memo } from 'react';

type Props = {
    categoryId: string;
};

function TransactionCategory({ categoryId }: Props) {
    const categories = useSettlementTransactionCategoriesMap();
    const category = categories[categoryId];

    if (!category) return '-';

    return (
        <Typography
            fontSize="12px"
            fontWeight={500}
            lineHeight="18px"
            textTransform="capitalize"
            color="semantic.text.secondary"
        >
            {category.name}
        </Typography>
    );
}

export default memo(TransactionCategory);
