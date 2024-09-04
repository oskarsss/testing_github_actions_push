import { useMemo, useRef } from 'react';
import EquipmentTypeGrpcService from '@/@grpcServices/services/equipment-type.service';

export const useAllEquipmentTypes = () => {
    const stableArray = useRef([]);

    const {
        data,
        isError,
        isLoading
    } = EquipmentTypeGrpcService.useGetEquipmentTypesQuery({});

    const equipment_types = useMemo(() => {
        if (!data) return stableArray.current;
        return data.equipmentTypes;
    }, [data]);

    return { equipment_types, isError, isLoading };
};

export const useActiveEquipmentTypes = () => {
    const stableArray = useRef([]);

    const {
        data,
        isError,
        isLoading
    } = EquipmentTypeGrpcService.useGetEquipmentTypesQuery({});

    const equipment_types = useMemo(() => {
        if (!data) return stableArray.current;
        return data.equipmentTypes.filter((type) => !type.deleted);
    }, [data]);

    return { equipment_types, isError, isLoading };
};
