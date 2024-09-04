import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import Equipment from '@/@core/components/service-log-equipment';
import moment from 'moment-timezone';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';

const columns: MiniTableColumnType<ServiceLogModel_ServiceLogRead>[] = [
    {
        headerName  : 'common:id',
        field       : 'id',
        minWidth    : 50,
        flex_start  : true,
        getCellStyle: () => ({
            cursor        : 'pointer',
            textDecoration: 'underline',
            fontWeight    : 500,
            fontSize      : '14px',
            color         : ({ palette }) => `${palette.semantic.text.brand.primary} !important`
        }),
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => row.friendlyId
    },
    {
        headerName : 'common:equipment',
        field      : 'equipment',
        minWidth   : 180,
        hasMaxWidth: true,
        flex_start : true,
        renderCell : (row) => (
            <Equipment
                vehicleType={row.vehicleType}
                truckId={row.truckId}
                trailerId={row.trailerId}
            />
        )
    },
    {
        headerName: 'maintenance:service_logs.table.columns.total_amount',
        field     : 'total_amount',
        minWidth  : 100,
        flex_start: false,
        renderCell: (row) => getFormattedAmountOfMoney(row.totalAmount)
    },
    {
        headerName: 'maintenance:service_logs.table.columns.completed_date',
        field     : 'completed_date',
        minWidth  : 110,
        flex_start: true,
        renderCell: (row) => moment(row.endDate).format('MM/DD/YYYY')
    }
];

export default columns;
