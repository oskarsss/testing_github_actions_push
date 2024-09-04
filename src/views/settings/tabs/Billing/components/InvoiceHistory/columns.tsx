import Settings from '@/store/settings/types';
import StatusChip from '@/views/settings/tabs/Billing/components/StatusChip';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import { Stack } from '@mui/material';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

export const columns: MiniTableColumnType<Settings.InvoiceItem>[] = [
    {
        headerName: 'settings:billing.table.columns.finish_date',
        field     : 'finishDate',
        minWidth  : 170,
        flex_start: true,
        renderCell: (row, t) => (
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="8px"
            >
                {row.periodEnd}
                {row.hostedInvoiceUrl && (
                    <Tooltip title={t('common:actions.show_more')}>
                        <Link
                            href={row.hostedInvoiceUrl}
                            target="_blank"
                        >
                            <IconButton
                                aria-label="more"
                                size="small"
                            >
                                <OpenInNewIcon fontSize="small" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                )}
            </Stack>
        )
    },
    {
        headerName: 'settings:billing.table.columns.amount',
        field     : 'amount',
        minWidth  : 120,
        flex_start: true,
        isAmount  : true,
        renderCell: (row) => row.amountDue
    },
    {
        headerName: 'settings:billing.table.columns.status',
        field     : 'status',
        minWidth  : 130,
        flex_start: true,
        renderCell: (row) => <StatusChip status={row.status} />
    },
    {
        headerName: 'settings:billing.table.columns.purpose',
        field     : 'purpose',
        minWidth  : 500,
        flex_start: true,
        renderCell: (row) => row.description
    },
    {
        headerName: 'settings:billing.table.columns.actions',
        field     : 'actions',
        minWidth  : 70,
        flex_start: true,
        renderCell: (row, t) => (
            <Tooltip
                title={t('common:actions.download_invoice')}
                disableInteractive
            >
                <IconButton
                    size="small"
                    aria-label="download invoice"
                    disabled={!row.invoicePdfUrl}
                    component="a"
                    href={row.invoicePdfUrl}
                    download
                >
                    <DownloadIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )
    }
];
