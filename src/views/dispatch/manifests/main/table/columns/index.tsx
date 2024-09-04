import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import { CSSProperties, useMemo, ReactNode } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import NextStop from '@/views/dispatch/manifests/main/table/columns/custom-cells/NextStop';
import { getPrepareStops } from '@/@grpcServices/services/manifests-service/utils';
import ManifestETACell from '@/views/dispatch/orders/main/table/columns/custom-cells/ManifestETACell';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { OrdersTableTextCell } from '@/@core/ui-kits/loads/table';
import { OrdersTableStopCell } from '@/@core/ui-kits/loads/table/custom-cell';
import Truck from './custom-cells/Truck';
import ManifestId from './custom-cells/ManifestId';
import LoadIds from './custom-cells/load-ids/LoadIds';
import StopsProgress from './custom-cells/stops-progress/StopsProgress';
import OriginCell from './custom-cells/OriginCell';

type ColumnManifests = {
    header_name: IntlMessageKey;
    field_name?: string;
    style?: CSSProperties;
    headerStyle?: CSSProperties;
    sortable?: boolean;
    renderCell: (row: ManifestModel_Manifest, isSelectedRow: boolean) => ReactNode;
    renderTotalCell?: (total: ManifestsTypes.TableTotals) => React.ReactNode;
};

function Destination({ row }: { row: ManifestModel_Manifest }) {
    const lastStop = useMemo(() => {
        const lastStop = row.stops[row.stops.length - 1];
        if (!lastStop) return null;
        return getPrepareStops([lastStop])[0];
    }, [row.stops]);
    return (
        <OrdersTableStopCell
            city={lastStop?.location?.city || ''}
            state={lastStop?.location?.state || ''}
            time={lastStop?.appointmentStartAtLocal || ''}
        />
    );
}

const manifestsColumns: ColumnManifests[] = [
    {
        header_name: 'columns:id',
        field_name : 'reference_id',
        sortable   : false,
        style      : {
            paddingLeft: '12px',
            display    : 'flex',
            alignItems : 'center',
            height     : '100%'
        },
        headerStyle: {
            paddingLeft: '12px'
        },
        renderCell: (row) => <ManifestId manifest={row} />
    },
    {
        header_name: 'entity:loads',
        field_name : 'loads',
        style      : {
            display   : 'flex',
            alignItems: 'center',
            height    : '100%'
        },
        sortable       : false,
        renderCell     : (row) => <LoadIds row={row} />,
        renderTotalCell: (totals) => totals.totalLoadsCount
    },
    {
        header_name: 'entity:truck',
        field_name : 'truck',
        sortable   : false,
        style      : {
            display   : 'flex',
            alignItems: 'center',
            height    : '100%'
        },
        renderCell: (row, isSelectedRow) => {
            if (!row) return null;
            return (
                <Truck
                    manifestFriendlyId={row.friendlyId.toString()}
                    manifestId={row.manifestId}
                    driverId={row.primaryDriverId}
                    truckId={row.truckId}
                    stops={row.stops}
                    isSelectedRow={isSelectedRow}
                />
            );
        }
    },
    {
        header_name: 'columns:origin',
        field_name : 'first_stop_appointment_start_at',
        sortable   : true,
        renderCell : (row) => <OriginCell row={row} />
    },
    {
        header_name    : 'columns:miles',
        field_name     : 'miles',
        sortable       : true,
        renderTotalCell: (total) => (
            <OrdersTableTextCell
                title={total?.totalDistance || '-'}
                description=""
            />
        ),
        renderCell: (row) => (
            <OrdersTableTextCell
                title={row?.totalDistance?.milesFormatted || '-'}
                description=""
            />
        ),
        style: {
            display   : 'flex',
            alignItems: 'center',
            height    : '100%'
        }
    },
    {
        header_name: 'columns:destination',
        field_name : 'last_stop_appointment_start_at',
        sortable   : false,
        renderCell : (row) => <Destination row={row} />
    },
    {
        header_name: 'entity:stops',
        field_name : 'stops',
        sortable   : false,
        renderCell : (row) => <StopsProgress row={row} />
    },
    {
        header_name: 'columns:next_stop',
        field_name : 'next_stop',
        sortable   : false,
        renderCell : (row) => <NextStop row={row} />
    },
    {
        header_name    : 'common:gross',
        field_name     : 'gross',
        sortable       : true,
        renderTotalCell: (total) => (
            <OrdersTableTextCell
                title={total?.totalGrossAmount || '-'}
                description={total.averageRatePerMileFormatted || '-'}
            />
        ),
        renderCell: (row) => {
            if (!row) return null;
            return (
                <OrdersTableTextCell
                    title={row.gross?.amountFormatted || '-'}
                    description={row.rpm?.amountFormatted || '-'}
                />
            );
        }
    },
    {
        header_name: 'columns:eta',
        field_name : 'eta',
        renderCell : (row) => (
            <ManifestETACell
                manifestStatus={row.status}
                truckId={row.truckId}
                stops={row.stops}
            />
        )
    },
    {
        header_name: 'common:status',
        field_name : 'status',
        renderCell : (row) => (
            <div
                style={{
                    display   : 'flex',
                    alignItems: 'center',
                    height    : '100%'
                }}
            >
                <ManifestStatusChipSelect
                    manifestId={row.manifestId}
                    status={row.status}
                    styles={{
                        minWidth      : '122px',
                        justifyContent: 'space-between'
                    }}
                />
            </div>
        ),
        sortable: false,
        style   : {
            display   : 'flex',
            alignItems: 'center',
            height    : '100%'
        }
    }
];

export default manifestsColumns;
