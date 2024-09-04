import TableTypes from '@/@core/components/table/types';
import Settings from '@/store/settings/types';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LinkIcon from '@mui/icons-material/Link';
import { StatusChip } from '@/@core/theme/chip';
import { StatusChipCellStyle } from '@/@core/components/table/styles/statusChipCellStyle';

const providerDriversColumns: TableTypes.CustomColumns<Settings.ProviderDriverRow> = {
    ['connected_status' as 'status']: {
        width   : 140,
        sortable: true,
        style   : { ...StatusChipCellStyle, padding: 'inherit' },
        onClick : (row, {
            executeAction,
            event
        }) => executeAction('driver', { row, event }),
        renderCell: (row, { t }) => (
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

    // @ts-ignore
    status: {
        width     : 140,
        sortable  : true,
        renderCell: (row) => (
            <StatusChip
                color={row.status === 'active' ? 'success' : 'error'}
                status={row.status}
            />
        )
    },
    connected: {
        width: 160,
        style: {
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
        }) => executeAction('driver', { row, event }),
        renderCell: (row, { t }) => (
            <>
                <p>
                    {t(
                        `modals:settings.integrations.drivers.button.${
                            row.connected ? 'unlink' : 'link'
                        }`
                    )}
                </p>
                {row.connected ? <LinkOffIcon /> : <LinkIcon />}
            </>
        )
    }
};

export default providerDriversColumns;
