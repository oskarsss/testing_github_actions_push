import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';

const columns: MiniTableColumnType<TruckModel_Truck>[] = [
    {
        headerName: 'columns:ref',
        minWidth  : 50,
        renderCell: (row) => row.referenceId,
        field     : 'referenceId',
        flex_start: true
    },
    {
        headerName: 'entity:truck',
        minWidth  : 50,
        renderCell: (row) => `${row.make} ${row.model}`,
        field     : 'truck',
        flex_start: true
    },
    {
        headerName: 'common:type',
        minWidth  : 50,
        renderCell: (row, t) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.type]]}{' '}
                {t(`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.type]}`)}
            </div>
        ),
        field     : 'type',
        flex_start: true
    }
];

export default columns;
