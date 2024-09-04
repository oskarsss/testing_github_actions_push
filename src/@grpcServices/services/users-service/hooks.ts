import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { useMemo, useRef } from 'react';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import { GetUsersReply, GetUsersReply_User } from '@proto/users';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';

const page = 'users';
export const default_users_filters = PAGES_FILTERS_CONFIG.SETTINGS.MEMBERS.defaultFilters;

export type FormattedRow = GetUsersReply_User & { fullName: string };

const useMemoize = (data: GetUsersReply | undefined) => {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_users_filters);

    const formattedRows: FormattedRow[] | undefined = useMemo(
        () =>
            data?.users.map((row) => ({
                ...row,
                fullName: `${row.firstName} ${row.lastName}`
            })),
        [data]
    );

    const rowsData = useFilteredRows(formattedRows, selected_filters);
    const filters = useAppliedFilters();

    return {
        ...rowsData,
        filters,
        selected_filters,
        filter_id
    };
};

export const useMainUsers = () => {
    const {
        data,
        isLoading,
        isError
    } = UsersGrpcService.endpoints.getUsers.useQuery({});

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading };
};

export function useAllUsers() {
    const stableArray = useRef([]).current;
    const { data } = UsersGrpcService.endpoints.getUsers.useQuery({});

    const users = useMemo(() => (data ? data.users : stableArray), [data]);

    return { users };
}
