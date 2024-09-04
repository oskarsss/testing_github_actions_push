import type SettlementsTypes from '@/store/accounting/settlements/types';
import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { Typography } from '@mui/material';
import PeriodStatusChipSelect from './custom-cells/PeriodStatusChipSelect';

type Option = '2-digit' | 'numeric' | 'long' | 'short' | 'narrow' | undefined;
type Period = '2-digit' | 'numeric' | undefined;
type Options = {
    month: Option;
    hour: Period;
    day: Period;
    hour12: boolean;
    minute: Period;
};

const dateFormatter = (inputDate: string) => {
    const date = new Date(inputDate);

    const options: Options = {
        month : '2-digit',
        day   : '2-digit',
        hour  : '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate.toUpperCase();
};

const columns: MiniTableColumnType<SettlementsTypes.Cycles.Periods.Period & { cycleId: string }>[] =
    [
        {
            headerName: 'settings:settlements.cycles.item.table.columns.settlements_period',
            field     : 'period',
            minWidth  : 250,
            flex_start: true,
            renderCell: (row) =>
                `${dateFormatter(row.startDatetime)} - ${dateFormatter(row.endDatetime)}`
        },
        {
            headerName: 'entity:settlements',
            field     : 'settlement',
            minWidth  : 90,
            flex_start: true,
            renderCell: (row) => `${row.settlementsCount}`
        },
        {
            headerName  : 'entity:payout',
            field       : 'payout',
            minWidth    : 100,
            flex_start  : false,
            isAmount    : true,
            getCellStyle: () => ({
                color: (theme) => `${theme.palette.utility.text.success} !important`
            }),
            renderCell: (row) => `${row.payoutAmountFormatted}`
        },
        {
            headerName  : 'settings:settlements.cycles.item.table.columns.negative_settlements',
            field       : 'negative',
            minWidth    : 150,
            flex_start  : false,
            getCellStyle: () => ({
                color: (theme) => `${theme.palette.utility.text.error} !important`
            }),
            isAmount  : true,
            renderCell: (row) =>
                `${row.negativeSettlementsCount} (${row.negativeSettlementAmountFormatted})`
        },
        {
            headerName: 'settings:settlements.cycles.item.table.columns.company_net',
            field     : 'company_net',
            minWidth  : 110,
            flex_start: false,
            isAmount  : true,
            renderCell: (row) => (
                <Typography
                    color={row.companyNet > 0 ? 'utility.text.success' : 'utility.text.error'}
                    fontSize="12px"
                    fontWeight={500}
                >
                    {row.companyNetFormatted}
                </Typography>
            )
        },
        {
            headerName: 'common:status',
            field     : 'status',
            minWidth  : 110,
            flex_start: true,
            renderCell: (row) => (
                <PeriodStatusChipSelect
                    cycleId={row.cycleId}
                    periodId={row.periodId}
                    periodStatus={row.status}
                />
            )
        }
    ];

export default columns;
