import { memo } from 'react';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';
import useSettlementTransactionsHistory from '@/@grpcServices/services/settlements-service/settlement-service-hooks';
import { SettlementEntityTransactionHistoryReply_Transaction } from '@proto/settlement_transactions';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import { useEditTransactionDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/dialogs/EditTransactionDialog';
import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { Settlements_Cycle_Period_Settlement_Status } from '@proto/models/model_settlement';
import columns from './columns';

type Props = {
    entityType: SettlementTransactionCategoryModel_EntityType;
    entityId: string;
};

function TransactionsHistoryTable({
    entityType,
    entityId
}: Props) {
    const editTransactionDialog = useEditTransactionDialog();
    const editSettlementDialog = useEditSettlementDialog();

    const {
        transactionsHistory,
        totalAmount,
        isLoading
    } = useSettlementTransactionsHistory({
        entityId,
        entityType
    });

    const executeAction: MiniTableExecuteActionType<
        SettlementEntityTransactionHistoryReply_Transaction
    > = (name, props) => {
        switch (name) {
        case 'edit':
            switch (props.row.settlementStatus) {
            case Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_OPEN:
            case Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_IN_REVIEW:
                editTransactionDialog.open({
                    settlement_id: props.row.settlementId,
                    item         : props.row,
                    cycle_id     : props.row.cycleId,
                    period_id    : props.row.periodId
                });
                break;
            default:
                break;
            }
            break;
        case 'edit_settlement':
            editSettlementDialog.open({
                cycle_id     : props.row.cycleId,
                period_id    : props.row.periodId,
                settlement_id: props.row.settlementId
            });
            break;
        default:
            break;
        }
    };

    if (isLoading) {
        return <Preloader sx={{ padding: '100px' }} />;
    }

    return (
        <MiniTable
            columns={columns}
            rows={transactionsHistory}
            elementKey="transactionId"
            executeAction={executeAction}
            emptyStateText="common:profile.center.transactions_history.table.empty_state_text"
            stickyHeader
            ComponentAfterContent={(
                <TotalsRow
                    columns={columns}
                    info_config={{ amount: totalAmount }}
                />
            )}
        />
    );
}

export default memo(TransactionsHistoryTable);
