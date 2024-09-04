import { checkbox_style, getFunctionalCheckbox } from '@/@core/components/table/table_config';
import PlatesTypes from '@/store/fleet/plates/types';
import TableTypes from '@/@core/components/table/types';
import { Stack } from '@mui/material';
import PlateStatusChipSelect from '@/@core/fields/chip-select/PlateStatusChipSelect';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import { FLEET_TYPE_GRPC_ICONS } from '@/@core/theme/entities/fleet/FLEET_TYPE';

const columns: TableTypes.FixedCustomColumns<PlatesTypes.Row & PlatesTypes.CustomColumns> = {
    owned: {
        width   : 50,
        sortable: true,
        onClick : (row, {
            event,
            executeAction
        }) =>
            executeAction('update', {
                event,
                row,
                data: { owned: row.owned ? 0 : 1 }
            }),
        style     : checkbox_style,
        renderCell: (row) => getFunctionalCheckbox(row.owned)
    },
    status: {
        width     : 200,
        sortable  : true,
        style     : StatusChipCellStyle,
        renderCell: (row) => (
            <PlateStatusChipSelect
                plate_id={row.plateId}
                plate_status={row.status}
                show_arrow={false}
                full_width
            />
        )
    },
    vehicle: {
        width  : 100,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('view', {
                row,
                event
            }),
        renderCell: (row) => row.truckRefId || row.trailerRefId
    },
    vehicle_type: {
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('view', {
                row,
                event
            }),
        width     : 100,
        renderCell: (row) => (
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    svg: {
                        fill: (theme) => theme.palette.utility.foreground.gray.primary
                    }
                }}
            >
                {FLEET_TYPE_GRPC_ICONS[row.vehicleType]}
            </Stack>
        )
    }
};

export default columns;
