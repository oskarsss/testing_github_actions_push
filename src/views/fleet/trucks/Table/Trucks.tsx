import { PageWrapper } from '@/@core/components/page/components';
import { default_trucks_filters, useMainTrucks } from '@/store/fleet/trucks/hooks';
import Header from './components/Header/Header';
import TrucksTable from './components/Table/TrucksTable';
import QueryStringCover from '../../../../@core/components/query-string-cover';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainTrucks();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="trucks"
            views={views}
            defaultValues={default_trucks_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Trucks() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <TrucksTable />
        </PageWrapper>
    );
}
