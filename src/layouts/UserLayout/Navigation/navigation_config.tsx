import type { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';
import { TestIDs } from '@/configs/tests';
import {
    DispatchersIcon,
    DriverIcon,
    FinanceIcon,
    FleetsIcon,
    FuelIcon,
    AnalyticsIcon,
    CustomersIcon,
    LoadsIcon,
    PrePassIcon,
    ReportIcon,
    SettingsIcon,
    TrailerIcon,
    TrucksIcon,
    SchedulingIcon,
    ContactsIcon,
    IftaIcon,
    OrigonReportIcon,
    HelpIcon,
    RecurringTransactionsIcon,
    BrokersIcon,
    PlateIcon,
    VendorIcon,
    AllInvoicesIcon,
    AmazonInvoiceIcon,
    DirectInvoiceIcon,
    FactoringInvoiceIcon,
    MapIcon,
    BillingIcon,
    TruckingIcon,
    StatsIcon,
    PayoutsIcon,
    ManifestsIcon,
    MaintenanceOverviewIcon,
    MaintenanceIcon,
    ServiceLogsIcon,
    ServiceSchedulingIcon,
    DefectsIcon,
    DvirIcon,
    ServiceProviders,
    OrderIcon,
    NotificationsIcon
} from '@/@core/icons/custom-nav-icons/icons';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import type { MouseEventHandler, PropsWithChildren } from 'react';
import { PERMISSIONS } from '@/models/permissions/permissions';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import InboxCountComponent from '@/layouts/UserLayout/Navigation/components/CountComponents/InboxCountComponent';

export type LinkComponentType = ({
    item,
    onClick,
    children
}: PropsWithChildren<{
    item: Children | Item;
    onClick: MouseEventHandler<HTMLAnchorElement>;
}>) => JSX.Element;

const NavigationConfig = (): Item[] => [
    // {
    //     icon  : HomeIcon,
    //     id    : 'home',
    //     testId: TestIDs.pages.navigation.links.home,
    //     title : 'Home',
    //     path  : '/home'
    // },
    // {
    //     icon  : LoadboardIcon,
    //     id    : 'loadboard',
    //     testId: TestIDs.pages.navigation.links.loadboard,
    //     title : 'Loadboard',
    //     path  : '/loadboard'
    // },
    {
        id                 : 'inbox',
        title              : 'navigation:items.notifications',
        icon               : NotificationsIcon,
        path               : '/inbox',
        permission_map_name: 'HOME',
        permission_name    : PERMISSIONS.HOME_PAGE,
        testId             : TestIDs.pages.navigation.links.dashboard,
        countComponent     : <InboxCountComponent />
    },
    {
        id                 : 'analytics',
        title              : 'navigation:items.analytics',
        icon               : AnalyticsIcon,
        path               : '/analytics',
        permission_map_name: 'HOME',
        permission_name    : PERMISSIONS.HOME_PAGE,
        testId             : TestIDs.pages.navigation.links.dashboard
    },
    {
        id                 : 'dispatch',
        title              : 'navigation:items.dispatch.main',
        icon               : DispatchersIcon,
        permission_map_name: 'DISPATCH',
        testId             : TestIDs.pages.navigation.buttons.dispatchMenu,
        children           : [
            {
                id             : 'schedule',
                title          : 'navigation:items.dispatch.schedule',
                icon           : SchedulingIcon,
                path           : '/dispatch/scheduling',
                permission_name: PERMISSIONS.SCHEDULING_PAGE,
                testId         : TestIDs.pages.navigation.links.dispatchSchedule,
                filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.SCHEDULE
            },

            // TODO: DELETE THIS
            // TODO: DELETE THIS
            // TODO: DELETE THIS
            // {
            //     id             : 'schedule-loads',
            //     title          : 'navigation:items.dispatch.schedule_loads',
            //     icon           : SchedulingIcon,
            //     path           : '/dispatch/scheduling-loads',
            //     permission_name: PERMISSIONS.SCHEDULING_PAGE,
            //     testId         : TestIDs.pages.navigation.links.dispatchSchedule,
            //     filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.SCHEDULE
            // },
            {
                id             : 'loads',
                title          : 'navigation:items.dispatch.loads',
                icon           : OrderIcon,
                path           : APP_ROUTES_CONFIG.dispatch.orders.path,
                permission_name: PERMISSIONS.LOADS_PAGE,
                testId         : TestIDs.pages.navigation.links.dispatchLoads,
                filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.LOADS
            },
            {
                id             : 'tracking',
                title          : 'navigation:items.dispatch.tracking',
                icon           : TruckingIcon,
                path           : '/dispatch/tracking',
                permission_name: PERMISSIONS.LOADS_PAGE,
                testId         : TestIDs.pages.navigation.links.dispatchTrucking

                // filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.LOADS
            },
            {
                id             : 'manifests',
                icon           : ManifestsIcon,
                path           : '/dispatch/manifests',
                testId         : 'manifests',
                title          : 'navigation:items.dispatch.manifests',
                permission_name: PERMISSIONS.LOADS_PAGE
            },
            {
                id             : 'brokers',
                title          : 'navigation:items.dispatch.brokers',
                icon           : BrokersIcon,
                path           : '/dispatch/brokers',
                permission_name: PERMISSIONS.BROKERS_PAGE,
                testId         : TestIDs.pages.navigation.links.dispatchBrokers,
                filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.BROKERS
            },
            {
                id             : 'customers',
                title          : 'navigation:items.dispatch.customers',
                icon           : CustomersIcon,
                path           : '/dispatch/customers',
                permission_name: PERMISSIONS.CUSTOMERS_PAGE,
                testId         : TestIDs.pages.navigation.links.dispatchCustomers,
                filtersOptions : () => PAGES_FILTERS_CONFIG.DISPATCH.CUSTOMERS
            }
        ]
    },
    {
        id                 : 'map',
        title              : 'navigation:items.map',
        icon               : MapIcon,
        path               : '/map',
        permission_map_name: 'HOME',
        permission_name    : PERMISSIONS.SCHEDULING_PAGE,
        testId             : TestIDs.pages.navigation.links.dashboard
    },
    {
        id                 : 'fleet',
        title              : 'navigation:items.fleet.main',
        icon               : FleetsIcon,
        permission_map_name: 'FLEET',
        testId             : TestIDs.pages.navigation.buttons.fleetMenu,
        children           : [
            {
                id             : 'trucks',
                title          : 'navigation:items.fleet.trucks',
                icon           : TrucksIcon,
                path           : '/trucks',
                permission_name: PERMISSIONS.TRUCKS_PAGE,
                testId         : TestIDs.pages.navigation.links.fleetTrucks,
                filtersOptions : () => PAGES_FILTERS_CONFIG.FLEET.TRUCKS
            },
            {
                id             : 'trailers',
                title          : 'navigation:items.fleet.trailers',
                icon           : TrailerIcon,
                path           : '/trailers',
                permission_name: PERMISSIONS.TRAILERS_PAGE,
                testId         : TestIDs.pages.navigation.links.fleetTrailers,
                filtersOptions : () => PAGES_FILTERS_CONFIG.FLEET.TRAILERS
            },
            {
                id             : 'drivers',
                title          : 'navigation:items.fleet.drivers',
                icon           : DriverIcon,
                path           : '/drivers',
                permission_name: PERMISSIONS.DRIVERS_PAGE,
                testId         : TestIDs.pages.navigation.links.fleetDrivers,
                filtersOptions : () => PAGES_FILTERS_CONFIG.FLEET.DRIVERS
            },
            {
                id             : 'plates',
                title          : 'navigation:items.fleet.plates',
                icon           : PlateIcon,
                path           : '/plates',
                permission_name: PERMISSIONS.PLATES_PAGE,
                testId         : TestIDs.pages.navigation.links.fleetPlates,
                filtersOptions : () => PAGES_FILTERS_CONFIG.FLEET.PLATES
            },
            {
                id             : 'vendors',
                title          : 'navigation:items.fleet.vendors',
                icon           : VendorIcon,
                path           : '/vendors',
                permission_name: PERMISSIONS.VENDORS_PAGE,
                testId         : TestIDs.pages.navigation.links.fleetVendors,
                filtersOptions : () => PAGES_FILTERS_CONFIG.FLEET.VENDORS
            }
        ]
    },

    // {
    //     id                 : 'maintenance',
    //     title              : 'navigation:items.maintenance.main',
    //     icon               : MaintenanceIcon,
    //     testId             : TestIDs.pages.navigation.buttons.maintenanceMenu,
    //     permission_map_name: 'FLEET',
    //     children           : [
    //         {
    //             id             : 'overview',
    //             path           : '/maintenance',
    //             title          : 'navigation:items.maintenance.overview',
    //             icon           : MaintenanceOverviewIcon,
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             testId         : TestIDs.pages.navigation.links.maintenanceOverview
    //         },
    //         {
    //             id             : 'maintenance_service_providers',
    //             path           : '/maintenance/service-providers',
    //             title          : 'navigation:items.maintenance.service_providers',
    //             icon           : ServiceProviders,
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             testId         : 'maintenance_scheduling'
    //         },
    //         {
    //             id             : 'maintenance_service_logs',
    //             path           : '/maintenance/service-logs',
    //             title          : 'navigation:items.maintenance.service_logs',
    //             icon           : ServiceLogsIcon,
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             testId         : TestIDs.pages.navigation.links.maintenanceServiceLogs
    //         },
    //         {
    //             id             : 'maintenance_scheduling',
    //             path           : '/maintenance/scheduling',
    //             title          : 'navigation:items.maintenance.scheduling',
    //             icon           : ServiceSchedulingIcon,
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             testId         : 'maintenance_scheduling'
    //         },
    //         {
    //             icon           : DefectsIcon,
    //             id             : 'defects',
    //             path           : '/maintenance/defects',
    //             title          : 'navigation:items.maintenance.defects',
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             testId         : 'defects'
    //         },
    //         {
    //             icon           : DvirIcon,
    //             id             : 'dvir',
    //             path           : '/maintenance/dvir',
    //             permission_name: PERMISSIONS.PLATES_PAGE,
    //             title          : 'navigation:items.maintenance.dvir',
    //             testId         : 'DVIR'
    //         }
    //     ]

    //     //     // path  : '/maintenance'
    // },
    {
        id                 : 'billing',
        title              : 'navigation:items.billing.main',
        icon               : FinanceIcon,
        permission_map_name: 'FINANCE',
        testId             : TestIDs.pages.navigation.buttons.billingMenu,
        children           : [
            {
                id             : 'billing.all',
                title          : 'navigation:items.billing.all',
                icon           : AllInvoicesIcon,
                path           : '/billing',
                permission_name: PERMISSIONS.INVOICES_PAGE,
                testId         : TestIDs.pages.navigation.links.billingAll,
                filtersOptions : () => PAGES_FILTERS_CONFIG.BILLING.ALL
            },
            {
                id             : 'billing.factoring',
                title          : 'navigation:items.billing.factoring',
                icon           : FactoringInvoiceIcon,
                path           : '/billing/factoring',
                permission_name: PERMISSIONS.INVOICES_PAGE,
                testId         : TestIDs.pages.navigation.links.billingFactoring,
                filtersOptions : () => PAGES_FILTERS_CONFIG.BILLING.FACTORING
            },
            {
                id             : 'billing.direct',
                title          : 'navigation:items.billing.direct',
                icon           : DirectInvoiceIcon,
                path           : '/billing/direct',
                permission_name: PERMISSIONS.INVOICES_PAGE,
                testId         : TestIDs.pages.navigation.links.billingDirect,
                filtersOptions : () => PAGES_FILTERS_CONFIG.BILLING.DIRECT
            },
            {
                id             : 'billing.amazon',
                title          : 'navigation:items.billing.amazon',
                icon           : AmazonInvoiceIcon,
                path           : '/billing/amazon',
                permission_name: PERMISSIONS.INVOICES_PAGE,
                testId         : TestIDs.pages.navigation.links.billingAmazon,
                filtersOptions : () => PAGES_FILTERS_CONFIG.BILLING.AMAZON
            }
        ]
    },
    {
        id                 : 'accounting',
        title              : 'navigation:items.accounting.main',
        testId             : TestIDs.pages.navigation.buttons.accountingMenu,
        permission_map_name: 'FINANCE',
        icon               : BillingIcon,
        children           : [
            {
                id             : 'settlements',
                title          : 'navigation:items.accounting.settlements',
                icon           : ContactsIcon,
                path           : '/settlements',
                permission_name: PERMISSIONS.SETTLEMENTS_PAGE,
                testId         : TestIDs.pages.navigation.links.accountingSettlements,
                filtersOptions : () => PAGES_FILTERS_CONFIG.ACCOUNTING.SETTLEMENTS
            },
            {
                id             : 'dispatchers',
                title          : 'navigation:items.accounting.dispatchers',
                icon           : StatsIcon,
                path           : '/dispatchers',
                permission_name: PERMISSIONS.DISPATCHERS_SETTLEMENTS_VIEW,
                testId         : TestIDs.pages.navigation.links.accountingDispatchers
            },
            {
                id             : 'payouts',
                title          : 'navigation:items.accounting.payouts',
                icon           : PayoutsIcon,
                path           : '/payouts',
                permission_name: PERMISSIONS.SETTLEMENTS_PAGE,
                testId         : TestIDs.pages.navigation.links.accountingPayouts
            },
            {
                id             : 'recurring-transactions',
                title          : 'navigation:items.accounting.recurring_transactions',
                icon           : RecurringTransactionsIcon,
                path           : '/settlements/recurring-transactions',
                permission_name: PERMISSIONS.RECURRING_TRANSACTIONS_PAGE,
                testId         : TestIDs.pages.navigation.links.accountingRecurringTransaction,
                filtersOptions : () =>
                    PAGES_FILTERS_CONFIG.ACCOUNTING.RECURRING_TRANSACTIONS.TRANSACTIONS
            },
            {
                id             : 'tolls',
                title          : 'navigation:items.accounting.tolls',
                icon           : PrePassIcon,
                path           : '/tolls',
                permission_name: PERMISSIONS.TOLLS_PAGE,
                testId         : TestIDs.pages.navigation.links.accountingTolls,
                filtersOptions : () => PAGES_FILTERS_CONFIG.ACCOUNTING.TOLLS
            },
            {
                id             : 'fuel',
                title          : 'navigation:items.accounting.fuel',
                icon           : FuelIcon,
                path           : '/fuel',
                permission_name: PERMISSIONS.FUEL_PAGE,
                testId         : TestIDs.pages.navigation.links.accountingFuel,
                filtersOptions : () => PAGES_FILTERS_CONFIG.ACCOUNTING.FUEL
            }
        ]
    },
    {
        id                 : 'reports',
        title              : 'navigation:items.reports.main',
        icon               : ReportIcon,
        permission_map_name: 'REPORTS',
        testId             : TestIDs.pages.navigation.buttons.reportsMenu,
        children           : [
            {
                id             : 'ifta',
                title          : 'navigation:items.reports.ifta',
                path           : '/reports/ifta',
                icon           : IftaIcon,
                permission_name: PERMISSIONS.IFTA_PAGE,
                testId         : TestIDs.pages.navigation.links.reportsIFTA
            },
            {
                id    : 'oregon',
                title : 'navigation:items.reports.oregon',
                path  : '/reports/oregon',
                icon  : OrigonReportIcon,
                testId: TestIDs.pages.navigation.links.reportsOregon
            }
        ]
    },
    {
        id                 : 'settings',
        title              : 'navigation:items.settings.main',
        path               : '/settings',
        icon               : SettingsIcon,
        permission_map_name: 'SETTINGS',
        permission_name    : PERMISSIONS.SETTINGS_PAGE,
        testId             : TestIDs.pages.navigation.links.settings
    }
];

export default NavigationConfig;

export const helperNav: Item[] = [
    // {
    //     id   : 'chat',
    //     title: 'Chat',
    //     icon : chatIcon,
    //     path : '/chat'
    // },

    // {
    //     id   : 'whats-new',
    //     title: 'What`s New?',
    //     icon : whatsNewIcon,
    //     path : 'https://help.vektortms.com/'
    // },
    // {
    //     id   : 'academy',
    //     title: 'Academy',
    //     icon : academyIcon,
    //     path : 'https://help.vektortms.com/'
    // },
    {
        id    : 'help',
        title : 'navigation:items.help',
        icon  : HelpIcon,
        path  : 'https://help.vektortms.com/',
        testId: TestIDs.pages.navigation.links.help
    }
];
