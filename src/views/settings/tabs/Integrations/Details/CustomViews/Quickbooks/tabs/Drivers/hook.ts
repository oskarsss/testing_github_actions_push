import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { DriverTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import { DriverModel_Status } from '@proto/models/model_driver';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';

export const useDriversQBItems = () => {
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const {
        data: vendors_quickbooks,
        isLoading: loading_vendors_quickbooks
    } =
        IntegrationQuickbooksGrpcService.useGetVendorsQuickbooksQuery({});

    const drivers = useAppSelector(DriversDataSelectors.getRows);

    const data: DriverTabData[] = useMemo(() => {
        const customerQBMap = createMapQuickbooks(vendors_quickbooks?.vendors, 'systemDriverId');

        return drivers
            .filter((row) => row.status !== DriverModel_Status.DELETED)
            .map((driver) => ({
                ...driver,
                quickbooks_id          : customerQBMap[driver.driverId]?.quickbooksVendorId || '',
                quickbooks_company_name: customerQBMap[driver.driverId]?.companyName || '',
                quickbooks_name        : customerQBMap[driver.driverId]?.displayName || ''
            }));
    }, [vendors_quickbooks, drivers]);

    return {
        data,
        loading: isLoading || loading_vendors_quickbooks
    };
};
