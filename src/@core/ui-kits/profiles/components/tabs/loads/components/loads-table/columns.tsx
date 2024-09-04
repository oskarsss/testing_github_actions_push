import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { invoice_icons_with_width } from '@/@core/theme/entities/load/invoice_status';
import StatusBadge from '@/views/accounting/settlements/dialogs/edit-settlement/ui-elements/status-badge/StatusBadge';
import { loads_icons_with_width } from '@/@core/theme/entities/load/status';
import { LoadData_Load } from '@proto/loads';
import LoadStop from '@/@core/ui-kits/profiles/components/tabs/loads/components/loads-table/cells/LoadStop';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';

type Props = {
    manifests: ManifestModel_Manifest[];
    loadId: string;
};
function FirstStop({
    manifests,
    loadId
}: Props) {
    const stops = manifests.flatMap((m) => m.stops.filter((stop) => stop.loadId === loadId));
    const firstStop = stops[0];
    return <LoadStop stop={firstStop} />;
}

function LastStop({
    manifests,
    loadId
}: Props) {
    const stops = manifests.flatMap((m) => m.stops.filter((stop) => stop.loadId === loadId));
    const lastStop = stops[stops.length - 1];
    return <LoadStop stop={lastStop} />;
}

const columns: MiniTableColumnType<LoadData_Load>[] = [
    {
        minWidth   : 60,
        headerName : 'columns:id',
        field      : 'id',
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => row.friendlyId,
        onClick    : (row, {
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
        renderCell: (row) => (
            <FirstStop
                manifests={row.manifests}
                loadId={row.loadId}
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
        headerName: 'columns:destination',
        field     : 'destination',
        flex_start: true,
        renderCell: (row) => (
            <LastStop
                manifests={row.manifests}
                loadId={row.loadId}
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
        minWidth  : 50,
        headerName: 'columns:rpm',
        field     : 'rpm',
        flex_start: true,
        renderCell: (row) => row.ratePerMile,
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
        field     : 'broker',
        flex_start: false,
        renderCell: (row) => row.grossAmountFormatted,
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
        minWidth  : 80,
        headerName: 'columns:driver_pay',
        field     : 'driver_pay',
        flex_start: false,
        renderCell: (row) => row.driverNet,
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
            <StatusBadge
                status={LOAD_STATUS_GRPC_ENUM[row.status]}
                icons={loads_icons_with_width}
                text={`state_info:loads.status.${LOAD_STATUS_GRPC_ENUM[row.status]}`}
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
        minWidth  : 50,
        headerName: 'columns:invoice',
        field     : 'invoice_status',
        flex_start: true,
        renderCell: (row) => (
            <StatusBadge
                status={LOAD_INVOICE_STATUS_GRPC_ENUM[row.invoiceStatus]}
                icons={invoice_icons_with_width}
                text={`state_info:loads.invoice_status.${
                    LOAD_INVOICE_STATUS_GRPC_ENUM[row.invoiceStatus]
                }`}
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
