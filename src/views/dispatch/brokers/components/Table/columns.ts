import BrokersTypes from '@/store/dispatch/brokers/types';
import TableTypes from '@/@core/components/table/types';

const columns: TableTypes.CustomColumns<BrokersTypes.BrokerRow> = {
    mc: {
        width   : 90,
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
        renderCell: (row) => row.mc
    },
    dot: {
        width   : 90,
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
        renderCell: (row) => row.dot
    },
    short_name: {
        width   : 120,
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
        renderCell: (row) => row.shortName
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
    phone_number: {
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
        renderCell: (row) => row.phoneNumber
    },
    email: {
        width   : 350,
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
        renderCell: (row) => row.email
    },
    address: {
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
        renderCell: (row) => row.address
    },
    active: {
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
        renderCell: (row, { t }) => t(row.active ? 'common:yes' : 'common:no').toUpperCase()
    }
};

export default columns;
