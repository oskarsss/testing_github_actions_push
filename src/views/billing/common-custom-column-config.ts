import { CSSProperties } from 'react';
import TableTypes from '@/@core/components/table/types';
import { ConvertedGrpcInvoiceType } from '@/store/billing/hooks';

const common_styles: CSSProperties = {
    fontWeight    : 500,
    boxSizing     : 'border-box',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'left'
};

const getBillingCustomColumns: TableTypes.CustomColumns<ConvertedGrpcInvoiceType> = {
    client: {
        width  : 150,
        style  : common_styles,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        renderCell: (row) => {
            if (row.brokerId && row.broker) {
                return row.broker;
            }
            if (row.customerId && row.customer_name) {
                return row.customer_name;
            }
            return '';
        }
    },
    customer_name: {
        width  : 150,
        style  : common_styles,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        renderCell: (row) => row.customer_name
    },
    customer_short_name: {
        width  : 150,
        style  : common_styles,
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                element_id: event.currentTarget
            }),
        renderCell: (row) => row.customer_short_name
    }
};

export default getBillingCustomColumns;
