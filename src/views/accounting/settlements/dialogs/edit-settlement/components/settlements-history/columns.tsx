import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { ReactNode } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import PeriodDateRange from '@/views/accounting/settlements/dialogs/edit-settlement/components/settlements-history/custom-cells/PeriodDateRange';
import { SettlementGetReply_Settlement } from '@proto/settlements';
import SettlementStatusItem from './custom-cells/StatusItem';
import CurrencyAmount from './custom-cells/CurrencyAmount';
import PeriodStatus from './custom-cells/PeriodStatus';

export type SettlementHistoryColumn = {
    field: keyof SettlementGetReply_Settlement;
    headerName: IntlMessageKey;
    width: number;
    renderCell: (row: SettlementGetReply_Settlement) => ReactNode;
    flex_end?: boolean;
};

const settlementsHistoryColumns: SettlementHistoryColumn[] = [
    {
        field     : 'settlementFriendlyId',
        headerName: 'common:id',
        width     : 100,
        renderCell: (row) => row.settlementFriendlyId
    },
    {
        field     : 'cycleId',
        headerName: 'modals:settlements.edit_settlement.settlement_history.table.columns.period',
        width     : 300,
        renderCell: (row) => (
            <PeriodDateRange
                periodId={row.periodId}
                cycleId={row.cycleId}
            />
        )
    },
    {
        field     : 'periodId',
        headerName: '',
        width     : 80,
        renderCell: (row) => (
            <PeriodStatus
                cycleId={row.cycleId}
                periodId={row.periodId}
            />
        )
    },
    {
        field     : 'status',
        headerName: 'common:status',
        width     : 160,
        renderCell: (row) => (
            <SettlementStatusItem
                status={
                    typeof row.status === 'number'
                        ? SETTLEMENT_STATUS_GRPC_ENUM[row.status]
                        : row.status
                }
            />
        )
    },
    {
        field     : 'totalLoadsAmountFormatted',
        headerName: 'common:gross',
        width     : 100,
        renderCell: (row) => <CurrencyAmount amount={row.totalLoadsAmountFormatted} />,
        flex_end  : true
    },
    {
        field: 'driverPayAmountFormatted',
        headerName:
            'modals:settlements.edit_settlement.settlement_history.table.columns.driver_earned',
        width     : 200,
        renderCell: (row) => <CurrencyAmount amount={row.driverPayAmountFormatted} />,
        flex_end  : true
    },
    {
        field     : 'fuelAmountFormatted',
        headerName: 'entity:fuel',
        renderCell: (row) => <CurrencyAmount amount={row.fuelAmountFormatted} />,
        width     : 100,
        flex_end  : true
    }
];

export default settlementsHistoryColumns;
