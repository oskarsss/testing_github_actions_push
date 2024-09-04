import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_vendors_filters, useMainVendors } from '@/store/fleet/vendors/hooks';
import Header from './components/Header/Header';
import Table from './components/Table/Table';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainVendors();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="vendors"
            views={views}
            defaultValues={default_vendors_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Vendors() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
