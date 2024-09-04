import { Stack } from '@mui/material';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import RenderDriverType from '@/views/settings/tabs/Settlements/Categories/components/CategoriesDriverType';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';
import {
    SettlementTransactionCategoryModel_Category,
    SettlementTransactionCategoryModel_EntityType
} from '@proto/models/model_settlement.transaction_category';
import {
    RECURRING_TRANSACTION_CYCLE_PERIOD_FREQUENCY,
    TRANSACTION_CATEGORY_ENTITY
} from '@/models/settlements/settlements-mappings';

const columns: MiniTableColumnType<SettlementTransactionCategoryModel_Category>[] = [
    {
        field     : 'name',
        headerName: 'settings:settlements.table.columns.category',
        minWidth  : 300,
        flex_start: true,
        renderCell: (row) => (
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
                paddingRight={3}
            >
                <span>{row.name}</span>
            </Stack>
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field     : 'driver_types',
        headerName: 'settings:settlements.table.columns.index_drivers',
        minWidth  : 130,
        flex_start: true,
        renderCell: (row) =>
            row.driverTypes.length ? <RenderDriverType driver_types_arr={row.driverTypes} /> : '',
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field     : 'entity_type',
        headerName: 'settings:settlements.table.columns.entity',
        minWidth  : 80,
        flex_start: true,
        renderCell: (row, t) =>
            row.entityType !== SettlementTransactionCategoryModel_EntityType.UNKNOWN
                ? t(`entity:${TRANSACTION_CATEGORY_ENTITY[row.entityType]}`)
                : '',
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'required',
        headerName : 'common:required',
        minWidth   : 65,
        styles     : common_table_styles,
        hasMaxWidth: true,
        renderCell : (row) => (
            <SettingsCheckbox
                checked={Boolean(row.required)}
                disabled={row.deleted}
            />
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'recurring',
        headerName : 'settings:settlements.table.columns.recurring',
        minWidth   : 65,
        styles     : common_table_styles,
        hasMaxWidth: true,
        renderCell : (row) => (
            <SettingsCheckbox
                checked={Boolean(row.recurring)}
                disabled={row.deleted}
            />
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field     : 'recurring_transaction_cycle_period_frequency',
        headerName: 'settings:settlements.table.columns.frequency',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row, t) => {
            if (!row.recurringTransactionCyclePeriodFrequency) return '-';
            return t(
                `state_info:settlements.recurring_transaction_cycle_period_frequency.${
                    RECURRING_TRANSACTION_CYCLE_PERIOD_FREQUENCY[
                        row.recurringTransactionCyclePeriodFrequency
                    ]
                }`
            );
        },
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'edit',
        headerName : '',
        minWidth   : 50,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <ActionsSettingsTable.Edit disabled={row.deleted} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            if (row.deleted) return;

            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => {
            if (row.deleted) {
                return <ActionsSettingsTable.Restore />;
            }
            return <ActionsSettingsTable.Delete />;
        },
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction(row.deleted ? 'restore' : 'delete', { row, event });
        }
    }
];

export default columns;
