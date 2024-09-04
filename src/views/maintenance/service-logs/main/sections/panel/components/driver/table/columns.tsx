import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { RECURRING_TRANSACTIONS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { recurring_transaction_status_icon } from '@/@core/theme/entities/settlement/recurring_transactions_status';
import StatusBadge from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/status-badge/StatusBadge';
import Typography from '@mui/material/Typography';
import CellWithMultipleLines from '@/@core/components/cell-with-multiple-lines/CellWithMultipleLines';
import { SettlementRecurringTransactionModel_RecurringTransaction } from '@proto/models/model_settlement.recurring_transaction';
import Type from './custom-cells/Type';

const nonNumberRegex = /\D/g;

const columns: MiniTableColumnType<SettlementRecurringTransactionModel_RecurringTransaction>[] = [
    {
        headerName: 'common:status',
        field     : 'status',
        minWidth  : 120,
        flex_start: true,
        renderCell: (row) => (
            <StatusBadge
                status={RECURRING_TRANSACTIONS_GRPC_ENUM[row.status]}
                icons={recurring_transaction_status_icon}
                text={`state_info:recurring_transactions.status.${
                    RECURRING_TRANSACTIONS_GRPC_ENUM[row.status]
                }`}
            />
        )
    },
    {
        headerName : 'common:type',
        field      : 'type',
        minWidth   : 90,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => <Type categoryId={row.categoryId} />
    },
    {
        headerName: 'common:amount',
        field     : 'amount',
        minWidth  : 120,
        flex_start: false,
        renderCell: (row, t) => (
            <CellWithMultipleLines
                info={row.amountFormatted}
                subInfo={(
                    <>
                        {t('common:charged')}:
                        <Typography
                            variant="caption"
                            fontWeight="500"
                            fontSize="10px"
                            display="inline"
                            marginLeft="3px"
                            lineHeight="14px"
                            color="semantic.text.primary"
                        >
                            {row.amountFormatted}
                        </Typography>
                        {Number(row.maxTotalAmountFormatted.replace(nonNumberRegex, ''))
                            ? `/${row.maxTotalAmountFormatted}`
                            : ''}
                    </>
                )}
            />
        )
    }
];

export default columns;
