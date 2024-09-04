import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function EmptyDriverPayItemRow() {
    const { t } = useAppTranslation('modals');
    return (
        <MiniTableStyled.Cell
            colSpan={3}
            sx={{ textAlign: 'center' }}
        >
            {t('settlements.edit_settlement.table.manifests.empty.driver_pay_item')}
        </MiniTableStyled.Cell>
    );
}
