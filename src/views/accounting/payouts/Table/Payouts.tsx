import { PageWrapper } from '@/@core/components/page/components';
import React from 'react';
import QueryStringCover from '@/@core/components/query-string-cover';
import { useGetPayoutsQuery } from '@/@grpcServices/services/payouts/payouts-service-hooks';
import PayoutsTable from './components/Table/PayoutsTable';
import PayoutsHeader from './components/Header/Header';

function QsCovering() {
    const {
        selectedViewId,
        views,
        defaultViewId,
        selected_filters,
        page,
        defaultFilters
    } =
        useGetPayoutsQuery();

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

function Payouts() {
    return (
        <PageWrapper>
            <QsCovering />
            <PayoutsHeader />
            <PayoutsTable />
        </PageWrapper>
    );
}

export default Payouts;
