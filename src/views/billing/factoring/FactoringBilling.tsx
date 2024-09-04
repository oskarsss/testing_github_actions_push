import { PageWrapper } from '@/@core/components/page/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import BillingLoadPanelWrap from '@/views/billing/BillingLoadPanel/BillingLoadPanelWrap';
import QueryStringCover from '@/@core/components/query-string-cover';
import { defaultInvoicesFilters, useFactoringInvoices } from '@/store/billing/hooks';
import { BillingActions, BillingSelectors } from '@/store/billing/slice';
import { useCallback } from 'react';
import PageWithInfoPanelStyled from '@/@core/ui-kits/basic/info-panel/PageWithInfoPanelStyled';
import { selectSelectedBillingOrder } from '@/store/billing/selectors';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import InvoicesTable from './Table/InvoicesTable';
import Header from './Header/Header';
import ArchiveListener from './ArchiveListener';

function QsCovering() {
    const {
        views,
        selectedViewId,
        defaultViewId,
        selectedFilters
    } = useFactoringInvoices();

    return (
        <QueryStringCover
            selectedFilters={selectedFilters}
            selectedViewId={selectedViewId}
            page="billing.factoring"
            views={views}
            defaultValues={defaultInvoicesFilters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function FactoringBilling() {
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectSelectedBillingOrder('factoring'));
    const isLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);

    const closeLoadPanel = useCallback(() => {
        dispatch(BillingActions.ResetSelectedLoadId('factoring'));
        dispatch(BillingActions.ResetSelectedLoad('factoring'));
    }, [dispatch]);

    return (
        <PageWrapper>
            <QsCovering />
            <ArchiveListener />
            {!isLoading ? (
                <PageWithInfoPanelStyled.ContentWrapper>
                    <PageWithInfoPanelStyled.TableWrapper isPanelOpen={!!order}>
                        <Header />
                        <InvoicesTable />
                    </PageWithInfoPanelStyled.TableWrapper>

                    <BillingLoadPanelWrap
                        storeKey="factoring"
                        selectedLoadId={order?.loadId || ''}
                        onClose={closeLoadPanel}
                    />
                </PageWithInfoPanelStyled.ContentWrapper>
            ) : (
                <Preloader />
            )}
        </PageWrapper>
    );
}
