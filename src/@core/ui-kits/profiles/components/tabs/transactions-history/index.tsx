import { memo } from 'react';
import TabContentWrapper from '@/@core/ui-kits/profiles/components/tabs/reusable/TabContentWrapper';
import TransactionsHistoryHeader from '@/@core/ui-kits/profiles/components/tabs/transactions-history/transactions-history-header/TransactionsHistoryHeader';
import TransactionsHistoryTable from '@/@core/ui-kits/profiles/components/tabs/transactions-history/transactions-history-table/TransactionsHistoryTable';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';

type TransactionsHistory = {
    entityType: SettlementTransactionCategoryModel_EntityType;
    entityId: string;
};

function TransactionsHistory({
    entityType,
    entityId
}: TransactionsHistory) {
    return (
        <TabContentWrapper>
            <TransactionsHistoryHeader />

            <TransactionsHistoryTable
                entityType={entityType}
                entityId={entityId}
            />
        </TabContentWrapper>
    );
}

export default memo(TransactionsHistory);
