/* eslint-disable max-len */

import BillingLoadPanelComponents from '@/views/billing/BillingLoadPanel/BillingLoadPanelComponents';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { Stack } from '@mui/material';
import QuickbooksTable from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/table/QuickbooksTable';
import React, { useMemo } from 'react';
import QuickbooksControllers from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/QuickbooksControllers';
import QuickbooksNotConfigure from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/QuickbooksNotConfigure';
import {
    useBrokersMap,
    useCustomersMap,
    useLoadInvoiceCategoriesMap
} from '@/store/hash_maps/hooks';
import { useStableArray } from '@/hooks/useStable';
import QuickbooksCopyLinks from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/QuickbooksCopyLinks';
import { useInvoiceQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Invoicing/hook';
import {
    ERROR_CODES,
    generateError
} from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/config';
import createMap from '@/utils/create-map';
import { IntegrationProvider } from '@proto/integrations';
import withIntegrationProvider from '@/views/settings/tabs/Integrations/components/withIntegrationProvider';
import ProviderLogo from '@/views/settings/tabs/Integrations/components/ProviderLogo';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadInvoiceItemsGrpcService from '@/@grpcServices/services/loads-service/load-invoice-items.service';

const QuickbooksInvoices = withIntegrationProvider(QuickbooksComponent, 'QUICKBOOKS');

type Props = {
    load_id: string;
    broker_id: string;
    customer_id: string;
    provider: IntegrationProvider;
};

function QuickbooksComponent({
    load_id,
    broker_id,
    customer_id,
    provider
}: Props) {
    const invoiceCategoriesMap = useLoadInvoiceCategoriesMap();
    const { invoiceItems } = LoadInvoiceItemsGrpcService.useGetInvoiceItemsForLoadQuery(
        {
            loadId: load_id
        },
        {
            selectFromResult: (result) => ({
                ...result,
                invoiceItems:
                    result.data?.invoiceItems.map((item): LoadsTypes.InvoiceItem => {
                        const category = invoiceCategoriesMap[item.categoryId];
                        return {
                            ...item,
                            categoryName        : category?.name || '',
                            includeInGrossAmount: category?.includeInGrossAmount || false
                        };
                    }) || []
            })
        }
    );

    const { data: invoiceQuickbooks } =
        IntegrationQuickbooksGrpcService.useGetInvoiceQuickbooksQuery({ loadIds: [load_id] });

    const quickbooksInvoiceItems = invoiceQuickbooks?.invoices;

    const { data: customers_quickbooks_data } =
        IntegrationQuickbooksGrpcService.useGetCustomersQuickbooksQuery({});

    const customers_quickbooks = useStableArray(customers_quickbooks_data?.customers);
    const loadInvoiceItemCategoriesQB = useInvoiceQBItems();

    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const broker = brokersMap[broker_id];
    const customer = customersMap[customer_id];

    const validation = useMemo(() => {
        if (broker_id) {
            const brokerConnected = customers_quickbooks.some((customer) =>
                customer.systemBrokerId.includes(broker_id));
            if (!brokerConnected) return generateError('BROKER_NOT_CONNECTED');
            if (broker && !broker.billingEmail) return generateError('BROKER_WITHOUT_BILLING_EMAIL');
        } else {
            const customerConnected = customers_quickbooks.some((customer) =>
                customer.systemCustomerId.includes(customer_id));

            if (!customer_id) return generateError('CLIENT_NOT_CONNECTED');
            if (customer && !customer.billingEmail) return generateError('CUSTOMER_WITHOUT_BILLING_EMAIL');
            if (!customerConnected) return generateError('CUSTOMER_NOT_CONNECTED');
        }

        if (!invoiceItems.length) return generateError('LOAD_WITHOUT_INVOICE');

        const loadInvoiceItemCategoriesQBMap = createMap(
            loadInvoiceItemCategoriesQB.data,
            'invoiceItemCategoryId'
        );

        const invoiceCategoryNotConnectId = invoiceItems.find(
            (item) => !loadInvoiceItemCategoriesQBMap[item.categoryId]?.quickbooks_id
        )?.categoryId;

        if (
            invoiceCategoryNotConnectId &&
            !(invoiceCategoryNotConnectId in loadInvoiceItemCategoriesQBMap)
        ) {
            return generateError('INVOICE_ITEM_CATEGORY_DELETED');
        }

        const invoiceCategoryNotConnect =
            loadInvoiceItemCategoriesQBMap[invoiceCategoryNotConnectId || ''];

        if (invoiceCategoryNotConnect) {
            return generateError(
                'INVOICE_ITEM_CATEGORY_NOT_CONNECTED',
                invoiceCategoryNotConnect.invoiceItemCategoryId
            );
        }

        return generateError('VALID');
    }, [
        customer_id,
        broker_id,
        invoiceItems,
        loadInvoiceItemCategoriesQB.data,
        customers_quickbooks,
        broker,
        customer
    ]);

    return (
        <BillingLoadPanelComponents.Card.Container style={{ borderRadius: 0 }}>
            <BillingLoadPanelComponents.Card.Row>
                <Stack
                    flexDirection="row"
                    alignItems="center"
                >
                    <ProviderLogo
                        srcDarkMode={provider.lightLogoUrl}
                        srcLightMode={provider.darkLogoUrl}
                        height="24px"
                    />
                    <QuickbooksCopyLinks invoices={quickbooksInvoiceItems} />
                </Stack>
                <QuickbooksControllers
                    load_id={load_id}
                    disabled={validation.errorCode !== ERROR_CODES.VALID}
                    quickbooksInvoiceItems={quickbooksInvoiceItems}
                />
            </BillingLoadPanelComponents.Card.Row>
            {validation.errorCode === ERROR_CODES.VALID ? (
                <QuickbooksTable quickbooksInvoiceItems={quickbooksInvoiceItems} />
            ) : (
                <QuickbooksNotConfigure
                    errorCode={validation.errorCode}
                    itemId={validation.itemId}
                    loadId={load_id}
                    brokerId={broker_id}
                    customerId={customer_id}
                />
            )}
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(QuickbooksInvoices);
