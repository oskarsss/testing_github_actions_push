/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import { GetUsersReply_User } from '@proto/users';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import LoadDriverPayItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-driver-pay-item-categories.service';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import createMap from '@/utils/create-map';
import DocumentTypesGrpcServices from '@/@grpcServices/services/app-sevices/documents-services/document-types.service';
import FactoringCompaniesGrpcService from '@/@grpcServices/services/factoring-companies/factoring-companies.service';
import { FactoringCompanyModel } from '@proto/models/model_factoring_company';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { RoleGetReply_Role } from '@proto/roles';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import { VendorModel_Vendor } from '@proto/models/model_vendor';

// import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { SettlementTransactionCategoryModel_Category } from '@proto/models/model_settlement.transaction_category';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import { SettlementCycleGetReply_SettlementCycle } from '@proto/settlement.cycle';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { CustomerModel_Customer } from '@proto/models/model_customer';
import { BrokerGetReply_Broker } from '@proto/brokers';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import { TrailerCompanyGetReply_TrailerCompany } from '@proto/trailer.company';
import PlatesGrpcService from '@/@grpcServices/services/plates.service';
import type { PlateModel } from '@proto/models/model_plate';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import ServiceLogItemTypeGrpcService from '@/@grpcServices/services/maitenance-service/service-log-item-type.service';
import { ServiceLogItemTypeModel_ServiceLogItemTypeRead } from '@proto/models/model_service_log_item_type';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { DriverModel_Driver } from '@proto/models/model_driver';
import DraftsTypes from '../drafts/types';
import Documents from '../documents/types';
import { api } from '../api';

const initialState = {
    // drivers    : {} as Record<string, DriverModel_Driver>,
    driverTypes: {} as Record<string, DriverTypeModel>,

    // trucks                 : {} as Record<string, TruckModel_Truck>,
    // trailers               : {} as Record<string, TrailerModel_Trailer>,
    users                  : {} as Record<string, GetUsersReply_User>,
    customers              : {} as Record<string, CustomerModel_Customer>,
    brokers                : {} as Record<string, BrokerGetReply_Broker>,
    vendors                : {} as Record<string, VendorModel_Vendor>,
    driver_pay_categories  : {} as Record<string, LoadsTypes.DriverPayItemCategory>,
    load_invoice_categories: {} as Record<string, LoadsTypes.InvoiceItemCategory>,
    drafts                 : {} as Record<string, DraftsTypes.Draft>,
    factoringCompanies     : {} as Record<string, FactoringCompanyModel>,
    cycles                 : {} as Record<string, SettlementCycleGetReply_SettlementCycle>,
    revenue_types          : {} as Record<string, SettlementsTypes.RevenueTypes.RevenueType>,
    trailersTypes          : {} as Record<string, TrailerTypesGetReply_TrailerType>,
    plates                 : {} as Record<string, PlateModel>,
    trailerCompanies       : {} as Record<string, TrailerCompanyGetReply_TrailerCompany>,
    documentTypesMap       : {} as Record<string, Documents.DocumentType>,
    rolesMap               : {} as Record<string, RoleGetReply_Role>,
    serviceProviders       : {} as Record<string, ServiceProviderModel_ServiceProvider>,
    serviceLogs            : {} as Record<string, ServiceLogModel_ServiceLogRead>,
    serviceLogItemTypes    : {} as Record<string, ServiceLogItemTypeModel_ServiceLogItemTypeRead>,

    settlementTransactionCategories: {} as Record<
        string,
        SettlementTransactionCategoryModel_Category
    >
};

const hash_maps_slice = createSlice({
    name         : 'hash_maps',
    initialState,
    reducers     : {},
    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));

        // builder.addMatcher(
        //     DriversGrpcService.endpoints.getDrivers.matchFulfilled,
        //     (state, action) => {
        //         state.drivers = createMap(action.payload.drivers, 'driverId');
        //     }
        // );
        builder.addMatcher(
            CustomersGrpcService.endpoints.getCustomers.matchFulfilled,
            (state, action) => {
                state.customers = createMap(action.payload.customers, 'customerId');
            }
        );

        // builder.addMatcher(
        //     TrucksGrpcService.endpoints.getTrucks.matchFulfilled,
        //     (state, action) => {
        //         state.trucks = createMap(action.payload.trucks, 'truckId');
        //     }
        // );
        // builder.addMatcher(
        //     TrailersGrpcService.endpoints.getTrailers.matchFulfilled,
        //     (state, action) => {
        //         state.trailers = createMap(action.payload.trailers, 'trailerId');
        //     }
        // );
        builder.addMatcher(
            BrokersGrpcService.endpoints.getBrokers.matchFulfilled,
            (state, action) => {
                state.brokers = createMap(action.payload.brokers, 'brokerId');
            }
        );
        builder.addMatcher(
            VendorsGrpcService.endpoints.getVendors.matchFulfilled,
            (state, action) => {
                state.vendors = createMap(action.payload.vendors, 'vendorId');
            }
        );
        builder.addMatcher(UsersGrpcService.endpoints.getUsers.matchFulfilled, (state, action) => {
            state.users = createMap(action.payload.users, 'userId');
        });
        builder.addMatcher(
            FactoringCompaniesGrpcService.endpoints.getFactoringCompanies.matchFulfilled,
            (state, action) => {
                state.factoringCompanies = createMap(
                    action.payload.factoringCompanies,
                    'factoringCompanyId'
                );
            }
        );
        builder.addMatcher(
            LoadDriverPayItemCategoriesGrpcService.endpoints.getDriverPayItemCategories
                .matchFulfilled,
            (state, action) => {
                state.driver_pay_categories = createMap(
                    action.payload.loadDriverPayItemCategories,
                    'driverPayItemCategoryId'
                );
            }
        );
        builder.addMatcher(
            LoadInvoiceItemCategoriesGrpcService.endpoints.getInvoiceItemCategories.matchFulfilled,
            (state, action) => {
                state.load_invoice_categories = createMap(
                    action.payload.invoiceItemCategories,
                    'invoiceItemCategoryId'
                );
            }
        );
        builder.addMatcher(
            LoadDraftsGrpcService.endpoints.getDrafts.matchFulfilled,
            (state, action) => {
                state.drafts = createMap(action.payload.loadDrafts, 'loadDraftId');
            }
        );
        builder.addMatcher(
            DriverTypesGrpcService.endpoints.getDriverTypes.matchFulfilled,
            (state, action) => {
                state.driverTypes = createMap(action.payload.driverTypes, 'driverTypeId');
            }
        );
        builder.addMatcher(
            TrailerTypesGrpcService.endpoints.getTrailerTypes.matchFulfilled,
            (state, action) => {
                state.trailersTypes = createMap(action.payload.trailerTypes, 'trailerTypeId');
            }
        );
        builder.addMatcher(
            PlatesGrpcService.endpoints.getPlates.matchFulfilled,
            (state, action) => {
                state.plates = createMap(action.payload.plates, 'plateId');
            }
        );
        builder.addMatcher(
            TrailerCompaniesGrpcService.endpoints.getTrailerCompanies.matchFulfilled,
            (state, action) => {
                state.trailerCompanies = createMap(
                    action.payload.trailerCompanies,
                    'trailerCompanyId'
                );
            }
        );
        builder.addMatcher(
            SettlementCyclesGrpcService.endpoints.getCycles.matchFulfilled,
            (state, action) => {
                state.cycles = createMap(action.payload.settlementCycles, 'cycleId');
            }
        );
        builder.addMatcher(
            RevenueTypesGrpcService.endpoints.getRevenueTypes.matchFulfilled,
            (state, action) => {
                state.revenue_types = createMap(action.payload.revenueTypes, 'revenueTypeId');
            }
        );
        builder.addMatcher(
            DocumentTypesGrpcServices.endpoints.getDocumentTypes.matchFulfilled,
            (state, action) => {
                state.documentTypesMap = createMap(action.payload.documentTypes, 'documentTypeId');
            }
        );
        builder.addMatcher(RolesGrpcService.endpoints.getRoles.matchFulfilled, (state, action) => {
            state.rolesMap = createMap(action.payload.roles, 'roleId');
        });
        builder.addMatcher(
            SettlementTransactionCategoriesGrpcService.endpoints.getCategories.matchFulfilled,
            (state, action) => {
                state.settlementTransactionCategories = createMap(
                    action.payload.settlementTransactionCategory,
                    'transactionCategoryId'
                );
            }
        );
        builder.addMatcher(
            ServiceProvidersGrpcService.endpoints.getServiceProviders.matchFulfilled,
            (state, action) => {
                state.serviceProviders = createMap(
                    action.payload.providerItems,
                    'serviceProviderId'
                );
            }
        );
        builder.addMatcher(
            ServiceLogsGrpcService.endpoints.getServiceLogs.matchFulfilled,
            (state, action) => {
                state.serviceLogs = createMap(action.payload.logs, 'serviceLogId');
            }
        );
        builder.addMatcher(
            ServiceLogItemTypeGrpcService.endpoints.getServiceLogItemTypes.matchFulfilled,
            (state, action) => {
                state.serviceLogItemTypes = createMap(action.payload.items, 'itemTypeId');
            }
        );
    }
});

const hash_maps_reducer = hash_maps_slice.reducer;

export default hash_maps_reducer;
