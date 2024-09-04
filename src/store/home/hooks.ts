import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useMemo } from 'react';
import { OnboardingGetChecklistReply } from '@proto/onboarding';

export const useGetOnBoardingSeries = () => {
    const { data } = OnboardingGrpcService.useGetOnboardingChecklistQuery({});

    return useMemo(() => {
        if (!data) {
            return {
                series    : [0],
                isFull    : false,
                isEmpty   : true,
                total     : 0,
                completed : 0,
                percentage: 0
            };
        }

        const keys: (keyof OnboardingGetChecklistReply)[] = [
            'companyProfileComplete',
            'factoringCompanyAdded',
            'settlementsPersonalized',
            'invoiceCustomized',
            'truckAdded',
            'trailerAdded',
            'driverAdded',
            'vendorAdded',
            'gpsEldProviderConnected',
            'fuelConnected',
            'tollTransponderConnected',
            'quickbooksConnected',
            'loadboardsBrokersConnected',
            'payrollCycleCreated',
            'revenueTypesConfigured',
            'debitCategoriesConfigured',
            'recurringTransactionsAdded',
            'itemsShownToDriverConfigured',
            'userRolesPermissionsReviewed',
            'documentTypesReviewed',
            'invoiceItemsReviewed'
        ];
        const total = keys.length;
        const completed = keys.filter((key) => data[key]).length;
        const percentage = Math.round((completed / total) * 100);
        return {
            series : [percentage],
            isFull : completed === total,
            isEmpty: completed === 0,
            total,
            completed,
            percentage
        };
    }, [data]);
};
