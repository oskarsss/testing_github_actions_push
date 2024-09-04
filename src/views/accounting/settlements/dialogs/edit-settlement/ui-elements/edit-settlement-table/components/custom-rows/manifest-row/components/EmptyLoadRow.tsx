import { useAppTranslation } from '@/hooks/useAppTranslation';
import MiniTableStyled from '@/@core/ui-kits/basic/mini-table/MiniTable.styled';

export default function EmptyLoadRow() {
    const { t } = useAppTranslation('modals');
    return (
        <MiniTableStyled.Cell
            colSpan={1}
            sx={{ textAlign: 'center' }}
        >
            {t('settlements.edit_settlement.table.manifests.empty.load')}
        </MiniTableStyled.Cell>
    );
}
