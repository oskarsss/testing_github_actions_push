import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { VendorTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';

export const useVendorsQBItems = () => {
    const stableArray = useStableArray();
    const {
        data: vendors_quickbooks,
        isLoading: loading_vendors_quickbooks
    } =
        IntegrationQuickbooksGrpcService.useGetVendorsQuickbooksQuery({});

    const {
        data: vendors_system,
        isLoading
    } = VendorsGrpcService.endpoints.getVendors.useQuery(
        {}
    );

    const data: VendorTabData[] = useMemo(() => {
        if (!vendors_system) {
            return stableArray as VendorTabData[];
        }
        const customerQBMap = createMapQuickbooks(vendors_quickbooks?.vendors, 'systemVendorId');

        return vendors_system.vendors.map((vendor) => ({
            ...vendor,
            quickbooks_id          : customerQBMap[vendor.vendorId]?.quickbooksVendorId || '',
            quickbooks_company_name: customerQBMap[vendor.vendorId]?.companyName || '',
            quickbooks_name        : customerQBMap[vendor.vendorId]?.displayName || ''
        }));
    }, [vendors_quickbooks, vendors_system]);

    return {
        data,
        loading: isLoading || loading_vendors_quickbooks
    };
};
