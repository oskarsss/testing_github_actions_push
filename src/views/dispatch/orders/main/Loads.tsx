import { useEffect } from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import { OrdersDataSelectors } from '@/store/storage/orders/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import LoadsAnalytics from '@/views/dispatch/orders/main/analytics';
import LoadsTable from './table';
import LoadDetailsDialog from '../Details/LoadDetailsDialog';
import LoadsHeader from './header/Header';
import KeyboardListener from './KeyboardListener';
import ArchiveListener from './ArchiveListener';
import QueryStringCovering from './QuesryString';
import styles from './OrdersPage.module.scss';

export default function OrdersPage() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);

    useEffect(
        () => () => {
            dispatch(LoadsActions.ResetSelectedLoad());
        },
        [dispatch]
    );

    return (
        <PageWrapper>
            <ArchiveListener />
            {!isLoading ? (
                <>
                    <LoadsHeader />
                    <QueryStringCovering />
                    <KeyboardListener />

                    <div className={styles.container}>
                        <LoadsTable />
                        <div className={styles.analytics}>
                            <LoadsAnalytics />
                        </div>
                        <LoadDetailsDialog />
                    </div>
                </>
            ) : (
                <Preloader />
            )}
        </PageWrapper>
    );
}
