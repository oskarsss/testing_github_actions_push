import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_fuel_filters, useMainFuelTransactions } from '@/store/accounting/fuel/hooks';
import Table from './components/Table/FuelTable';
import Header from './components/Header/Header';

function QsCovering() {
    const {
        selected_filters,
        selected_view_id,
        views,
        defaultViewId
    } = useMainFuelTransactions();
    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="fuels"
            views={views}
            defaultValues={default_fuel_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Fuel() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
