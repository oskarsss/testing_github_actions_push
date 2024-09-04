import { useState } from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { DriverIcon, TransactionsIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import Header from './components/Header/Header';
import DriversTable from './components/DriversTable/DriversTable';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';

const VIEWS: {
    view_id: 'drivers' | 'transactions';
    name: IntlMessageKey;
    icon: JSX.Element;
}[] = [
    {
        view_id: 'drivers',
        name   : 'recurring_transactions:header.views.drivers',
        icon   : DriverIcon()
    },
    {
        view_id: 'transactions',
        name   : 'recurring_transactions:header.views.transactions',
        icon   : TransactionsIcon()
    }
];

export type ViewID = 'drivers' | 'transactions';

export default function RecurringTransactions() {
    const { t } = useAppTranslation();
    const [viewId, setViewId] = useState<ViewID>('drivers');

    const selectViewHandler = (id: ViewID) => {
        setViewId(id);
    };

    const translateViews = VIEWS.map((view) => ({
        ...view,
        viewId: view.view_id,
        name  : t(view.name)
    }));

    return (
        <PageWrapper>
            <Header
                selectViewId={selectViewHandler}
                selected_view_id={viewId}
                views={translateViews}
            />
            {viewId === 'drivers' && <DriversTable />}
            {viewId === 'transactions' && <TransactionsTable />}
        </PageWrapper>
    );
}
