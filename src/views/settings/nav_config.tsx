import AccountBalance from '@mui/icons-material/AccountBalance';
import type { IntlMessageKey } from '@/@types/next-intl';
import { ReactNode } from 'react';
import { uuidv4 } from '@/utils/uuidv4';
import { PERMISSIONS } from '@/models/permissions/permissions';
import DomainIcon from '@mui/icons-material/Domain';
import StarRateIcon from '@mui/icons-material/StarRate';
import SettingIcons from './icons/icons';

export const createSettingsRoute = (route: string) => `/settings${route}`;

type NavItemChildren = {
    id: number | string;
    icon: ReactNode;
    title: IntlMessageKey;
    route: string;
    permission: keyof typeof PERMISSIONS;
};

type NavItem = {
    title: IntlMessageKey;
    children: NavItemChildren[];
};

export const NAV_ITEMS: NavItem[] = [
    {
        title   : 'settings:navigation.my_account.title',
        children: [
            {
                id        : 1,
                icon      : <SettingIcons.Profile />,
                title     : 'settings:navigation.my_account.profile',
                route     : '',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 3,
                icon      : <SettingIcons.Password />,
                title     : 'settings:navigation.my_account.password',
                route     : '/password',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : uuidv4(),
                icon      : <SettingIcons.NotificationIcon />,
                title     : 'settings:navigation.my_account.notifications',
                route     : '/notifications',
                permission: 'SETTINGS_BILLING_PAGE'
            },
            {
                id        : uuidv4(),
                icon      : <SettingIcons.Language />,
                title     : 'settings:navigation.my_account.language',
                route     : '/language',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.organization.title',
        children: [
            {
                id        : 4,
                icon      : <SettingIcons.Members />,
                title     : 'settings:navigation.organization.members',
                route     : '/members',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : uuidv4(),
                icon      : <SettingIcons.Teams />,
                title     : 'settings:navigation.organization.teams',
                route     : '/teams',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 13,
                icon      : <SettingIcons.Roles />,
                title     : 'settings:navigation.organization.roles',
                route     : '/roles',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 5,
                icon      : <SettingIcons.Company />,
                title     : 'settings:navigation.organization.company',
                route     : '/company',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : uuidv4(),
                icon      : <SettingIcons.ActionRange />,
                title     : 'settings:navigation.organization.advanced_config',
                route     : '/advanced-config',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 2,
                icon      : <SettingIcons.AccountAndPlan />,
                title     : 'settings:navigation.organization.billing',
                route     : '/billing',
                permission: 'SETTINGS_BILLING_PAGE'
            },
            {
                id        : 18,
                icon      : <AccountBalance />,
                title     : 'settings:navigation.organization.bank_accounts',
                route     : '/bank-accounts',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 12,
                icon      : <SettingIcons.Security />,
                title     : 'settings:navigation.organization.security',
                route     : '/security',
                permission: 'SETTINGS_PAGE'
            }

            // {
            //     id        : uuidv4(),
            //     icon      : <DomainIcon />,
            //     title     : 'settings:navigation.organization.domains',
            //     route     : '/domains',
            //     permission: 'SETTINGS_PAGE'
            // },
            // {
            //     id        : uuidv4(),
            //     icon      : <StarRateIcon />,
            //     title     : 'settings:navigation.organization.customer_portal',
            //     route     : '/customer-portals',
            //     permission: 'SETTINGS_PAGE'
            // }
        ]
    },
    {
        title   : 'settings:navigation.integrations.title',
        children: [
            {
                id        : 6,
                icon      : <SettingIcons.Integrations />,
                title     : 'settings:navigation.integrations.integrations',
                route     : '/integrations',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.invoicing.title',
        children: [
            {
                id        : 15,
                icon      : <SettingIcons.Invoicing />,
                title     : 'settings:navigation.invoicing.invoicing_companies',
                route     : '/invoicing',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 16,
                icon      : <SettingIcons.FactoringCompanies />,
                title     : 'settings:navigation.invoicing.factoring_companies',
                route     : '/invoicing/factoring-companies',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.drivers.title',
        children: [
            {
                id        : 17,
                icon      : <SettingIcons.DriversTypes />,
                title     : 'settings:navigation.drivers.driver_types',
                route     : '/drivers/types',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },

    {
        title   : 'settings:navigation.settlements.title',
        children: [
            {
                id        : 7,
                icon      : <SettingIcons.SettlementsSettings />,
                title     : 'settings:navigation.settlements.general_settings',
                route     : '/settlements',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 8,
                icon      : <SettingIcons.Cycles />,
                title     : 'settings:navigation.settlements.cycles',
                route     : '/settlements/cycles',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 14,
                icon      : <SettingIcons.RevenueTypes />,
                title     : 'settings:navigation.settlements.revenue_types',
                route     : '/settlements/revenue-types',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 9,
                icon      : <SettingIcons.CreditTransactions />,
                title     : 'settings:navigation.settlements.credit_categories',
                route     : '/settlements/credit-categories',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 10,
                icon      : <SettingIcons.DebitTransactions />,
                title     : 'settings:navigation.settlements.debit_categories',
                route     : '/settlements/debit-categories',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.documents.title',
        children: [
            {
                id        : 11,
                icon      : <SettingIcons.DocumentTypes />,
                title     : 'settings:navigation.documents.document_types',
                route     : '/documents',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.loads.title',
        children: [
            {
                id        : 12,
                icon      : <SettingIcons.DriverPayCategories />,
                title     : 'settings:navigation.loads.driver_pay_categories',
                route     : '/loads/driver-pay-categories',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 13,
                icon      : <SettingIcons.InvoiceCategories />,
                title     : 'settings:navigation.loads.invoice_item_categories',
                route     : '/loads/invoice-item-categories',
                permission: 'SETTINGS_PAGE'
            },
            {
                id        : 14,
                icon      : <SettingIcons.LoadTypes />,
                title     : 'settings:navigation.loads.load_types',
                route     : '/loads/load-types',
                permission: 'SETTINGS_PAGE'
            }
        ]
    },
    {
        title   : 'settings:navigation.trailers.title',
        children: [
            {
                id        : 12,
                icon      : <SettingIcons.TrailerTypes />,
                title     : 'settings:navigation.trailers.trailer_types',
                route     : '/trailers/types',
                permission: 'SETTINGS_PAGE'
            }
        ]
    }
];
