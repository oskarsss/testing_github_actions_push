import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_tolls_filters, useMainTolls } from '@/store/accounting/tolls/hooks';
import Table from './components/Table/TollsTable';
import Header from './components/Header/Header';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainTolls();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="tolls"
            views={views}
            defaultValues={default_tolls_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Tolls() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
