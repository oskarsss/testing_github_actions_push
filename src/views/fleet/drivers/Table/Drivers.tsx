// ** Styled Components
import { PageWrapper } from '@/@core/components/page/components';
import QueryStringCover from '@/@core/components/query-string-cover';
import { default_drivers_filters, useMainDrivers } from '@/store/fleet/drivers/hooks';
import Header from './components/Header/Header';
import DriversTable from './components/Table/DriversTable';

function QsCovering() {
    const {
        views,
        defaultViewId,
        selected_filters,
        selected_view_id
    } = useMainDrivers();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="drivers"
            views={views}
            defaultValues={default_drivers_filters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Drivers() {
    return (
        <PageWrapper>
            <QsCovering />
            <Header />
            <DriversTable />
        </PageWrapper>
    );
}
