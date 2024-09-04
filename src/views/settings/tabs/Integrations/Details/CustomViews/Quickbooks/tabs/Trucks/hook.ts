import { useStableArray } from '@/hooks/useStable';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { TruckTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { useMemo } from 'react';
import { createMapQuickbooks } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/utils';
import { useActiveTrucks } from '@/store/fleet/trucks/hooks';

export const useTrucksQBItems = () => {
    const {
        data: classesQB,
        isLoading: loadingClassesQuickbooks
    } =
        IntegrationQuickbooksGrpcService.useGetClassesQuickbooksQuery({});

    const classesQuickbooks = useStableArray(classesQB?.classes);

    const {
        trucks,
        isLoading
    } = useActiveTrucks();

    const data: TruckTabData[] = useMemo(() => {
        const classesQBMap = createMapQuickbooks(classesQuickbooks, 'systemTruckIds');

        return trucks.map((truck) => ({
            ...truck,
            quickbooksId      : classesQBMap[truck.truckId]?.quickbooksClassId || '',
            fullyQualifiedName: classesQBMap[truck.truckId]?.fullyQualifiedName || '',
            quickbooksName    : classesQBMap[truck.truckId]?.name || ''
        }));
    }, [classesQuickbooks, trucks]);

    return {
        data,
        loading: isLoading || loadingClassesQuickbooks
    };
};
