import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ManifestModel_Driver_PayItem } from '@proto/models/model_manifest';
import { useDriverPayCategoriesMap } from '@/store/hash_maps/hooks';

const CategoryName = ({ row }: { row: ManifestModel_Driver_PayItem }) => {
    const categoriesMap = useDriverPayCategoriesMap();
    const category = categoriesMap[row.categoryId];

    return category?.name || '-';
};

const columns: MiniTableColumnType<ManifestModel_Driver_PayItem>[] = [
    {
        headerName: 'columns:pay_item',
        field     : 'category_name',
        minWidth  : 200,
        flex_start: true,
        color     : '#667085',
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <CategoryName row={row} />
    },
    {
        headerName: 'columns:units',
        field     : 'units',
        minWidth  : 70,
        flex_start: true,
        color     : '#667085',
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.units || '-'
    },
    {
        headerName: 'columns:rate',
        minWidth  : 90,
        field     : 'amount_per_unit',
        flex_start: false,
        color     : '#667085',
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.amountPerUnit || '-'
    },
    {
        headerName: 'common:total',
        minWidth  : 110,
        field     : 'total_amount',
        flex_start: false,
        isAmount  : true,
        onClick   : (row, {
            event,
            executeAction
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.total?.amountFormatted || '-'
    }
];

export default columns;
