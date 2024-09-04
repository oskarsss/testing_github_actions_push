import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { CustomerTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';

export const useCustomersQBItems = () => {
    const stableArray = useStableArray();
    const {
        data: customers_quickbooks,
        isLoading: loading_quickbooks_items
    } =
        IntegrationQuickbooksGrpcService.useGetCustomersQuickbooksQuery({});

    const {
        data: customers_system,
        isLoading
    } =
        CustomersGrpcService.endpoints.getCustomers.useQuery({});

    const data: CustomerTabData[] = useMemo(() => {
        if (!customers_system) {
            return stableArray as CustomerTabData[];
        }
        const customerQBMap = createMapQuickbooks(
            customers_quickbooks?.customers,
            'systemCustomerId'
        );

        return customers_system.customers.map((customer) => ({
            ...customer,
            quickbooks_id          : customerQBMap[customer.customerId]?.quickbooksCustomerId || '',
            quickbooks_company_name: customerQBMap[customer.customerId]?.companyName || '',
            quickbooks_name        : customerQBMap[customer.customerId]?.displayName || ''
        }));
    }, [customers_quickbooks, customers_system]);

    return {
        data   : data || stableArray,
        loading: isLoading || loading_quickbooks_items
    };
};
