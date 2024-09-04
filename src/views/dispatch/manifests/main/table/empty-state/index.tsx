/* eslint-disable jsx-a11y/control-has-associated-label */

import * as React from 'react';
import { useMemo } from 'react';
import { Grid } from '@mui/material';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { MANIFESTS_VIEW_TYPES } from '@/store/dispatch/manifests/models';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { ManifestFilterStatuses } from '@/models/manifests/manifest';
import { isEqual } from 'lodash';
import EmptyStateContent from './EmptyStateContent';

export default function EmptyManifestsTable() {
    const {
        filter_id: filterId,
        selected_filters: selectedFilters,
        selected_view_id,
        view,
        selectView
    } = useManifestsFilters();

    const truckId = view?.view_id.split('_')[1];

    const defaultFilters = useMemo(() => {
        switch (selected_view_id) {
        case MANIFESTS_VIEW_TYPES.all:
            return manifestDefaultFilters;
        case MANIFESTS_VIEW_TYPES.assigned:
            return {
                ...manifestDefaultFilters,
                manifest_status: [ManifestFilterStatuses.STATUS_ASSIGNED]
            };
        case MANIFESTS_VIEW_TYPES.moving:
            return {
                ...manifestDefaultFilters,
                manifest_status: [ManifestFilterStatuses.STATUS_IN_PROGRESS]
            };
        case MANIFESTS_VIEW_TYPES.planning:
            return {
                ...manifestDefaultFilters,
                manifest_status: [ManifestFilterStatuses.STATUS_PLANNING]
            };
        case MANIFESTS_VIEW_TYPES.completed:
            return {
                ...manifestDefaultFilters,
                manifest_status: [ManifestFilterStatuses.STATUS_DELIVERED]
            };
        case MANIFESTS_VIEW_TYPES.truck:
            return {
                ...manifestDefaultFilters,
                truck          : truckId ? [truckId] : [],
                manifest_status: [
                    ManifestFilterStatuses.STATUS_ASSIGNED,
                    ManifestFilterStatuses.STATUS_PLANNING,
                    ManifestFilterStatuses.STATUS_IN_PROGRESS
                ]
            };
        default:
            return manifestDefaultFilters;
        }
    }, [selected_view_id, truckId]);

    const typeEmptyState = useMemo(() => {
        const mergeDefaultFilterAndSelected = {
            ...manifestDefaultFilters,
            ...selectedFilters
        };

        if (!isEqual(mergeDefaultFilterAndSelected, defaultFilters)) {
            return 'clearFilter' as const;
        }

        const viewsShowGoToAllButton = [
            MANIFESTS_VIEW_TYPES.planning,
            MANIFESTS_VIEW_TYPES.assigned,
            MANIFESTS_VIEW_TYPES.moving,
            MANIFESTS_VIEW_TYPES.completed,
            MANIFESTS_VIEW_TYPES.truck
        ];
        if (viewsShowGoToAllButton.includes(selected_view_id as MANIFESTS_VIEW_TYPES)) {
            return 'goToAll' as const;
        }
        return 'createNewManifest' as const;
    }, [defaultFilters, selectedFilters, selected_view_id]);

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
                <EmptyStateContent
                    filter_id={filterId}
                    default_filters={defaultFilters}
                    typeEmptyState={typeEmptyState}
                    selectView={selectView}
                    styles={{
                        position: 'relative',
                        height  : '100%'
                    }}
                />
            </Grid>
        </Grid>
    );
}
