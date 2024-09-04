import TableTypes from '@/@core/components/table/types';
import Settings from '@/store/settings/types';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LinkIcon from '@mui/icons-material/Link';
import { StatusChip } from '@/@core/theme/chip';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';
import { Stack } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import type { TFunction } from '@/@types/next-intl';

const providerVehiclesColumns: TableTypes.CustomColumns<
    Settings.ProviderVehicleRow & { connected_status?: boolean }
> = {
    connected_status: {
        width   : 140,
        sortable: true,
        style   : { ...StatusChipCellStyle, padding: 'inherit' },
        onClick : (row, {
            executeAction,
            event
        }) => executeAction('vehicle', { row, event }),
        renderCell: (row, { t }: { t: TFunction }) => (
            <StatusChip
                color={row.connected ? 'success' : 'error'}
                status={t(
                    `settings:integrations.details.right_side.manage.${
                        row.connected ? 'connected' : 'not_connected'
                    }`
                )}
            />
        )
    },
    connected: {
        width   : 160,
        sortable: true,
        style   : {
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'space-between',
            color         : '#285FF6',
            fontSize      : '14px',
            fontWeight    : 500
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('vehicle', { row, event }),
        renderCell: (row, { t }) => (
            <>
                <p>
                    {t(
                        `modals:settings.integrations.vehicles.button.${
                            row.connected ? 'unlink' : 'link'
                        }`
                    )}
                </p>
                {row.connected ? <LinkOffIcon /> : <LinkIcon />}
            </>
        )
    },
    entityType: {
        width     : 200,
        sortable  : true,
        renderCell: (row, { t }) =>
            row.entityType ? (
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="6px"
                >
                    {row.entityType === 'truck' ? (
                        <VectorIcons.NavIcons.Truck size={20} />
                    ) : (
                        <VectorIcons.NavIcons.Trailer size={20} />
                    )}
                    <span>{t(`entity:${row.entityType as 'truck' | 'trailer'}`)}</span>
                </Stack>
            ) : null
    }
};

export default providerVehiclesColumns;
