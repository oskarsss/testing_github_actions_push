import { useAllVendors } from '@/store/fleet/vendors/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { $Filter } from '../utils';

export const VENDOR_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { vendors } = useAllVendors();

    const filterItems = useMemo(
        () =>
            vendors.map(({
                name,
                vendorId: value
            }) => ({
                label      : name,
                searchValue: name,
                value,
                count      : counts?.[value]
            })),
        [counts, vendors]
    );

    return { filterItems, label: 'entity:vendor' as const };
});

const vendorTypesOrder: ('individual' | 'company')[] = ['company', 'individual'];

export const VENDOR_TYPE_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { t } = useAppTranslation();

    const filterItems = useMemo(
        () =>
            vendorTypesOrder.map((value) => ({
                label      : t(`state_info:vendors.type.${value}`),
                searchValue: t(`state_info:vendors.type.${value}`),
                value,
                count      : counts?.[value]
            })),
        [counts, t]
    );

    return { filterItems, label: 'common:type' as const };
});
