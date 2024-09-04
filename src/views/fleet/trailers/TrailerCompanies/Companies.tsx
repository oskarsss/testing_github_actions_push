import { styled } from '@mui/material/styles';
import QueryStringCover from '@/@core/components/query-string-cover';
import {
    default_trailer_companies_filter,
    useTrailersCompanies
} from '@/store/fleet/trailers/hooks';
import TrailerCompaniesTable from './components/Table/CompaniesTable';
import Header from './components/Header/Header';

const Container = styled('div')(() => ({
    margin  : 0,
    height  : '100%',
    position: 'relative',
    overflow: 'hidden'
}));

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useTrailersCompanies();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="trailer_companies"
            views={views}
            defaultValues={default_trailer_companies_filter}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Companies() {
    return (
        <Container>
            <QsCovering />
            <Header />
            <TrailerCompaniesTable />
        </Container>
    );
}
