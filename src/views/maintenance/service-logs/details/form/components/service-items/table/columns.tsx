import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import type { ServiceLogItemModel_ItemRead } from '@proto/models/model_service_log_item';
import VectorIcons from '@/@core/icons/vector_icons';
import { IconButton } from '@mui/material';
import Warranty from './custom-cell/Warranty';

const columns: MiniTableColumnType<ServiceLogItemModel_ItemRead & { itemTypeName: string }>[] = [
    {
        headerName:
            'maintenance:service_logs.panel.sections.service_items.table.columns.service_item',
        field     : 'service_item',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.itemTypeName
    },
    {
        headerName:
            'maintenance:service_logs.modals.form.sections.service_items.fields.warranty_covered.label',
        field     : 'warranty',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <Warranty warrantyCoverage={row.warrantyCoverage} />
    },
    {
        headerName: 'columns:units',
        field     : 'units',
        minWidth  : 60,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.quantity
    },
    {
        headerName: 'common:rate',
        field     : 'rate',
        minWidth  : 90,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => getFormattedAmountOfMoney(row.rate)
    },
    {
        headerName: 'common:total',
        field     : 'total',
        minWidth  : 120,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => getFormattedAmountOfMoney(row.amount)
    },
    {
        headerName: '',
        field     : 'delete',
        minWidth  : 20,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('delete', { row, event }),
        renderCell: (row) => (
            <IconButton sx={{ padding: 0 }}>
                <VectorIcons.TrashIcon
                    sx={{
                        fontSize: '16px',
                        path    : {
                            fill: ({ palette }) => palette.semantic.foreground.primary
                        }
                    }}
                />
            </IconButton>
        )
    }
];

export default columns;
