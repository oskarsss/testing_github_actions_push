import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import VectorIcons from '@/@core/icons/vector_icons';
import { IconButton } from '@mui/material';
import { VehicleWarrantyModel_ItemRead } from '@proto/models/model_vehicle_warranty';
import { WarrantyItemGetReply_ItemWithRemains } from '@proto/vehicle_warranty.coverage_item';

export type ConvertCoveredItem = VehicleWarrantyModel_ItemRead &
    WarrantyItemGetReply_ItemWithRemains;

const numbersAfterDot = 2;
const amountWeekOnMonth = 4;

const columns: MiniTableColumnType<ConvertCoveredItem>[] = [
    {
        minWidth  : 100,
        headerName: 'common:profile.center.warranty.tabs.coverage_items.table.columns.name',
        field     : 'name',
        flex_start: true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: (row) => row.name
    },
    {
        minWidth: 100,
        headerName:
            'common:profile.center.warranty.tabs.coverage_items.table.columns.period_remain',
        field      : 'remain_date',
        hasMaxWidth: true,
        flex_start : false,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: (row, t) => {
            if (row.periodWeeksRemain === undefined) {
                return t('common:not_available');
            }
            const monthAmount = row.periodWeeksRemain / amountWeekOnMonth;
            if (monthAmount < 1) {
                return `${row.periodWeeksRemain} ${t('common:week')}`;
            }
            return `${Math.round(monthAmount)} ${t('common:mon')}`;
        }
    },
    {
        minWidth   : 90,
        headerName : 'common:profile.center.warranty.tabs.coverage_items.table.columns.range_date',
        field      : 'range_date',
        hasMaxWidth: true,
        flex_start : false,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: (row, t) =>
            row.periodMonthsRange !== undefined
                ? `${row.periodMonthsRange} ${t('common:mon')}`
                : t('common:not_available')
    },
    {
        minWidth  : 100,
        headerName: 'common:profile.center.warranty.tabs.coverage_items.table.columns.miles_remain',
        field     : 'remain_distance',
        flex_start: false,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: (row, t) =>
            row.distanceMilesRemain !== undefined
                ? row.distanceMilesRemain.toLocaleString('en-US', {
                    minimumFractionDigits: numbersAfterDot,
                    maximumFractionDigits: numbersAfterDot
                })
                : t('common:not_available')
    },
    {
        minWidth: 100,
        headerName:
            'common:profile.center.warranty.tabs.coverage_items.table.columns.range_distance',
        field     : 'range_distance',
        flex_start: false,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: (row, t) =>
            row.distanceMilesRange !== undefined
                ? row.distanceMilesRange.toLocaleString('en-US', {
                    minimumFractionDigits: numbersAfterDot,
                    maximumFractionDigits: numbersAfterDot
                })
                : t('common:not_available')
    },
    {
        minWidth   : 40,
        headerName : '',
        field      : 'edit',
        hasMaxWidth: true,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: () => (
            <IconButton sx={{ padding: 0 }}>
                <VectorIcons.EditIcon
                    sx={{
                        fontSize: 16,
                        path    : {
                            fill: (theme) => theme.palette.semantic.foreground.primary
                        }
                    }}
                />
            </IconButton>
        )
    },
    {
        minWidth   : 40,
        headerName : '',
        field      : 'delete',
        hasMaxWidth: true,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('delete', {
                row,
                event
            });
        },
        renderCell: () => (
            <IconButton sx={{ padding: 0 }}>
                <VectorIcons.TrashIcon
                    sx={{
                        fontSize: 16,
                        path    : {
                            fill: (theme) => theme.palette.semantic.foreground.primary
                        }
                    }}
                />
            </IconButton>
        )
    }
];

export default columns;
