import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import App from '@/store/app/types';
import AccountGrpcService from '@/@grpcServices/services/account.service';

export const useAccountCompanies = () => {
    const company_id = useAppSelector((state) => state.app.company_id);

    const {
        data,
        isSuccess,
        isError,
        isLoading,
        refetch
    } = AccountGrpcService.useGetAccountQuery(
        {}
    );

    const {
        companies,
        company,
        timezone
    } = useMemo(() => {
        if (data?.companies && data.companies.length) {
            const company =
                data.companies.find((c) => c.companyId === company_id) || data.companies[0];

            return {
                companies: data.companies,
                company,
                timezone : company.timezone
            };
        }

        return {
            companies: [] as App.Company[],
            company  : undefined,
            timezone : 'America/New_York'
        };
    }, [data?.companies, company_id]);

    return {
        isLoading,
        isSuccess,
        isError,
        company,
        companies,
        timezone,
        refetch
    };
};

export function useAccount() {
    const {
        data,
        error
    } = AccountGrpcService.endpoints.getAccount.useQueryState({});

    const {
        user,
        chatpilot
    } = useMemo(
        () => ({
            user     : data ? data.user : null,
            chatpilot: data ? data.chatpilot : null
        }),
        [data]
    );

    return {
        error,
        user,
        chatpilot
    };
}

export const usePermissions = () => {
    const { company } = useAccountCompanies();

    const permissions = company?.permissions || null;
    const hasPermission = (permission_name: string) => {
        if (!permissions) return true;
        return permissions[permission_name] || false;
    };

    return { permissions, hasPermission };
};

interface Props {
    permission_name: App.PermissionName;
}

const withPermissions = <P extends object>(
    Component: React.ComponentType<P>,
    permission_name: string
): React.FC<P & Props> => {
    const WrappedComponent: React.FC<P & Props> = (props: P & Props) => {
        const { hasPermission } = usePermissions();
        const router = useRouter();
        const has_permission = hasPermission(permission_name);
        if (!has_permission) {
            router.replace('/404');
            return null;
        }

        return (
            <Component
                {...(props as P)}
                permission_name={permission_name}
            />
        );
    };

    WrappedComponent.displayName = `withPermissions(${Component.displayName || Component.name})`;

    return WrappedComponent;
};

export default withPermissions;
