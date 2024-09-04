import { memo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { SettlementRecurringTransactionModel_RecurringTransaction } from '@proto/models/model_settlement.recurring_transaction';
import columns from './columns';

// old type import { RetrieveDriverReply_Driver_RecurringTransaction } from '@proto/drivers';
type Props = {
    recurringTransactions: SettlementRecurringTransactionModel_RecurringTransaction[];
};

function ServiceLogPanelServiceDriverTable({ recurringTransactions }: Props) {
    return (
        <MiniTable
            turnOffBorder
            columns={columns}
            rows={recurringTransactions}
            elementKey="recurringTransactionId"
            executeAction={() => {}}
        />
    );
}

export default memo(ServiceLogPanelServiceDriverTable);
