/* eslint-disable max-len */
import { ColumnsConfig } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { Stack, Typography } from '@mui/material';
import { TRANSACTION_TYPE_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import UnAssignTransactionCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Transactions/custom-cells/UnAssignTransactionCell';
import EditSettlementIcons from '../../../edit-settlement-icons';
import TransactionCategoryName from './components/TransactionCategoryName';

const transaction_pro_columns: ColumnsConfig<SettlementsTypes.CycleSettlementDetails.Transaction> =
    {
        getItems        : (settlement) => settlement.transactionsInfo?.transactions || [],
        assigned_columns: (item) => ({
            amount: item.transactionsInfo?.totals?.assignedAmount || ''
        }),
        unassigned_columns: (item) => ({
            amount: item.transactionsInfo?.totals?.unassignedAmount || ''
        }),
        withAssignRow: true,
        columns      : [
            {
                minWidth      : 52,
                headerName    : '',
                field         : 'buttons',
                withEditButton: false,
                cellStyles    : { padding: 0 },
                renderCell    : (row) => <UnAssignTransactionCell transactionId={row.transactionId} />
            },
            {
                withEditButton: true,
                minWidth      : 140,
                headerName:
                    'modals:settlements.edit_settlement.tabs.transactions.table.columns.category',
                field     : 'id',
                flex_start: true,
                color     : 'secondary',
                renderCell: (row) => <TransactionCategoryName id={row.categoryId} />
            },
            {
                minWidth: 250,
                maxWidth: 250,
                headerName:
                    'modals:settlements.edit_settlement.tabs.transactions.table.columns.description',
                field         : 'description',
                withEditButton: true,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => row.description
            },
            {
                withEditButton: false,
                minWidth      : 120,
                headerName    : 'common:type',
                field         : 'types',
                renderCell    : (row) => (
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap="4px"
                    >
                        {TRANSACTION_TYPE_GRPC_ENUM[row.type] === 'debit' ? (
                            <EditSettlementIcons.Overview.Debits isSelected={false} />
                        ) : (
                            <EditSettlementIcons.Overview.Credits isSelected={false} />
                        )}
                        <Typography
                            fontSize="12px"
                            fontWeight={500}
                            lineHeight="18px"
                            textTransform="capitalize"
                            color="#667085"
                        >
                            {TRANSACTION_TYPE_GRPC_ENUM[row.type]}
                        </Typography>
                        {row.transactionId && <EditSettlementIcons.FromRecurringTransactionsIcon />}
                    </Stack>
                )
            },
            {
                withEditButton: false,
                minWidth      : 140,
                headerName    : 'common:amount',
                flex_start    : false,
                field         : 'amount',
                onClick       : (row, {
                    event,
                    executeAction
                }) => executeAction('edit', { row, event }),
                renderCell: (row) => row.amount
            }
        ]
    };

export default transaction_pro_columns;
