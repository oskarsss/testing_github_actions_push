import Icon from '@/@core/components/filters/filter-button/Icon';
import { DRIVER_TYPE_COLORS, DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { styled } from '@mui/material/styles';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TableTypes from '@/@core/components/table/types';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import DriverTableSelfie from '@/@core/components/table/custom-cells/DriverTableSelfie';
import TooltipDriverPing from '@/@core/components/table-tooltips/TooltipDriverPing';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

export const IconWrapper = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    div           : {
        marginLeft: 5
    }
}));

const TrailerTypeCell = ({ trailerTypeId }: { trailerTypeId: string }) => {
    const trailersTypesMap = useTrailersTypesMap();

    const trailerType = trailersTypesMap[trailerTypeId];

    return (
        <>
            <div style={{ display: 'flex' }}>{getTrailerTypeIcon(trailerType?.icon || 0)} </div>
            <span style={{ marginLeft: '5px' }}>{trailerType?.name || ''}</span>
        </>
    );
};
type Row = SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow;

const columns: TableTypes.FixedCustomColumns<Row> = {
    name: {
        width: 200,
        style: {
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'flex-start',
            fontWeight    : 500,
            padding       : 0
        },
        renderCell: (row) => {
            if (!row.driverId) return null;
            return (
                <TooltipDriverPing row={row}>
                    <DriverTableSelfie
                        row={row}
                        rowHeight={PAGE_ROW_HEIGHT_CONFIG.small}
                    />
                    <span>{row.fullName}</span>
                </TooltipDriverPing>
            );
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('driverDetails', {
                row,
                event
            })
    },
    type: {
        width     : 160,
        renderCell: (row) =>
            row.driverType ? (
                <IconWrapper>
                    <Icon
                        icon={DRIVER_TYPE_ICONS[row.driverType.icon]}
                        color={DRIVER_TYPE_COLORS[row.driverType.icon]}
                    />
                    <span>{row.driverType.name}</span>
                </IconWrapper>
            ) : null,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('driverDetails', {
                row,
                event
            })
    },
    truck_reference_id: {
        width     : 160,
        renderCell: (row) => row.truckReferenceId,
        onClick   : (row, {
            event,
            executeAction
        }) =>
            executeAction('truckDetails', {
                row,
                event
            })
    },
    truck_type: {
        width: 160,
        style: {
            fontWeight    : 500,
            display       : 'flex',
            flexDirection : 'row',
            alignItems    : 'center',
            justifyContent: 'flex-start'
        },
        renderCell: (row, { t }) =>
            row?.truckType ? (
                <>
                    <span style={{ marginRight: '4px', marginBottom: '-2px' }}>
                        {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truckType]]}
                    </span>
                    <span>
                        {t(
                            `state_info:trucks.type.${
                                TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[row.truckType]
                            }`
                        )}
                    </span>
                </>
            ) : null,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('truckDetails', {
                row,
                event
            })
    },

    trailer_type: {
        width: 160,
        style: {
            fontWeight    : 500,
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'flex-start'
        },
        renderCell: (row) =>
            row.trailerTypeId && <TrailerTypeCell trailerTypeId={row.trailerTypeId} />,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('trailerDetails', {
                row,
                event
            })
    },
    trailer_reference_id: {
        width  : 160,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('trailerDetails', {
                row,
                event
            }),
        renderCell: (row) => row.trailerReferenceId || 'sss'
    }
};

export default columns;
