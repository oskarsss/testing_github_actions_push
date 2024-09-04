/* eslint-disable jsx-a11y/control-has-associated-label */

import * as React from 'react';
import { useMemo } from 'react';
import EmptyState from '@/@core/components/loads-empty-state/EmptyState';
import { Grid } from '@mui/material';
import LoadsTypes from '@/store/dispatch/loads/types';
import { isEqual } from 'lodash';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

const filters_empty_keys = ['id', 'order', 'orderBy'];

type Props = {
    selectedFilters: LoadsTypes.Loads.SearchOptions;
    filterId: string;
    defaultFilters: LoadsTypes.Loads.SearchOptions;
};

export default function EmptyLoadsTable({
    filterId,
    selectedFilters,
    defaultFilters
}: Props) {
    const isEmptyFilters = useMemo(
        () => isEqual(selectedFilters, default_loads_filters),
        [selectedFilters]
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
                    filter_id={filterId}
                    is_empty_filters={isEmptyFilters}
                    default_filters={defaultFilters}
                    updateType="search"
                    styles={{
                        position: 'relative',
                        height  : '100%'
                    }}
                />
            </Grid>
        </Grid>
    );
}
