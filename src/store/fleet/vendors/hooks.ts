import {
    SwitchFilterFn,
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { useStableArray } from '@/hooks/useStable';
import { $Filter } from '@/@core/components/filters/utils';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useMemo } from 'react';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { VendorModel_Type, VendorModel_Vendor } from '@proto/models/model_vendor';
import VendorsTypes from '@/store/fleet/vendors/types';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';

const page = 'vendors';
export const default_vendors_filters = PAGES_FILTERS_CONFIG.FLEET.VENDORS.defaultFilters;

const filtersOrder = $Filter.order(default_vendors_filters)('vendor_type');

const CONVERT_VENDOR_FILTERS_TYPE: Record<VendorModel_Type, VendorsTypes.VendorType> = {
    [VendorModel_Type.COMPANY]    : 'company',
    [VendorModel_Type.INDIVIDUAL] : 'individual',
    [VendorModel_Type.UNSPECIFIED]: ''
};

type DefaultFiltersType = typeof default_vendors_filters;

const switchFilter: SwitchFilterFn<VendorsTypes.VendorRow, DefaultFiltersType> = (
    rows,
    selectedFilters
) => {
    if (selectedFilters[FILTER_SWITCH_KEY].hasNoTaxId) {
        return rows.filter((row) => !row.taxId);
    }
    return rows;
};

const useMemoize = (vendors?: VendorModel_Vendor[]) => {
    const {
        views,
        headers,
        updateColumnWidth
    } = useTablePageData('VENDORS');
    const vendorsArr = useStableArray(vendors);

    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_vendors_filters);

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_vendors_filters,
        views
    });

    const vendorsList: VendorsTypes.VendorRow[] = useMemo(
        () =>
            vendorsArr
                .filter((vendor) => !vendor.deleted)
                .map((vendor) => ({
                    ...vendor,
                    friendly_name       : vendor.friendlyName,
                    contact_phone_number: vendor.contactPhoneNumber,
                    contact_email       : vendor.contactEmail,
                    contact_name        : vendor.contactName,
                    tax_id              : vendor.taxId,
                    type                : CONVERT_VENDOR_FILTERS_TYPE[vendor.type],
                    unique_key          : vendor.vendorId,
                    entityId            : vendor.vendorId,
                    entities            : {
                        vendor: vendor.vendorId
                    }
                })),
        [vendorsArr]
    );

    const dataFilters = $Filter.getFiltersData([PhpFilterTypeMap.VENDOR_TYPE], ['type']);
    const counts = $Filter.calculateCounts(vendorsList, dataFilters);

    const rowsData = useFilteredRows(vendorsList, selected_filters, switchFilter);
    const filters = useAppliedFilters(filtersOrder, counts);

    return {
        views,
        headers,
        ...rowsData,
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id: selectedViewId,
        selectView,
        defaultViewId,
        updateColumnWidth
    };
};

export function useMainVendors(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = VendorsGrpcService.useGetVendorsQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useMemoize(data?.vendors);

    return { ...memoizedData, isError, isLoading };
}

export function useVendors() {
    const {
        data,
        isError,
        isLoading
    } = VendorsGrpcService.useGetVendorsQuery({});

    const memoizedData = useMemoize(data?.vendors);

    return { ...memoizedData, isError, isLoading };
}

export function useAllVendors() {
    const {
        data,
        isError,
        isLoading
    } = VendorsGrpcService.endpoints.getVendors.useQueryState({});

    const vendors = useStableArray(data?.vendors);

    return { vendors, isError, isLoading };
}

export function useActiveVendors() {
    const {
        data,
        isError,
        isLoading
    } = VendorsGrpcService.endpoints.getVendors.useQueryState({});

    const vendors = useMemo(() => {
        if (!data?.vendors) return [];
        return data.vendors.filter((vendor) => !vendor.deleted);
    }, [data?.vendors]);

    return { vendors, isError, isLoading };
}
