import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';

export function useAllMainRoles(refetchOnMountOrArgChange = false) {
    const {
        data,
        ...rest
    } = RolesGrpcService.useGetRolesQuery({}, { refetchOnMountOrArgChange });

    const roles = useStableArray(data?.roles);

    return { roles, ...rest };
}

export function useActiveMainRoles(refetchOnMountOrArgChange = false) {
    const {
        data,
        isError,
        isLoading
    } = RolesGrpcService.useGetRolesQuery(
        {},
        { refetchOnMountOrArgChange }
    );

    const roles = useMemo(() => {
        if (!data?.roles) return [];
        return data.roles.filter((role) => !role.deleted);
    }, [data?.roles]);

    return { roles, isError, isLoading };
}
