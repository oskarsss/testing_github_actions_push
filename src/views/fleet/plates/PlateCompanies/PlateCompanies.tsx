import { styled } from '@mui/material/styles';
import Header from '@/views/fleet/plates/PlateCompanies/components/Header/Header';
import TablePlateCompanies from '@/views/fleet/plates/PlateCompanies/components/Table/TablePlateCompanies';
import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_plates_companies_filters, usePlatesCompanies } from '@/store/fleet/plates/hooks';

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
    } = usePlatesCompanies(false);

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="plate_companies"
            views={views}
            defaultValues={default_plates_companies_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function PlateCompanies() {
    return (
        <Container>
            <QsCovering />
            <Header />
            <TablePlateCompanies />
        </Container>
    );
}
