import Header from '@/views/settings/tabs/Integrations/components/Header/Header';
import Content from '@/views/settings/tabs/Integrations/components/Content/Content';
import { Stack } from '@mui/material';
import QueryStringCover from '@/@core/components/query-string-cover';
import { useFiltersIntegrations } from '@/store/settings/integrations/hooks';

function QsCovering() {
    const {
        selectedViewId,
        views,
        defaultViewId,
        selected_filters,
        page,
        defaultFilters
    } =
        useFiltersIntegrations();

    return (
        <QueryStringCover
            page={page}
            views={views}
            selectedFilters={selected_filters}
            selectedViewId={selectedViewId}
            defaultValues={defaultFilters}
            defaultViewId={defaultViewId}
        />
    );
}

export default function Integrations() {
    return (
        <Stack
            flexDirection="column"
            overflow="hidden"
            height="100%"
            width="100%"
        >
            <QsCovering />
            <Header />
            <Content />
        </Stack>
    );
}
