import { default_customers_filters, useMainCustomers } from '@/store/dispatch/customers/hooks';
import { MouseEvent, useCallback } from 'react';
import Customers from '@/store/dispatch/customers/types';
import { useCustomerOptionsMenu } from '@/views/dispatch/customers/menus/CustomerOptionsMenu';
import TableTypes from '@/@core/components/table/types';
import Table from '@/@core/components/table/Table';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import openNewWindow from '@/utils/open-new-window';
import navigateToPage from '@/utils/navigateToPage';
import columns from './columns';
import { useEditCustomerDialog } from '../../dialogs/EditCustomer/EditCustomer';
import { useAddCustomerDialog } from '../../dialogs/AddCustomer/AddCustomer';

type TablePropsType = TableTypes.TableProps<Customers.CustomerRow, true>;
type ExecuteActionProps = {
    row: Customers.CustomerRow;
    event: MouseEvent<HTMLElement>;
    document_type_id?: string;
    document_entity_type?: string;
};

export default function CustomerTable() {
    const customerOptionsMenu = useCustomerOptionsMenu();
    const createCustomerDialog = useAddCustomerDialog();

    const handleCreateCustomer = useCallback(() => {
        createCustomerDialog.open({});
    }, [createCustomerDialog]);

    const {
        rows,
        headers,
        view,
        isLoading,
        rows_total,
        selected_filters,
        filter_id,
        updateColumnWidth
    } = useMainCustomers();

    const editCustomersDialog = useEditCustomerDialog();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_filters;

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, props: ExecuteActionProps) => {
            switch (name) {
            case 'document':
                editCustomersDialog.open({
                    customerId : props.row.customerId,
                    document_id: props.document_type_id
                });
                break;
            case 'edit':
                switch (props.event.button) {
                case props.event.ctrlKey && 0:
                case props.event.metaKey && 0:
                    openNewWindow(`/dispatch/customers/${props.row.customerId}`, true);
                    break;
                case 0:
                    navigateToPage(
                        `/dispatch/customers/${props.row.customerId}`,
                        props.event
                    );
                    break;
                case 2:
                    customerOptionsMenu.open({
                        id  : props.row.customerId,
                        name: props.row.name
                    })(props.event);
                    break;
                default:
                    break;
                }
                break;
            default:
                break;
            }
        },
        []
    );

    const updateFilters = useUpdateSearchFilters(default_customers_filters);

    return (
        <Table<Customers.CustomerRow, true>
            pageType="CUSTOMERS"
            filter_id={filter_id}
            onCreateItem={handleCreateCustomer}
            defaultFilters={PAGES_FILTERS_CONFIG.DISPATCH.CUSTOMERS.defaultFilters}
            tableName="customers"
            rows={rows}
            columns={columns}
            headers={headers}
            view={view}
            isLoading={isLoading}
            order={order}
            orderBy={orderBy}
            updateFilters={updateFilters}
            page={page}
            per_page={per_page}
            rows_total={rows_total}
            executeAction={executeAction}
            pagination
            onUpdateWidth={updateColumnWidth}
        />
    );
}
