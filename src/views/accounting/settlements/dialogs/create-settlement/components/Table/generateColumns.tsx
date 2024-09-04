import DriversTypes from '@/store/fleet/drivers/types';
import { Stack, Typography } from '@mui/material';

import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { StatusChipWithDot } from '@/@core/theme/chip';
import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { Driver } from '@/views/accounting/settlements/dialogs/create-settlement/components/Table/custom-cells/Driver';
import { DRIVER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import AddData from './custom-cells/AddData';

export type CreateSettlementsColumn = MiniTableColumnType<DriversTypes.ConvertedDriverRow>;

export const generateColumns: CreateSettlementsColumn[] = [
    {
        field      : 'driver_friendly_id',
        flex_start : true,
        hasMaxWidth: true,
        headerName : 'modals:settlements.create_settlement.table.titles.truck',
        minWidth   : 120,
        renderCell : (row) => (
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                {row.truck && ENTITY_CHIP_ICONS[row.truck.type]}
                <Typography
                    fontWeight={500}
                    fontSize="12px"
                    color="semantic.foreground.primary"
                    lineHeight="18px"
                    noWrap
                >
                    {row.truck ? `#${row.truck.referenceId}` : '-'}
                </Typography>
            </Stack>
        )
    },
    {
        field      : 'name',
        headerName : 'modals:settlements.create_settlement.table.titles.name',
        hasMaxWidth: true,
        flex_start : true,
        minWidth   : 228,
        renderCell : (row) => (
            <Driver
                selfie_thumb_url={row.selfieThumbUrl}
                full_name={`${row.firstName} ${row.lastName}`}
            />
        )
    },
    {
        field      : 'type',
        headerName : 'modals:settlements.create_settlement.table.titles.driver_type',
        flex_start : true,
        hasMaxWidth: true,
        minWidth   : 143,
        renderCell : (row) => (
            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                {row.driverType && DRIVER_TYPE_ICONS[row.driverType.icon]}
                <Typography
                    fontWeight={500}
                    fontSize="12px"
                    color="semantic.foreground.primary"
                    lineHeight="18px"
                    noWrap
                >
                    {row.driverType?.name || ''}
                </Typography>
            </Stack>
        )
    },
    {
        field     : 'revenueType',
        headerName: 'modals:settlements.create_settlement.table.titles.revenue_type',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row, t) => row.revenueType?.name || <AddData t={t} />
    },
    {
        field     : 'cycle',
        headerName: 'entity:cycle',
        minWidth  : 120,
        flex_start: true,
        renderCell: (row, t) => row.cycle?.name || <AddData t={t} />
    },
    {
        field      : 'status',
        headerName : 'common:status',
        flex_start : true,
        hasMaxWidth: true,
        minWidth   : 144,
        renderCell : (row, t) => (
            <StatusChipWithDot
                color={DRIVER_STATUS_COLORS[DRIVER_STATUS_TO_GRPC_ENUM[row.status]]}
                status={t(`state_info:drivers.status.${row.status}`)}
            />
        )
    }
];
