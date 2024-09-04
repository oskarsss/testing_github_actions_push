import Customers from '@/store/dispatch/customers/types';
import TableTypes from '@/@core/components/table/types';

const columns: TableTypes.FixedCustomColumns<Customers.CustomerRow> = {
    id: {
        width   : 100,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.customerFriendlyId
    },
    name: {
        width   : 250,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.name
    },
    address_line_1: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.addressLine1
    },
    address_city: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.addressCity
    },
    address_state: {
        width   : 60,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.addressState
    },
    contact_phone: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.contactPhone
    },
    contact_email: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.contactEmail
    },
    contact_fax: {
        width   : 150,
        sortable: true,
        style   : {
            fontWeight: 500
        },
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.contactFax
    }
};

export default columns;
