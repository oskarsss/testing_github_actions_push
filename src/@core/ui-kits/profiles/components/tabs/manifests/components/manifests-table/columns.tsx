import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { isCompletedStop } from '@/utils/load-stops';
import { getActiveStopsCount } from '@/@grpcServices/services/manifests-service/utils';
import ManifestStop from './cells/ManifestStop';
import ManifestId from './cells/ManifestId';

function OriginCell({ row }: { row: ManifestModel_Manifest }) {
    const stop = row.stops[0];
    if (!stop) return null;
    return (
        <ManifestStop
            stop={stop}
            manifestId={row.manifestId}
        />
    );
}

function DestinationCell({ row }: { row: ManifestModel_Manifest }) {
    const stop = row.stops[row.stops.length - 1];
    if (!stop) return null;
    return (
        <ManifestStop
            stop={stop}
            manifestId={row.manifestId}
        />
    );
}

function CompletedStopsCell({ row }: { row: ManifestModel_Manifest }) {
    const totalStopsCount = row.stops.length;
    const completedStopsCount = totalStopsCount - getActiveStopsCount(row.stops).length;
    return (
        <span>
            {completedStopsCount} / {totalStopsCount}
        </span>
    );
}

const columns: MiniTableColumnType<ManifestModel_Manifest>[] = [
    {
        minWidth   : 60,
        headerName : 'columns:id',
        field      : 'id',
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => (
            <ManifestId
                friendlyId={row.friendlyId}
                title={row.title}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 150,
        headerName: 'columns:origin',
        field     : 'origin',
        flex_start: true,
        renderCell: (row) => <OriginCell row={row} />,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 150,
        headerName: 'columns:destination',
        field     : 'destination',
        flex_start: true,
        renderCell: (row) => <DestinationCell row={row} />,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 100,
        headerName: 'columns:distance',
        field     : 'total_distance',
        flex_start: true,
        renderCell: (row) => row.totalDistance?.milesFormatted,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 50,
        headerName: 'common:gross',
        field     : 'gross',
        flex_start: false,
        renderCell: (row) => row.gross?.amountFormatted || '',
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 120,
        headerName: 'columns:completed_stops',
        field     : 'completed_stops',
        flex_start: false,
        renderCell: (row) => <CompletedStopsCell row={row} />,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 50,
        headerName: 'common:status',
        field     : 'status',
        flex_start: true,
        renderCell: (row) => (
            <ManifestStatusChipSelect
                manifestId={row.manifestId}
                status={row.status}
                is_changing={false}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    }
];

export default columns;
