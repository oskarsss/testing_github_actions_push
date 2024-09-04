import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { useActiveInvoiceItemCategories } from '@/store/dispatch/loads/hooks';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';

export const useInvoiceQBItems = () => {
    const stableArray = useStableArray();
    const {
        data: quickbooks_items,
        isLoading: loading_quickbooks_items
    } =
        IntegrationQuickbooksGrpcService.useGetIntegrationQuickbooksItemsQuery({});

    const invoice_item_categories = useActiveInvoiceItemCategories();

    const data: InvoiceTabData[] = useMemo(() => {
        if (!invoice_item_categories) {
            return stableArray as InvoiceTabData[];
        }
        const quickbooksItemsMap = createMapQuickbooks(
            quickbooks_items?.items,
            'systemLoadInvoiceItemCategoryIds'
        );

        return invoice_item_categories.map((category) => ({
            ...category,
            quickbooks_id:
                quickbooksItemsMap[category.invoiceItemCategoryId]?.quickbooksItemId || '',
            quickbooks_name: quickbooksItemsMap[category.invoiceItemCategoryId]?.name || '',
            quickbooks_desc: quickbooksItemsMap[category.invoiceItemCategoryId]?.description || ''
        }));
    }, [quickbooks_items, invoice_item_categories]);

    return {
        data   : data || stableArray,
        loading: loading_quickbooks_items
    };
};
