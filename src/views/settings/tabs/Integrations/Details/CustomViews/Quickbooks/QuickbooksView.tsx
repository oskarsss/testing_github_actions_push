import TableViews from '@/@core/components/table-views/TableViews';
import { useEffect, useState } from 'react';
import InvoiceItemCategoriesTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Invoicing/InvoiceItemCategoriesTable';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import CustomersTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Customers/CustomersTable';
import BrokersTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Brokers/BrokersTable';
import VendorsTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Vendors/VendorsTable';
import DriversTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Drivers/DriversTable';
import SettlementsTab from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/SettlementsTab';
import { useInvoiceQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Invoicing/hook';
import { useCustomersQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Customers/hook';
import { useBrokersQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Brokers/hook';
import { useVendorsQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Vendors/hook';
import { useDriversQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Drivers/hook';
import { useSettlementCategoriesQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Settlements/hook';
import { useChangePasswordAfterSingUpQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/ChangePasswordAfterSingUpQBDialog';
import { useRouter } from 'next/router';
import { useBankAccountsQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/BankAccounts/hook';
import BankAccountsTable from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/BankAccounts/BankAccountsTable';
import { Fade } from '@mui/material';
import TrucksTab from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Trucks/TrucksTab';
import { useTrucksQBItems } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/Trucks/hook';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Keys =
    | 'invoicing'
    | 'customers'
    | 'brokers'
    | 'vendors'
    | 'drivers'
    | 'settlements'
    | 'bank_accounts'
    | 'trucks';

const titles: Record<Keys, IntlMessageKey> = {
    invoicing    : 'settings:integrations.details.right_side.quickbooks.titles.invoicing',
    customers    : 'entity:customers',
    brokers      : 'entity:brokers',
    vendors      : 'entity:vendors',
    drivers      : 'entity:drivers',
    settlements  : '',
    bank_accounts: 'settings:integrations.details.right_side.quickbooks.titles.bank_accounts',
    trucks       : 'entity:trucks'
};

const VIEWS: { viewId: Keys; name: IntlMessageKey }[] = [
    {
        viewId: 'invoicing',
        name  : 'settings:integrations.details.right_side.quickbooks.tabs.invoicing'
    },
    {
        viewId: 'customers',
        name  : 'entity:customers'
    },
    {
        viewId: 'brokers',
        name  : 'entity:brokers'
    },
    {
        viewId: 'vendors',
        name  : 'entity:vendors'
    },
    {
        viewId: 'drivers',
        name  : 'entity:drivers'
    },
    {
        viewId: 'settlements',
        name  : 'entity:settlements'
    },
    {
        viewId: 'bank_accounts',
        name  : 'settings:integrations.details.right_side.quickbooks.tabs.bank_accounts'
    },
    {
        viewId: 'trucks',
        name  : 'entity:trucks'
    }
];

export default function QuickbooksView() {
    const [selected_viewId, selectView] = useState(VIEWS[0].viewId);
    const changePasswordForNewUserDialog = useChangePasswordAfterSingUpQBDialog();

    const invoice_data = useInvoiceQBItems();
    const customers_data = useCustomersQBItems();
    const brokers_data = useBrokersQBItems();
    const vendors_data = useVendorsQBItems();
    const drivers_data = useDriversQBItems();
    const settlements_data = useSettlementCategoriesQBItems();
    const bank_accounts_data = useBankAccountsQBItems();
    const trucks_data = useTrucksQBItems();

    const router = useRouter();
    const { t } = useAppTranslation();

    const needToUpdatePassword = router.query.update_password;

    useEffect(() => {
        if (needToUpdatePassword) {
            changePasswordForNewUserDialog.open(null);
            const {
                update_password,
                ...query
            } = router.query;
            router.replace({ query });
        }
    }, [changePasswordForNewUserDialog, needToUpdatePassword, router]);

    const counts: Record<Keys, number> = {
        invoicing    : invoice_data.data.filter((item) => !item.quickbooks_id).length,
        brokers      : brokers_data.data.filter((item) => !item.quickbooks_id).length,
        customers    : customers_data.data.filter((item) => !item.quickbooks_id).length,
        vendors      : vendors_data.data.filter((item) => !item.quickbooks_id).length,
        drivers      : drivers_data.data.filter((item) => !item.quickbooks_id).length,
        settlements  : settlements_data.settlements_unnasigned,
        bank_accounts: bank_accounts_data.data.filter((item) => !item.quickbooks_id).length,
        trucks       : trucks_data.data.filter((item) => !item.quickbooksId).length
    };

    const loadings =
        invoice_data.loading ||
        customers_data.loading ||
        brokers_data.loading ||
        vendors_data.loading ||
        drivers_data.loading ||
        settlements_data.loading ||
        bank_accounts_data.loading ||
        trucks_data.loading;

    const views = VIEWS.map((view) => {
        if (counts[view.viewId] > 0 && !loadings) {
            return {
                ...view,
                name: t(view.name),
                icon: (
                    <Fade in>
                        <IntegrationDetailsComponents.TabBadge>
                            {counts[view.viewId]}
                        </IntegrationDetailsComponents.TabBadge>
                    </Fade>
                )
            };
        }
        return {
            ...view,
            name: t(view.name)
        };
    });

    return (
        <IntegrationDetailsComponents.Right.CustomContainer>
            <IntegrationDetailsComponents.Right.ViewsWrapper>
                <TableViews
                    showScrollBar
                    isScrollable
                    selectedViewId={selected_viewId}
                    views={views}
                    selectView={selectView as (viewId: string) => void}
                    iconPosition="end"
                />
            </IntegrationDetailsComponents.Right.ViewsWrapper>
            {titles[selected_viewId as Keys] && (
                <IntegrationDetailsComponents.Right.Title>
                    {t(titles[selected_viewId as Keys])}
                </IntegrationDetailsComponents.Right.Title>
            )}
            {selected_viewId === 'invoicing' && <InvoiceItemCategoriesTable {...invoice_data} />}
            {selected_viewId === 'customers' && <CustomersTable {...customers_data} />}
            {selected_viewId === 'brokers' && <BrokersTable {...brokers_data} />}
            {selected_viewId === 'vendors' && <VendorsTable {...vendors_data} />}
            {selected_viewId === 'drivers' && <DriversTable {...drivers_data} />}
            {selected_viewId === 'settlements' && <SettlementsTab {...settlements_data.data} />}
            {selected_viewId === 'bank_accounts' && <BankAccountsTable {...bank_accounts_data} />}
            {selected_viewId === 'trucks' && <TrucksTab {...trucks_data} />}
        </IntegrationDetailsComponents.Right.CustomContainer>
    );
}
