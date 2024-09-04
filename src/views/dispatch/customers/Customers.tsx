import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_customers_filters, useMainCustomers } from '@/store/dispatch/customers/hooks';
import Header from './components/Header/Header';
import Table from './components/Table/Table';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainCustomers();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="customers"
            views={views}
            defaultValues={default_customers_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Customers() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
