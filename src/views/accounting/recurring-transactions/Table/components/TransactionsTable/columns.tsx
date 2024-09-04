import Icon from '@/@core/components/filters/filter-button/Icon';
import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TableTypes from '@/@core/components/table/types';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { Stack } from '@mui/material';
import DriverTableSelfie from '@/@core/components/table/custom-cells/DriverTableSelfie';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import TooltipDriverPing from '@/@core/components/table-tooltips/TooltipDriverPing';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';

type Row = SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow;

const columns: TableTypes.FixedCustomColumns<Row> = {
    driver_name: {
        width: 200,
        style: {
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'flex-start',
            fontWeight    : 500,
            padding       : 0
        },
        renderCell: (row) => (
            <TooltipDriverPing row={row}>
                <DriverTableSelfie
                    row={row}
                    rowHeight={PAGE_ROW_HEIGHT_CONFIG.small}
                />
                <span>{row.fullName}</span>
            </TooltipDriverPing>
        ),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    },
    truck_reference_id: {
        width: 160,
        style: {
            padding: '0px'
        },
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                height="100%"
                px="5px"
            >
                {row.truckReferenceId}
            </Stack>
        ),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    },
    trailer_reference_id: {
        width: 160,
        style: {
            padding: '0px'
        },
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                height="100%"
                px="5px"
            >
                {row.trailerReferenceId}
            </Stack>
        ),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    },
    category: {
        style: {
            padding : '0px',
            flexGrow: 1
        },
        width     : 160,
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                height="100%"
                width="100%"
                px="5px"
            >
                {row.categoryType === SettlementTransactionCategoryModel_Type.DEBIT ? (
                    <EditSettlementIcons.Overview.Debits />
                ) : (
                    <EditSettlementIcons.Overview.Credits />
                )}
                {row.categoryName}
            </Stack>
        )
    },
    driver_type: {
        width: 160,
        style: {
            padding: '0px'
        },
        renderCell: (row, { t }) =>
            row.driverType ? (
                <Stack
                    direction="row"
                    alignItems="center"
                    height="100%"
                    px="5px"
                >
                    <Icon
                        icon={DRIVER_TYPE_ICONS[row.driverType.icon]}
                        color={ENTITY_CHIP_COLORS[row.driverType.icon]}
                    />
                    {row.driverType.name}
                </Stack>
            ) : null,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    },

    truck_type: {
        width: 160,
        style: {
            padding: '0px'
        },

        renderCell: (row, { t }) =>
            !!row.truckType && (
                <Stack
                    direction="row"
                    alignItems="center"
                    height="100%"
                    px="5px"
                >
                    {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truckType]]}
                    {t(`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truckType]}`)}
                </Stack>
            ),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    },
    trailer_type: {
        width     : 160,
        renderCell: (row) =>
            row.trailerType && (
                <Stack
                    direction="row"
                    alignItems="center"
                    height="100%"
                    px="5px"
                >
                    {getTrailerTypeIcon(row.trailerType ? row.trailerType.icon : 0)}{' '}
                    <span style={{ marginLeft: '5px' }}>{row.trailerType.name}</span>
                </Stack>
            ),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('options', {
                row,
                event
            })
    }
};

export default columns;
