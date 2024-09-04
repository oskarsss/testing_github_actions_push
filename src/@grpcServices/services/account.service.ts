/* eslint-disable max-len */
import {
    CategoriesInit,
    RevenueTypesInit,
    settlementsInit
} from '@/store/accounting/settlements/actions';
import { AppActions } from '@/store/app/slice';
import { brokersInit } from '@/store/dispatch/brokers/actions';
import { customersInit } from '@/store/dispatch/customers/actions';
import { loadsInitiate, setInitialLoadsViewsAction } from '@/store/dispatch/loads/actions';
import { documentsInit } from '@/store/documents/actions';
import { driversInit } from '@/store/fleet/drivers/actions';
import { platesInit } from '@/store/fleet/plates/actions';
import { trailersInit } from '@/store/fleet/trailers/actions';
import { vendorsInit } from '@/store/fleet/vendors/actions';

// import { settingsInit } from '@/store/settings/actions';
// import { tagsInit } from '@/store/tags/actions';
import { AccountServiceClient } from '@proto/account.client';
import {
    GetAccountReply,
    GetAccountRequest,
    AccountUpdateReply,
    AccountUpdateRequest,
    PasswordUpdateRequest,
    PasswordUpdateReply,
    AccountSelfieUploadReply,
    AccountSelfieUploadRequest
} from '@proto/account';
import * as Sentry from '@sentry/nextjs';
import moment from 'moment-timezone';
import { AUTHORIZED_USER } from '@/store/auth/api';
import { trackingInitiate } from '@/store/dispatch/tracking/actions';
import { handleRequest, invalidateTags } from '@/store/api';
import { initiateMapControllersAction } from '@/store/map-controllers/actions';
import { manifestsInitiate } from '@/store/dispatch/manifests/actions/views';

// import { TableDataInitAction } from '@/store/table_editor/actions';
// import { serviceProvidersInit } from '@/store/maitenance/service-providers/actions';
import IftaGrpcService from './ifta.service';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';
import { authGrpcApi } from './auth.service';
import SettlementRecurringTransactionGrpcService from './settlements-service/settlement-recurring-transactions.service';
import PermissionsGrpcService from './settings-service/permissions.service';
import UsersGrpcService from './users-service/users.service';
import RolesGrpcService from './settings-service/roles.service';
import SettingsBillingGrpcService from './settings-billing.service';
import SettingsGrpcService from './settings.service';
import InvoicingCompanyGrpcService from './settings-service/invoicing-company.service';
import PagesGrpcService from './pages.service';
import TagsGrpcService from './tags.service';
import NotificationsGrpcService from './notifications/notifications.service';
import NotificationsSettingsGrpcService from './notifications/notifications-settings.service';
import EquipmentTypeGrpcService from './equipment-type.service';
import ServiceProvidersGrpcService from './maitenance-service/service-providers.service';
import IntegrationProviderGrpcService from './intergrations.service';
import RevenueTypesGrpcService from './settlements-service/revenue-types.service';

const AccountService = new AccountServiceClient(grpcTransport);

const AccountGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        updatePassword: mutation<PasswordUpdateReply, PasswordUpdateRequest>({
            queryFn: createPrivateQueryFn(AccountService, 'passwordUpdate'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Password changes',
                    success: 'Password changed'
                });
            }
        }),
        getAccount: query<GetAccountReply, GetAccountRequest>({
            queryFn     : createPrivateQueryFn(AccountService, 'getAccount'),
            providesTags: ['account'],
            async onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                await queryFulfilled.then(({ data }) => {
                    const response = data;
                    const savedCompanyId = window.localStorage.getItem(AUTHORIZED_USER.COMPANY_ID);
                    let current_company_id = '';

                    const isExist = response.companies.find(
                        (company) => company.companyId === savedCompanyId
                    );

                    if (isExist && savedCompanyId) {
                        dispatch(AppActions.SelectCompany(savedCompanyId));
                        current_company_id = savedCompanyId;
                    } else if (!current_company_id) {
                        dispatch(AppActions.SelectCompany(response.companies[0].companyId));
                        current_company_id = response.companies[0].companyId;
                    }

                    const isHideOnboarding = response.companies.find(
                        (company) => company.companyId === current_company_id
                    )?.onboardingCompleted;

                    dispatch(AppActions.SetHideOnboarding(Boolean(isHideOnboarding)));

                    dispatch(IftaGrpcService.endpoints.getIftaPeriods.initiate({}));
                    dispatch(authGrpcApi.endpoints.invitesGet.initiate({}));

                    dispatch(EquipmentTypeGrpcService.endpoints.getEquipmentTypes.initiate({}));
                    dispatch(PermissionsGrpcService.endpoints.getPermissions.initiate({}));

                    dispatch(UsersGrpcService.endpoints.getUsers.initiate({}));
                    dispatch(RolesGrpcService.endpoints.getRoles.initiate({}));
                    dispatch(
                        SettingsBillingGrpcService.endpoints.getSettingsBillingSubscription.initiate(
                            {}
                        )
                    );
                    dispatch(SettingsGrpcService.endpoints.getSettings.initiate({}));
                    dispatch(
                        InvoicingCompanyGrpcService.endpoints.getInvoicingCompanies.initiate({})
                    );
                    dispatch(
                        NotificationsSettingsGrpcService.endpoints.getNotificationsSettings.initiate(
                            {}
                        )
                    );

                    dispatch(NotificationsGrpcService.endpoints.getNotifications.initiate({}));
                    dispatch(TagsGrpcService.endpoints.getTags.initiate({}));
                    dispatch(vendorsInit());
                    dispatch(platesInit());
                    dispatch(initiateMapControllersAction());

                    dispatch(settlementsInit());
                    dispatch(
                        SettlementRecurringTransactionGrpcService.endpoints.getRecurringTransactions.initiate(
                            {}
                        )
                    );
                    dispatch(CategoriesInit());
                    RevenueTypesGrpcService.endpoints.getRevenueTypes.initiate({});

                    dispatch(driversInit());
                    dispatch(trailersInit());
                    dispatch(brokersInit());
                    dispatch(customersInit());
                    dispatch(documentsInit());
                    dispatch(
                        ServiceProvidersGrpcService.endpoints.getServiceProviders.initiate({})
                    );

                    dispatch(trackingInitiate());
                    dispatch(manifestsInitiate());
                    dispatch(loadsInitiate());
                    dispatch(setInitialLoadsViewsAction());

                    dispatch(PagesGrpcService.endpoints.getPages.initiate({}));
                    dispatch(
                        PagesGrpcService.endpoints.retrieveRecurringTransactionPage.initiate({})
                    );

                    // dispatch(payoutsInitAction());
                    dispatch(
                        IntegrationProviderGrpcService.endpoints.getIntegrationProviders.initiate(
                            {}
                        )
                    );

                    // reduxDispatch(LoadsActions.InitialViews());
                    // LoadboardGrpcService.getEquipments.init();

                    Sentry.setUser({
                        id        : response.user?.userId.toString(),
                        first_name: response.user?.firstName
                    });
                    moment.tz.setDefault('America/New_York');
                });
            }
        }),
        updateAccount: mutation<AccountUpdateReply, AccountUpdateRequest>({
            queryFn        : createPrivateQueryFn(AccountService, 'updateAccount'),
            invalidatesTags: (result) => [...invalidateTags(result, 'users'), 'account'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Account update',
                    success: 'Account was updated'
                });
            }
        }),
        uploadAccountSelfie: mutation<AccountSelfieUploadReply, AccountSelfieUploadRequest>({
            queryFn: createPrivateQueryFn(AccountService, 'accountSelfieUpload'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Account selfie update',
                    success: 'Account selfie was updated'
                });
            }
        })
    })
});

export default AccountGrpcService;
