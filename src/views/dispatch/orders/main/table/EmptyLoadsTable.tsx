/* eslint-disable jsx-a11y/control-has-associated-label */

import * as React from 'react';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { useMemo } from 'react';
import EmptyState from '@/@core/components/loads-empty-state/EmptyState';
import { Grid } from '@mui/material';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import isEqual from 'lodash/isEqual';

export default function EmptyLoadsTable() {
    const {
        selected_filters,
        filter_id
    } = useOrdersPageFilters();

    const isEmptyFilters = useMemo(
        () => isEqual(selected_filters, default_loads_filters),
        [selected_filters]
    );

    return (
        <Grid
            container
            height="100%"
        >
            <Grid
                item
                xs={12}
                alignItems="center"
                justifyContent="space-between"
            >
                <EmptyState
                    filter_id={filter_id}
                    updateType="search"
                    is_empty_filters={isEmptyFilters}
                    default_filters={default_loads_filters}
                    styles={{
                        position: 'relative',
                        height  : '100%'
                    }}
                />
            </Grid>
        </Grid>
    );
}
