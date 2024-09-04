/* eslint-disable max-len */
import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { useMemo, useRef } from 'react';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useStableArray } from '@/hooks/useStable';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { CustomerGetReply } from '@proto/customers';
import Customers from '@/store/dispatch/customers/types';

export const default_customers_filters = PAGES_FILTERS_CONFIG.DISPATCH.CUSTOMERS.defaultFilters;

const page = 'customers';

const useMemoize = (data?: CustomerGetReply) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_customers_filters);

    const views_and_headers = useTablePageData('CUSTOMERS');

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_customers_filters,
        views         : views_and_headers.views
    });

    const customers = useStableArray(data?.customers);
    const filteredCustomers = useMemo(
        () => customers.filter((customer) => !customer.deleted),
        [customers]
    );

    const customersList: Customers.CustomerRow[] = useMemo(
        () =>
            filteredCustomers.map((customer) => ({
                ...customer,
                address_state: customer.addressState,
                contact_email: customer.contactEmail,
                contact_fax  : customer.contactFax,
                contact_name : customer.contactName,
                contact_phone: customer.contactPhone,
                created_at   : customer.createdAt,
                short_name   : customer.shortName,
                unique_key   : customer.customerId,
                entityId     : customer.customerId,
                entities     : {
                    customer: customer.customerId
                }
            })),
        [filteredCustomers]
    );

    const rowsData = useFilteredRows<Customers.CustomerRow>(customersList, selected_filters);

    const filters = useAppliedFilters([]);

    return {
        ...views_and_headers,
        ...rowsData,
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id: selectedViewId,
        selectView,
        defaultViewId
    };
};

export function useMainCustomers(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = CustomersGrpcService.useGetCustomersQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading };
}

export function useAllCustomers() {
    const stableArray = useRef([]).current;
    const {
        data,
        isError,
        isLoading
    } = CustomersGrpcService.useGetCustomersQuery({});

    const customers = useMemo(() => (data ? data.customers : stableArray), [data, stableArray]);

    return { customers, isError, isLoading };
}
