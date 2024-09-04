import { TableWrapper } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/EditSettlementTable.styled';
import TransactionsTables from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/components/TransactionsTables';
import EditSettlement from '../../../styled';
import EditSettlementIcons from '../../../edit-settlement-icons';

type Props = {
    setMinHeight?: boolean;
};

export default function TransactionsTableRegular({ setMinHeight = false }: Props) {
    return (
        <TableWrapper
            direction="column"
            spacing={1}
            flex={!setMinHeight ? '1 1 0' : '1 1 200px'}
            gap="15px"
        >
            <EditSettlement.SectionHeader
                Icon={<EditSettlementIcons.Section.Transactions />}
                title="modals:settlements.edit_settlement.tabs.transactions.header.title"
            />

            <TransactionsTables />
        </TableWrapper>
    );
}
