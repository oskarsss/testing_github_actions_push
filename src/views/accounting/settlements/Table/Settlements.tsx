import { useEffect } from 'react';
import { PageWrapper } from '@/@core/components/page/components';
import { useAppDispatch } from '@/store/hooks';
import SettlementContent from '@/views/accounting/settlements/Table/SettlementsContent';
import { TableActions } from '@/store/table/slice';
import { useSettlementsViews } from '@/store/accounting/settlements/hooks/settlements';
import Header from './components/Header/Header';

export default function Settlements() {
    const dispatch = useAppDispatch();
    const { tableName } = useSettlementsViews();

    useEffect(() => {
        dispatch(TableActions.ResetIds({ tableName }));
    }, [dispatch]);

    return (
        <PageWrapper>
            <Header />
            <SettlementContent />
        </PageWrapper>
    );
}
