import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { Typography } from '@mui/material';
import React from 'react';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { TruFundInvoice } from '@/views/billing/factoring/dialogs/tru-fund/helpers';
import ClientName from './custom-cell/ClientName';
import ClientNotAssign from './custom-cell/ClientNotAssign';
import LoadFriendlyId from './custom-cell/LoadFriendlyId';

const columns: MiniTableColumnType<TruFundInvoice>[] = [
    {
        headerName : 'billing:dialogs.table.header.id',
        field      : 'loadFriendlyId',
        minWidth   : 90,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => (
            <LoadFriendlyId
                loadFriendlyId={row.loadFriendlyId}
                hasErrors={row.hasErrors}
                errors={row.errors}
            />
        )
    },
    {
        headerName : 'billing:dialogs.table.header.ref',
        field      : 'ref',
        minWidth   : 100,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => (
            <Typography
                noWrap
                fontWeight={500}
                fontSize="14px"
                color="semantic.text.secondary"
                lineHeight="18px"
            >
                {row.loadReferenceId || '-'}
            </Typography>
        )
    },
    {
        headerName : 'billing:dialogs.table.header.client',
        field      : 'amount_per_unit',
        minWidth   : 280,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            if (!row.brokerId && !row.customerId) {
                event.preventDefault();
                event.stopPropagation();
                executeAction('edit_load', { row, event });
            }
        },
        renderCell: (row) => {
            if (!row.brokerId && !row.customerId) return <ClientNotAssign />;
            return <ClientName brokerName={row.clientName} />;
        }
    },
    {
        headerName : 'common:status',
        field      : 'status',
        minWidth   : 120,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => (
            <LoadStatusChipSelect
                load_id={row.loadId}
                load_status={LOAD_STATUS_GRPC_ENUM[row.status]}
                is_changing={false}
                size="small"
            />
        )
    },
    {
        headerName : 'billing:dialogs.table.header.invoice',
        field      : 'Invoice',
        minWidth   : 145,
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => (
            <LoadInvoiceStatusChipSelect
                load_id={row.loadId}
                invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[row.invoiceStatus]}
                is_changing={false}
                size="small"
            />
        )
    },
    {
        headerName : 'common:amount',
        field      : 'amount',
        minWidth   : 146,
        flex_start : false,
        isAmount   : true,
        hasMaxWidth: true,
        renderCell : (row) => row.amount
    },
    {
        headerName : 'billing:dialogs.table.header.factoring',
        field      : 'factoringAmount',
        minWidth   : 146,
        flex_start : false,
        isAmount   : true,
        hasMaxWidth: true,
        renderCell : (row) => row.factoringAmount
    }
];

export default columns;
