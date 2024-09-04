import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import IntegrationApexCapitalGrpcService from '@/@grpcServices/services/integrations-apexcapital.service';
import { IP_ApexCapital_GetEquipmentsReply_Equipment } from '@proto/integration_provider_apexcapital';
import { EquipmentTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';
import { useActiveEquipmentTypes } from '@/store/equipments/hooks';

export const useEquipmentsTypesApexCapital = () => {
    const stableArray = useStableArray();
    const {
        data: apex_capital_equipments_data,
        isLoading: loading_quickbooks_items
    } =
        IntegrationApexCapitalGrpcService.useGetApexCapitalEquipmentsQuery({});

    const {
        equipment_types,
        isLoading
    } = useActiveEquipmentTypes();

    const apex_capital_equipments = useStableArray(apex_capital_equipments_data?.equipments);

    const data: EquipmentTabData[] = useMemo(() => {
        const apexCapitalEquipmentsMap = apex_capital_equipments.reduce((acc, item) => {
            item.systemEquipmentTypeId.forEach((id) => {
                acc[id] = item;
            });
            return acc;
        }, {} as Record<string, IP_ApexCapital_GetEquipmentsReply_Equipment>);

        return equipment_types.map((equipment) => ({
            ...equipment,
            apex_capital_id:
                apexCapitalEquipmentsMap[equipment.equipmentTypeId]?.apexEquipmentId || '',
            apex_capital_name: apexCapitalEquipmentsMap[equipment.equipmentTypeId]?.name || ''
        }));
    }, [apex_capital_equipments, equipment_types]);

    return {
        data   : data || stableArray,
        loading: isLoading || loading_quickbooks_items
    };
};
