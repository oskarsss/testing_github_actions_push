/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Checkbox } from '@mui/material';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TableTypes from '@/@core/components/table/types';
import SettlementStatusChipSelect from '@/@core/fields/chip-select/SettlementStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import { Settlements_Cycle_Period_Settlement_Trend_Entity } from '@proto/models/model_settlement';
import SelectSettlementCheckbox from './components/SelectSettlementCheckbox';
import Trend from './components/Trends/Trend';
import Driver from './components/Driver';
import Truck from './components/Truck';
import Trailer from './components/Trailer';
import Payout from './components/Payout';
import CreditsCell from './components/CreditsCell';
import LoadsCell from './components/LoadsCell';
import OneTimeDebitsCell from './components/OneTimeDebitsCell';
import TollsCell from './components/TollsCell';
import FuelCell from './components/FuelCell';
import DebitsCell from './components/DebitsCell';

const cellStyle = {
    display       : 'flex',
    justifyContent: 'flex-start',
    alignItems    : 'center',
    padding       : 0,
    borderLeft    : '1px solid #d4d3d524',
    borderRight   : '1px solid #d4d3d524'
};

type ColumnType = SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;

const { SETTLEMENT_TREND_ENTITY_COMPANY_NET_AMOUNT } =
    Settlements_Cycle_Period_Settlement_Trend_Entity;

const columns: TableTypes.FixedCustomColumns<ColumnType> = {
    multi_select_checkbox: {
        width: 50,

        // style: {
        //     display       : 'flex',
        //     justifyContent: 'center',
        //     alignItems    : 'center',
        //     borderLeft    : '1px solid #d4d3d524',
        //     borderRight   : '1px solid #d4d3d524'
        // },
        getCellStyle(row, {
            selected,
            theme
        }) {
            return {
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
                borderLeft    : `1px solid ${theme.palette.semantic.border.secondary}`,
                borderRight   : `1px solid ${theme.palette.semantic.border.secondary}`
            };
        },
        renderCell: (row) => <SelectSettlementCheckbox settlement_id={row.settlementId} />
    },
    settlement_friendly_id: {
        width   : 100,
        sortable: true,
        style   : {
            fontWeight    : 500,
            boxSizing     : 'border-box',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'left'
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                row,
                col,
                event,
                copy_value: '' as never
            }),
        renderCell: (row) => (
            <div
                style={{
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <span>{row.settlementFriendlyId}</span>
            </div>
        )
    },
    driver: {
        width: 200,
        style: {
            paddingTop   : 0,
            paddingBottom: 0,
            display      : 'flex',
            flexDirection: 'row',
            alignItems   : 'center'
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                row,
                col,
                event,
                copy_value: '' as never
            }),
        renderCell: (row, { rowHeight }) => (
            <Driver
                rowHeight={rowHeight}
                row={row}
            />
        )
    },

    status: {
        width     : 250,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <SettlementStatusChipSelect
                settlement_id={row.settlementId}
                settlement_status={row.settlementLocalStatus}
                show_arrow={false}
                full_width
            />
        )
    },
    truck: {
        width: 100,

        style: {
            display       : 'flex',
            justifyContent: 'flex-start',
            alignItems    : 'center',
            borderLeft    : '1px solid #d4d3d524',
            borderRight   : '1px solid #d4d3d524'
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                row,
                col,
                event,
                copy_value: '' as never
            }),
        renderCell: (row) => <Truck row={row} />
    },

    trailer: {
        width: 50,
        style: {
            display       : 'flex',
            justifyContent: 'flex-start',
            alignItems    : 'center',
            borderLeft    : '1px solid #d4d3d524',
            borderRight   : '1px solid #d4d3d524'
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),

        renderCell: (row) => <Trailer row={row} />
    },

    fuel_amount: {
        width   : 190,
        sortable: true,
        style   : cellStyle,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        renderCell: (row, { rowHeight }) => (
            <FuelCell
                rowHeight={rowHeight}
                row={row}
            />
        )
    },
    tolls_amount: {
        width   : 80,
        sortable: true,
        style   : cellStyle,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        renderCell: (row, { rowHeight }) => (
            <TollsCell
                rowHeight={rowHeight}
                row={row}
            />
        )
    },

    company_net_amount: {
        width   : 100,
        sortable: true,
        style   : cellStyle,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        renderCell: (row, { rowHeight }) => (
            <Trend
                rowHeight={rowHeight}
                amount={row.companyNetAmountFormatted}
                percent={row.trends[SETTLEMENT_TREND_ENTITY_COMPANY_NET_AMOUNT]?.amountPercentage}
                amountTrend={row.trends[SETTLEMENT_TREND_ENTITY_COMPANY_NET_AMOUNT]?.amountTrend}
            />
        )
    },
    credits_amount: {
        width   : 90,
        sortable: true,
        style   : cellStyle,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                row,
                col,
                event
            }),
        renderCell: (row) => <CreditsCell row={row} />
    },

    total_loads_amount: {
        width   : 80,
        sortable: true,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        style     : cellStyle,
        renderCell: (row, { rowHeight }) => (
            <LoadsCell
                rowHeight={rowHeight}
                row={row}
            />
        )
    },

    debits_amount: {
        width   : 110,
        sortable: true,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        style: {
            paddingLeft   : '10px',
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'flex-start',
            cursor        : 'pointer'

            // borderLeft    : '1px solid #d4d3d524',
            // borderRight   : '1px solid #d4d3d524'
        },
        renderCell: (row) => <DebitsCell row={row} />
    },
    revenue_type: {
        width     : 200,
        style     : { ...cellStyle, paddingLeft: '10px' },
        renderCell: (row) => row.driverRevenueType?.name || '',
        onClick   : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            })
    },

    insurance_endorsed: {
        width   : 80,
        sortable: true,
        onClick : (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        getCellStyle: (row) => {
            if (!row.driver?.insuranceEndorsed) {
                return {
                    backgroundColor: '#ffdde0',
                    fontWeight     : 600,
                    color          : '#a51313'
                };
            }
            return {};
        },
        style: {
            padding       : 0,
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'center'

            // borderLeft    : '1px solid #d4d3d524',
            // borderRight   : '1px solid #d4d3d524'
        },
        renderCell: (row) => (
            <Checkbox
                disabled
                checked={!row.driver?.insuranceEndorsed}
            />
        )
    },

    driver_pay_amount: {
        width   : 110,
        sortable: true,

        getCellStyle: (row, { theme }) => {
            if (row.driverPayAmount > 0) {
                return {
                    backgroundColor: theme.palette.mode === 'light' ? '#D4FFE5' : '#032515',
                    fontWeight     : 600,
                    color          : theme.palette.mode === 'light' ? '#12B76A' : '#D4FFE5'
                };
            }
            if (row.driverPayAmount === 0) {
                return {
                    fontWeight: 600
                };
            }
            return {
                backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#2d0404',
                fontWeight     : 600,
                color          : theme.palette.mode === 'light' ? '#a51313' : '#ffdde0'
            };
        },
        style: {
            padding       : 0,
            display       : 'flex',
            justifyContent: 'flex-start',
            alignItems    : 'center'
        },
        renderCell: (row, { rowHeight }) => (
            <Payout
                rowHeight={rowHeight}
                row={row}
            />
        )
    },
    one_time_debits_amount: {
        width: 110,
        style: {
            display       : 'flex',
            justifyContent: 'flex-start',
            alignItems    : 'center',
            padding       : 0

            // borderLeft    : '1px solid #d4d3d524',
            // borderRight   : '1px solid #d4d3d524'
        },
        onClick: (row, {
            executeAction,
            event,
            col
        }) =>
            executeAction('options', {
                col,
                row,
                event
            }),
        renderCell: (row) => <OneTimeDebitsCell row={row} />
    }
};

export default columns;
