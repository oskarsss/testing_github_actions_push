import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { BrokerTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import { useActiveBrokers } from '@/store/dispatch/brokers/hooks';

export const useBrokersQBItems = () => {
    const {
        data: customers_quickbooks,
        isLoading: loading_customers_quickbooks
    } =
        IntegrationQuickbooksGrpcService.useGetCustomersQuickbooksQuery({});

    const {
        brokers,
        isLoading
    } = useActiveBrokers();

    const data: BrokerTabData[] = useMemo(() => {
        const customerQBMap = createMapQuickbooks(
            customers_quickbooks?.customers,
            'systemBrokerId'
        );

        return brokers.map((broker) => ({
            ...broker,
            quickbooks_id          : customerQBMap[broker.brokerId]?.quickbooksCustomerId || '',
            quickbooks_company_name: customerQBMap[broker.brokerId]?.companyName || '',
            quickbooks_name        : customerQBMap[broker.brokerId]?.displayName || ''
        }));
    }, [customers_quickbooks, brokers]);

    return {
        data,
        loading: isLoading || loading_customers_quickbooks
    };
};
