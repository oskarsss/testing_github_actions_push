import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import PlatesGrpcService from '@/@grpcServices/services/plates.service';
import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import ServiceLogItemTypeGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item-type.service';
import { useAppSelector } from '../hooks';
import { RootState } from '../types';

const hooksGenerator =
    <API, Key extends keyof API, StoreKey extends keyof RootState['hash_maps']>(
        api: API,
        key: Key,
        storeKey: StoreKey
    ) =>
    <Id>(
            id?: Id
        ): Id extends string
        ? RootState['hash_maps'][StoreKey][Id] | undefined
        : RootState['hash_maps'][StoreKey] => {
        if (!key.toString().includes('use') && !key.toString().includes('Query')) {
            throw new Error(`Invalid key: ${key.toString()}`);
        }

        // @ts-ignore
        api[key](null);
        const map = useAppSelector((state) =>
            typeof id === 'string' ? state.hash_maps[storeKey][id] : state.hash_maps[storeKey]);
        return map as Id extends string
            ? RootState['hash_maps'][StoreKey][Id] | undefined
            : RootState['hash_maps'][StoreKey];
    };

export const useDocumentTypesMap = hooksGenerator(
    DocumentTypesGrpcServices,
    'useGetDocumentTypesQuery',
    'documentTypesMap'
);

// export const useDriversMap = hooksGenerator(DriversGrpcService, 'useGetDriversQuery', 'drivers');

export const useCustomersMap = hooksGenerator(
    CustomersGrpcService,
    'useGetCustomersQuery',
    'customers'
);

// export const useTrucksMap = hooksGenerator(TrucksGrpcService, 'useGetTrucksQuery', 'trucks');

export const useBrokersMap = hooksGenerator(BrokersGrpcService, 'useGetBrokersQuery', 'brokers');

export const useVendorsMap = hooksGenerator(VendorsGrpcService, 'useGetVendorsQuery', 'vendors');

export const usePlatesMap = hooksGenerator(PlatesGrpcService, 'useGetPlatesQuery', 'plates');

export const useTrailersTypesMap = hooksGenerator(
    TrailerTypesGrpcService,
    'useGetTrailerTypesQuery',
    'trailersTypes'
);

export const useDriverPayCategoriesMap = hooksGenerator(
    LoadDriverPayItemCategoriesGrpcService,
    'useGetDriverPayItemCategoriesQuery',
    'driver_pay_categories'
);
export const useLoadInvoiceCategoriesMap = hooksGenerator(
    LoadInvoiceItemCategoriesGrpcService,
    'useGetInvoiceItemCategoriesQuery',
    'load_invoice_categories'
);

export const useDraftsMap = hooksGenerator(LoadDraftsGrpcService, 'useGetDraftsQuery', 'drafts');

export const useUsersMap = hooksGenerator(UsersGrpcService, 'useGetUsersQuery', 'users');

export const useFactoringCompaniesMap = hooksGenerator(
    FactoringCompaniesGrpcService,
    'useGetFactoringCompaniesQuery',
    'factoringCompanies'
);

export const useDriverTypesMap = hooksGenerator(
    DriverTypesGrpcService,
    'useGetDriverTypesQuery',
    'driverTypes'
);

export const useActiveCyclesMap = hooksGenerator(
    SettlementCyclesGrpcService,
    'useGetCyclesQuery',
    'cycles'
);

export const useRevenueTypesMap = hooksGenerator(
    RevenueTypesGrpcService,
    'useGetRevenueTypesQuery',
    'revenue_types'
);

export const useTrailerCompaniesMap = hooksGenerator(
    TrailerCompaniesGrpcService,
    'useGetTrailerCompaniesQuery',
    'trailerCompanies'
);

export const useSettlementTransactionCategoriesMap = hooksGenerator(
    SettlementTransactionCategoriesGrpcService,
    'useGetCategoriesQuery',
    'settlementTransactionCategories'
);

export const useRolesMap = hooksGenerator(RolesGrpcService, 'useGetRolesQuery', 'rolesMap');

export const useServiceProvidersMap = hooksGenerator(
    ServiceProvidersGrpcService,
    'useGetServiceProvidersQuery',
    'serviceProviders'
);

export const useServiceLogsMap = hooksGenerator(
    ServiceLogsGrpcService,
    'useGetServiceLogsQuery',
    'serviceLogs'
);

export const useServiceLogItemTypesMap = hooksGenerator(
    ServiceLogItemTypeGrpcService,
    'useGetServiceLogItemTypesQuery',
    'serviceLogItemTypes'
);
