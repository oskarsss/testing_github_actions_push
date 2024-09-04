import { useSettlementsViews } from '@/store/accounting/settlements/hooks/settlements';
import { memo } from 'react';
import SelectDeselectItemsCheckbox from '@/@core/components/table/custom-cells/SelectDeselectTableItemsCheckbox';

type Props = {
    settlement_id: string;
};

function SelectSettlementCheckbox({ settlement_id }: Props) {
    const { tableName } = useSettlementsViews();

    return (
        <SelectDeselectItemsCheckbox
            id={settlement_id}
            tableName={tableName}
        />
    );
}

export default memo(SelectSettlementCheckbox);
