import { formatMiles } from '@/utils/formatting';
import { LoadTable } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import TrackingETACell from '@/views/dispatch/tracking/table/custom-cells/TrackingETACell';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';
import {
    OrdersTableBrokerCell,
    OrdersTableCustomerCell,
    OrdersTableDestinationCell,
    OrdersTableOriginCell,
    OrdersTableStatusChipCell
} from '@/@core/ui-kits/loads/table/custom-cell';
import TruckInfo from './custom-cells/TruckInfo';
import LoadIdCell from './custom-cells/LoadIdCell';

const loadsTableColumns: LoadTable.ColumnLoad[] = [
    {
        header_name: 'columns:id',
        field_name : 'reference_id',
        style      : {
            paddingLeft: '12px',
            display    : 'flex',
            alignItems : 'center',
            height     : '100%'
        },
        headerStyle: {
            paddingLeft: '12px'
        },
        renderCell: (row) => <LoadIdCell friendlyId={row.friendlyId} />
    },
    {
        header_name: 'columns:client',
        field_name : 'broker',
        renderCell : (row) => {
            if (row.brokerId) {
                return <OrdersTableBrokerCell row={row} />;
            }

            return <OrdersTableCustomerCell row={row} />;
        }
    },

    {
        header_name: 'entity:truck',
        field_name : 'truck',
        sortable   : true,
        renderCell : (row, isSelectedRow) => (
            <TruckInfo
                isSelectedRow={isSelectedRow}
                row={row}
            />
        )
    },
    {
        header_name: 'columns:origin',
        field_name : 'first_stop_appointment_start_at',
        sortable   : true,
        renderCell : (row) => <OrdersTableOriginCell row={row} />
    },
    {
        header_name    : 'columns:miles',
        field_name     : 'miles',
        sortable       : true,
        renderTotalCell: (totals) => formatMiles(totals.totalLoadedMiles),
        renderCell     : (row) => (
            <OrdersTableTextCell
                title={formatMiles(row.loadedMiles)}
                description={`${row.stopsCount} stops`}
            />
        )
    },
    {
        header_name: 'columns:destination',
        field_name : 'last_stop_appointment_start_at',
        renderCell : (row) => <OrdersTableDestinationCell row={row} />
    },
    {
        header_name: 'columns:total',
        field_name : 'total',
        sortable   : true,
        style      : {
            display       : 'flex',
            flexDirection : 'column',
            justifyContent: 'center',
            alignItems    : 'flex-start'
        },
        renderTotalCell: (total) => (
            <OrdersTableTextCell
                title={total.totalInvoiceAmountFormatted || '-'}
                description={total.averageRatePerMileFormatted || '-'}
            />
        ),
        renderCell: (row) => (
            <OrdersTableTextCell
                title={row.invoiceAmount || '-'}
                description={row.ratePerMileFormatted || '-'}
            />
        )
    },
    {
        header_name: 'columns:eta',
        field_name : 'eta',
        style      : {
            height: '100%'
        },
        renderCell: (row) => <TrackingETACell row={row} />
    },
    {
        header_name: 'common:status',
        field_name : 'rental',
        renderCell : (row) => (
            <OrdersTableStatusChipCell
                orderId={row.loadId}
                status={row.status}
            />
        )
    }
];

export default loadsTableColumns;
