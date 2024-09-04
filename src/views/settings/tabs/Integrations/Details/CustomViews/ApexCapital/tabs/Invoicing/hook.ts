import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import IntegrationApexCapitalGrpcService from '@/@grpcServices/services/integrations-apexcapital.service';
import { IP_ApexCapital_GetLineItemsReply_LineItem } from '@proto/integration_provider_apexcapital';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import { useActiveInvoiceItemCategories } from '@/store/dispatch/loads/hooks';

export const useInvoiceApexCapitalItems = () => {
    const stableArray = useStableArray();
    const {
        data: apex_capital_items,
        isLoading: loading_quickbooks_items
    } =
        IntegrationApexCapitalGrpcService.useGetApexCapitalLineItemsQuery({});

    const invoice_item_categories = useActiveInvoiceItemCategories();

    const data: InvoiceTabData[] = useMemo(() => {
        if (!invoice_item_categories || !apex_capital_items) {
            return stableArray as InvoiceTabData[];
        }

        const apexCapitalItemsMap = apex_capital_items.lineItems.reduce((acc, item) => {
            item.systemLoadInvoiceItemCategoryIds.forEach((id) => {
                acc[id] = item;
            });
            return acc;
        }, {} as Record<string, IP_ApexCapital_GetLineItemsReply_LineItem>);

        return invoice_item_categories.map((category) => ({
            ...category,
            apex_capital_id:
                apexCapitalItemsMap[category.invoiceItemCategoryId]?.apexLineItemId || '',
            apex_capital_name: apexCapitalItemsMap[category.invoiceItemCategoryId]?.name || ''
        }));
    }, [apex_capital_items, invoice_item_categories]);

    return {
        data   : data || stableArray,
        loading: loading_quickbooks_items
    };
};
