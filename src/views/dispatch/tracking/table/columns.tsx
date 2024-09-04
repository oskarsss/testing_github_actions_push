import { formatMiles } from '@/utils/formatting';
import { LoadData_Load } from '@proto/loads';
import { IntlMessageKey } from '@/@types/next-intl';
import { CSSProperties } from 'react';
import { LoadsTableTotals } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';
import {
    OrdersTableBrokerCell,
    OrdersTableCustomerCell,
    OrdersTableDestinationCell,
    OrdersTableOriginCell,
    OrdersTableStatusChipCell
} from '@/@core/ui-kits/loads/table/custom-cell';
import TruckInfo from '../../orders/main/table/columns/custom-cells/TruckInfo';
import TrackingETACell from './custom-cells/TrackingETACell';
import LoadIdCell from '../../orders/main/table/columns/custom-cells/LoadIdCell';

export type ClickActionType = (type: string, row: number, event: React.SyntheticEvent) => void;

type ColumnLoad = {
    header_name: IntlMessageKey;
    width: React.CSSProperties['width'];
    minWidth?: React.CSSProperties['minWidth'];
    field_name?: string;
    style?: CSSProperties;
    headerStyle?: CSSProperties;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    sortable?: boolean;
    renderCell: (
        row: LoadData_Load,
        isSelectedRow: boolean,
        handleClick?: ClickActionType
    ) => React.ReactNode;
    renderTotalCell?: (total: LoadsTableTotals) => React.ReactNode;
};

export const TRACKING_LOADS_COLUMNS: ColumnLoad[] = [
    {
        width      : 'minmax(70px, 0.5fr)',
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
        width      : 'minmax(100px, 1fr)', // 130
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
        width      : 'minmax(90px, 0.8fr)', // 110
        header_name: 'entity:truck',
        field_name : 'truck',
        sortable   : true,
        renderCell : (row, isSelectedRow) => (
            <TruckInfo
                row={row}
                isSelectedRow={isSelectedRow}
            />
        )
    },
    {
        width      : 'minmax(140px, 1.4fr)', // 140
        header_name: 'columns:origin',
        field_name : 'first_stop_appointment_start_at',
        sortable   : true,
        renderCell : (row) => <OrdersTableOriginCell row={row} />
    },
    {
        width          : 'minmax(60px, 0.5fr)', // 60
        header_name    : 'columns:miles',
        field_name     : 'miles',
        sortable       : true,
        renderTotalCell: (totals) => formatMiles(totals.totalLoadedMiles),
        renderCell     : (row) => (
            <OrdersTableTextCell
                title={formatMiles(row.loadedMiles)}
                description=""
            />
        )
    },
    {
        width      : 'minmax(140px, 1.4fr)', // 140
        header_name: 'columns:destination',
        field_name : 'last_stop_appointment_start_at',
        renderCell : (row) => <OrdersTableDestinationCell row={row} />
    },
    {
        width      : 'minmax(65px, 0.7fr)', // 80
        header_name: 'columns:eta',
        field_name : 'eta',
        style      : {
            height: '100%'
        },
        renderCell: (row) => <TrackingETACell row={row} />
    },
    {
        width      : 'minmax(145px, 1fr)', // 146
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
