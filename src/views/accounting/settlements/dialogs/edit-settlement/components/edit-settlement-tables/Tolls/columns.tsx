import moment from 'moment-timezone';
import { ColumnsConfig } from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/edit-settlement-table/types';
import SettlementsTypes from '@/store/accounting/settlements/types';
import UnAssignTollCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Tolls/custom-cells/UnAssignTollCell';
import AssignTollCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/Tolls/custom-cells/AssignTollCell';

const edit_tolls_columns: ColumnsConfig<SettlementsTypes.CycleSettlementDetails.TollsTransaction> =
    {
        getItems        : (settlement) => settlement.tollsInfo?.tolls || [],
        withAssignRow   : true,
        assigned_columns: (item) => ({
            toll_amount: item.tollsInfo?.totals?.assignedAmount || ''
        }),
        unassigned_columns: (item) => ({
            toll_amount: item.tollsInfo?.totals?.unassignedAmount || ''
        }),
        columns: [
            {
                minWidth      : 52,
                headerName    : '',
                field         : 'toll_actions',
                withEditButton: false,
                cellStyles    : { padding: 0 },
                renderCell    : (row) => {
                    if (row.settlementId) {
                        return <UnAssignTollCell tollTransactionId={row.tollTransactionId} />;
                    }
                    return <AssignTollCell tollTransactionId={row.tollTransactionId} />;
                }
            },
            {
                minWidth: 140,
                headerName:
                    'modals:settlements.edit_settlement.tabs.tolls.table.columns.tag_or_plate',
                field         : 'tag_or_plate',
                withEditButton: true,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => row.transponderNumber || row.plateNumber
            },
            {
                minWidth      : 170,
                headerName    : 'fields:datetime.label',
                field         : 'date_and_time',
                withEditButton: true,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => moment(row.exitDatetime).format('MM/DD hh:mm A')
            },
            {
                minWidth: 170,
                headerName:
                    'modals:settlements.edit_settlement.tabs.tolls.table.columns.exit_plaza',
                field         : 'exit_plaza',
                withEditButton: false,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => row.exitPlaza?.substr(0, 10)
            },
            {
                minWidth      : 170,
                headerName    : 'modals:settlements.edit_settlement.tabs.tolls.table.columns.agency',
                field         : 'agency',
                withEditButton: false,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => row.agency
            },
            {
                minWidth: 140,
                headerName:
                    'modals:settlements.edit_settlement.tabs.tolls.table.columns.posting_date',
                field         : 'posting_date',
                withEditButton: false,
                flex_start    : true,
                color         : 'secondary',
                renderCell    : (row) => row.postingDate
            },
            {
                minWidth      : 150,
                headerName    : 'common:amount',
                field         : 'toll_amount',
                flex_start    : false,
                withEditButton: false,
                renderCell    : (row) => `${row.amountFormatted}`
            }
        ]
    };

export default edit_tolls_columns;
