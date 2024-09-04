import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ConvertedIftaTruck } from '@/store/ifta/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const TruckTypeCell = ({ row }: { row: ConvertedIftaTruck }) => {
    const { t } = useAppTranslation();
    return t(`state_info:trucks.type.${row.type}`);
};

const IFTA_TRUCKS_COLUMNS: MiniTableColumnType<{
    truck: ConvertedIftaTruck;
}>[] = [
    {
        field      : 'referenceId',
        headerName : 'ifta:details.trucks.table.columns.reference_id',
        minWidth   : 170,
        flex_start : true,
        renderCell : ({ truck }) => truck.referenceId,
        hasMaxWidth: false
    },
    {
        field      : 'type',
        headerName : 'ifta:details.trucks.table.columns.type',
        flex_start : true,
        minWidth   : 170,
        renderCell : ({ truck }) => <TruckTypeCell row={truck} />,
        hasMaxWidth: false
    },
    {
        field      : 'state',
        headerName : 'ifta:details.trucks.table.columns.state',
        flex_start : true,
        minWidth   : 170,
        renderCell : ({ truck }) => truck.state,
        hasMaxWidth: false
    },

    {
        field      : 'driver',
        headerName : 'ifta:details.trucks.table.columns.driver',
        flex_start : true,
        minWidth   : 170,
        renderCell : ({ truck }) => truck.driver?.name,
        hasMaxWidth: false
    },
    {
        field     : 'totalFuelQuantity',
        headerName: 'ifta:details.trucks.table.columns.total_fuel_quantity',
        flex_start: false,
        minWidth  : 170,

        renderCell : ({ truck }) => truck.totalFuelQuantity,
        hasMaxWidth: false
    },
    {
        field      : 'totalDistance',
        flex_start : false,
        headerName : 'ifta:details.trucks.table.columns.total_distance',
        minWidth   : 170,
        renderCell : ({ truck }) => truck.totalDistance,
        hasMaxWidth: true
    }
];

export default IFTA_TRUCKS_COLUMNS;
