import { useAddCustomerDialog } from '@/views/dispatch/customers/dialogs/AddCustomer/AddCustomer';
import AddIcon from '@mui/icons-material/Add';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import { default_customers_filters, useMainCustomers } from '@/store/dispatch/customers/hooks';
import React from 'react';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { CustomersIcon } from '@/@core/icons/custom-nav-icons/icons';
import Views from './Views';
import Search from './Search';

export default function CustomersHeader() {
    const {
        filter_id,
        isLoading,
        filters,
        selected_filters
    } = useMainCustomers(false);
    const addCustomerDialog = useAddCustomerDialog();

    const handleClickCreate = () => addCustomerDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<CustomersIcon />}
                        title="pages:customers"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import category_id="customers" />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="CUSTOMERS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        onClick={handleClickCreate}
                        title="customers:header.buttons.add_customer"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={
                !isLoading ? (
                    <>
                        <PageHeadersKit.DateRange
                            labelStart="customers:header.filters.labels.created_start"
                            labelEnd="customers:header.filters.labels.created_end"
                            field="customer_created_at"
                            date={selected_filters.customer_created_at}
                            filterId={filter_id}
                        />
                        <PageHeadersKit.Divider />
                        <SwitchFilter
                            label="customers:header.buttons.unpaid_loads"
                            filterType="unpaid_loads"
                            filterId={filter_id}
                            selectedFilters={selected_filters}
                            isLocalFilter
                        />
                    </>
                ) : (
                    <div />
                )
            }
            bottomRight={(
                <>
                    <SwitchFilter
                        label="common:button.unassigned"
                        filterType="unassigned"
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        isLocalFilter
                    />
                    <PageHeadersKit.Buttons.ClearFilter
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        default_filters={default_customers_filters}
                    />
                </>
            )}
        />
    );
}
