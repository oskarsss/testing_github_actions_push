import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_plates_filters, useMainPlates } from '@/store/fleet/plates/hooks';
import Header from './components/Header/Header';
import Table from './components/Table/Table';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainPlates();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="plates"
            views={views}
            defaultValues={default_plates_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Plates() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <Table />
        </PageWrapper>
    );
}
