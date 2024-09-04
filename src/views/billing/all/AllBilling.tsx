import { PageWrapper } from '@/@core/components/page/components';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import QueryStringCover from '@/@core/components/query-string-cover';
import { defaultInvoicesFilters, useAllInvoices } from '@/store/billing/hooks';
import { BillingActions, BillingSelectors } from '@/store/billing/slice';
import PageWithInfoPanelStyled from '@/@core/ui-kits/basic/info-panel/PageWithInfoPanelStyled';
import { selectSelectedBillingOrder } from '@/store/billing/selectors';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import InvoicesTable from './Table/InvoicesTable';
import Header from './Header/Header';
import BillingLoadPanelWrap from '../BillingLoadPanel/BillingLoadPanelWrap';
import ArchiveListener from './ArchiveListener';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selectedFilters,
        selectedViewId
    } = useAllInvoices();

    return (
        <QueryStringCover
            selectedFilters={selectedFilters}
            selectedViewId={selectedViewId}
            page="billing.all"
            views={views}
            defaultValues={defaultInvoicesFilters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function AllBilling() {
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectSelectedBillingOrder('all'));
    const isLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);

    const closeLoadPanel = useCallback(() => {
        dispatch(BillingActions.ResetSelectedLoadId('all'));
        dispatch(BillingActions.ResetSelectedLoad('all'));
    }, [dispatch]);

    return (
        <PageWrapper>
            <QsCovering />
            <ArchiveListener />
            {!isLoading ? (
                <PageWithInfoPanelStyled.ContentWrapper>
                    <PageWithInfoPanelStyled.TableWrapper isPanelOpen={!!order?.loadId}>
                        <Header />
                        <InvoicesTable />
                    </PageWithInfoPanelStyled.TableWrapper>

                    <BillingLoadPanelWrap
                        storeKey="all"
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
