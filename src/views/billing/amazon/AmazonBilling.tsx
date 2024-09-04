import { PageWrapper } from '@/@core/components/page/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import BillingLoadPanelWrap from '@/views/billing/BillingLoadPanel/BillingLoadPanelWrap';
import QueryStringCover from '@/@core/components/query-string-cover';
import { defaultInvoicesFilters, useAmazonInvoices } from '@/store/billing/hooks';
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
    const { selectedFilters } = useAmazonInvoices();

    const {
        views,
        defaultViewId,
        selectedViewId
    } = useAmazonInvoices();

    return (
        <QueryStringCover
            selectedFilters={selectedFilters}
            selectedViewId={selectedViewId}
            page="billing.amazon.stats"
            views={views}
            defaultValues={defaultInvoicesFilters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function AmazonBilling() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);

    const order = useAppSelector(selectSelectedBillingOrder('amazon'));

    const closeLoadPanel = useCallback(() => {
        dispatch(BillingActions.ResetSelectedLoadId('amazon'));
        dispatch(BillingActions.ResetSelectedLoad('amazon'));
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
                        storeKey="amazon"
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
