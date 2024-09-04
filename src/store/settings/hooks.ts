import { useMemo } from 'react';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';

export const useSettings = () => {
    const {
        data,
        isLoading,
        isError
    } = SettingsGrpcService.useGetSettingsQuery({});

    const memoizedData = useMemo(
        () => ({
            companySections    : data?.company,
            settlementsSections: data?.settlements,
            securitySections   : data?.security,

            // invoicingSections  : data?.invoicing,
            ordersSections: data?.orders,
            driverPpp     : data?.driverApp
        }),
        [data]
    );

    return {
        ...memoizedData,
        isLoading,
        isError
    };
};
