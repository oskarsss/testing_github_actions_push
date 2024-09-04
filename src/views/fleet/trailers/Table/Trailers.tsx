// ** Styled Components
import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_trailers_filter, useMainTrailers } from '@/store/fleet/trailers/hooks';
import Header from './components/Header/Header';
import TrailersTable from './components/Table/TrailersTable';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainTrailers();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="trailers"
            views={views}
            defaultValues={default_trailers_filter}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Trailers() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <TrailersTable />
        </PageWrapper>
    );
}
