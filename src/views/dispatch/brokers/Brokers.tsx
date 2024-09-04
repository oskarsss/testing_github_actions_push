import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_broker_filters, useBrokers } from '@/store/dispatch/brokers/hooks';
import Header from './components/Header/Header';
import Table from './components/Table/Table';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useBrokers();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="brokers"
            views={views}
            defaultValues={default_broker_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Brokers() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
