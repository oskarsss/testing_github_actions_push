import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import LoadInvoiceStatusChipSelect from '@/@core/fields/chip-select/LoadInvoiceStatusChipSelect';
import { LOAD_INVOICE_STATUS_GRPC_ENUM, LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { useBrokersMap, useCustomersMap, useFactoringCompaniesMap } from '@/store/hash_maps/hooks';
import { Stack, styled } from '@mui/material';
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';
import { BrokersIcon, CustomersIcon } from '@/@core/icons/custom-nav-icons/icons';
import { OrderFormValues } from '.';

export interface OverrideMiniTableColumnType<>extends Omit<
        MiniTableColumnType<OrderFormValues>,
        'renderCell'
    > {
    renderCell: (row: OrderFormValues, rowIndex: number) => React.ReactNode;
}

const ErrorText = styled('span')(({ theme }) => ({
    color     : theme.palette.semantic.text.error,
    fontWeight: 500,
    fontSize  : '12px'
}));

const ErrorAction = styled('span')(({ theme }) => ({
    color         : theme.palette.semantic.text.error,
    fontWeight    : 600,
    fontSize      : '12px',
    textDecoration: 'underline',
    cursor        : 'pointer',
    marginLeft    : '5px'
}));

function AttentionCell({ row }: { row: OrderFormValues }) {
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const factoringCompaniesMap = useFactoringCompaniesMap();
    const editBroker = useEditBrokerDialog();
    const editCustomer = useEditCustomerDialog();

    const handleEditBroker = () => {
        editBroker.open({ brokerId: row.brokerId });
    };

    const handleEditCustomer = () => {
        editCustomer.open({ customerId: row.customerId });
    };

    if (row.factoringCompanyId) {
        return (
            <ErrorText>
                Attention: Need to send {factoringCompaniesMap[row.factoringCompanyId].name}
            </ErrorText>
        );
    }
    if (!row.customerId && row.brokerId) {
        return (
            <Stack
                direction="row"
                alignItems="center"
            >
                <ErrorText>
                    Attention: {brokersMap[row.brokerId].name} does't have email.{' '}
                </ErrorText>
                <ErrorAction onClick={handleEditBroker}>Click to edit</ErrorAction>
            </Stack>
        );
    }

    if (!row.brokerId && row.customerId) {
        return (
            <Stack
                direction="row"
                alignItems="center"
            >
                <ErrorText>
                    Attention: {customersMap[row.customerId].name} does't have email
                </ErrorText>
                <ErrorAction onClick={handleEditCustomer}>Click to edit</ErrorAction>
            </Stack>
        );
    }
}

function Recipient({ row }: { row: OrderFormValues }) {
    const customersMap = useCustomersMap();
    const brokersMap = useBrokersMap();

    if (row.brokerId) {
        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <BrokersIcon />
                {brokersMap[row.brokerId]?.name || 'N/A'}
            </Stack>
        );
    }

    if (row.customerId) {
        return (
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <CustomersIcon />
                {customersMap[row.customerId]?.name || 'N/A'}
            </Stack>
        );
    }

    return '-';
}

const columns: OverrideMiniTableColumnType[] = [
    {
        field     : 'settlementId',
        headerName: 'ID',
        minWidth  : 40,
        flex_start: true,
        renderCell: ({ friendlyId }) => friendlyId
    },
    {
        field     : 'recipient',
        headerName: 'Recipient',
        minWidth  : 40,
        flex_start: true,
        renderCell: (row) => <Recipient row={row} />
    },
    {
        field     : 'email',
        headerName: 'Email',
        minWidth  : 40,
        flex_start: true,
        renderCell: (row) => {
            if (row.email) {
                return row.email;
            }
            return <AttentionCell row={row} />;
        }
    },
    {
        field     : 'invoiceStatus',
        headerName: 'Invoice Status',
        minWidth  : 40,
        flex_start: true,
        renderCell: ({
            invoiceStatus,
            orderId
        }) => (
            <LoadInvoiceStatusChipSelect
                invoice_status={LOAD_INVOICE_STATUS_GRPC_ENUM[invoiceStatus]}
                load_id={orderId}
                is_changing={false}
            />
        )
    }
];

export default columns;
