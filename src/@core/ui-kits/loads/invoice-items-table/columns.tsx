import LoadsTypes from '@/store/dispatch/loads/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    row: LoadsTypes.InvoiceItem;
};

const CategoryName = ({ row }: Props) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={2}
        >
            <span
                style={{
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap'
                }}
            >
                {row.categoryName}
            </span>
            {row.includeInGrossAmount && (
                <Typography
                    variant="caption"
                    component="span"
                    paddingX="4px"
                    fontWeight={500}
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.semantic.foreground.brand.secondary,
                        color       : (theme) => theme.palette.semantic.foreground.brand.primary,
                        borderRadius: '4px'
                    }}
                >
                    {t('common:gross')}
                </Typography>
            )}
        </Stack>
    );
};

const columns: MiniTableColumnType<LoadsTypes.InvoiceItem>[] = [
    {
        headerName : 'core:basic.load.driver_pay_items_table.header.pay_item',
        field      : 'category_name',
        minWidth   : 170,
        flex_start : true,
        hasMaxWidth: true,
        color      : '#667085',
        onClick    : (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => <CategoryName row={row} />
    },
    {
        headerName: 'core:basic.load.driver_pay_items_table.header.units',
        field     : 'units',
        minWidth  : 70,
        flex_start: true,
        color     : '#667085',
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.units || '-'
    },
    {
        headerName: 'core:basic.load.driver_pay_items_table.header.rate',
        field     : 'amount_per_unit',
        minWidth  : 90,
        flex_start: false,
        color     : '#667085',
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.amountPerUnit || '-'
    },
    {
        headerName: 'core:basic.load.driver_pay_items_table.header.total',
        field     : 'total_amount',
        minWidth  : 110,
        flex_start: false,
        isAmount  : true,
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.totalAmount || '-'
    }
];

export default columns;
