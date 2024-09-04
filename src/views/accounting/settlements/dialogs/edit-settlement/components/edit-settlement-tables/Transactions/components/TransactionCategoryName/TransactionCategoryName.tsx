import { useSettlementTransactionCategoriesMap } from '@/store/hash_maps/hooks';

type Props = {
    id?: string;
};

const TransactionCategoryName = ({ id = '' }: Props) => {
    const categories = useSettlementTransactionCategoriesMap();
    return categories[id]?.name ?? '';
};

export default TransactionCategoryName;
