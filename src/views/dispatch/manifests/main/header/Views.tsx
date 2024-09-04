/* eslint-disable no-case-declarations */
import { TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import VectorIcons from '@/@core/icons/vector_icons';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import PageTabs from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import { CommonViewIcon } from '@/@core/ui-kits/loads/loads-page-views/loads-views-icon-config';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import React, { MouseEvent, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    deleteManifestsViewAction,
    updateManifestsViewsAction
} from '@/store/dispatch/manifests/actions/views';
import { ManifestFilterStatuses } from '@/models/manifests/manifest';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import {
    MANIFEST_VIEW_IDS_ENUM,
    MANIFESTS_VIEW_TYPES,
    ManifestView
} from '@/store/dispatch/manifests/models';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { selectStatusIndexes } from '@/store/dispatch/manifests/selectors';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { useEditViewMenu } from './edit-view-filter/EditViewFilter';

const MANIFESTS_VIEWS_ICON_CONFIG = {
    all      : <Box />,
    planning : <VectorIcons.Manifests.Planning />,
    assigned : <VectorIcons.Manifests.Assigned />,
    moving   : <VectorIcons.Manifests.Moving />,
    completed: <VectorIcons.Manifests.Completed />,
    truck    : <TrucksIcon />,
    custom   : <CommonViewIcon />
};

const defaultViewsList = [
    MANIFESTS_VIEW_TYPES.all,
    MANIFESTS_VIEW_TYPES.planning,
    MANIFESTS_VIEW_TYPES.assigned,
    MANIFESTS_VIEW_TYPES.moving,
    MANIFESTS_VIEW_TYPES.completed
];

export function ManifestsViews() {
    const menuEditView = useEditViewMenu();
    const {
        view,
        views,
        selectView,
        filter_id

        // filters
    } = useManifestsFilters();

    const statusStats = useAppSelector(selectStatusIndexes);

    const updateFilters = useUpdateFilters({ filter_id });

    const tabsCount: Record<MANIFESTS_VIEW_TYPES, number | null> = useMemo(
        () => ({
            all      : null,
            planning : statusStats[ManifestModel_Status.PLANNING]?.length || 0,
            assigned : statusStats[ManifestModel_Status.ASSIGNED]?.length || 0,
            moving   : statusStats[ManifestModel_Status.IN_PROGRESS]?.length || 0,
            completed: statusStats[ManifestModel_Status.DELIVERED]?.length || 0,
            truck    : null,
            custom   : null
        }),
        [statusStats]
    );

    const dispatch = useAppDispatch();

    const deleteViewAction = (viewId: string) => {
        selectView(MANIFEST_VIEW_IDS_ENUM.ALL);
        dispatch(deleteManifestsViewAction(viewId));
    };

    const updateViewsAction = (views: ManifestView[]) => {
        dispatch(updateManifestsViewsAction(views));
    };

    const updateView = (event: MouseEvent<HTMLButtonElement>, view: ManifestView) => {
        menuEditView.open({
            view,
            deleteViewAction,
            updateViewsAction,
            views
        })(event);
    };

    const selectedViewId = view?.view_id || '';

    const onClick = (event: MouseEvent<HTMLDivElement>, clickedView: ManifestView) => {
        if (event.detail === 2 && clickedView.view_id === view?.view_id) {
            switch (view.type) {
            // TODO: VLAD  - Set primaryFilters to view structure
            case MANIFESTS_VIEW_TYPES.assigned:
                updateFilters({
                    ...manifestDefaultFilters,
                    manifest_status: [ManifestFilterStatuses.STATUS_PLANNING]
                });
                break;

            case MANIFESTS_VIEW_TYPES.completed:
                updateFilters({
                    ...manifestDefaultFilters,
                    manifest_status: [ManifestFilterStatuses.STATUS_DELIVERED]
                });
                break;

            case MANIFESTS_VIEW_TYPES.moving:
                updateFilters({
                    ...manifestDefaultFilters,
                    manifest_status: [ManifestFilterStatuses.STATUS_IN_PROGRESS]
                });
                break;

            case MANIFESTS_VIEW_TYPES.planning:
                updateFilters({
                    ...manifestDefaultFilters,
                    manifest_status: [ManifestFilterStatuses.STATUS_PLANNING]
                });
                break;
            case MANIFESTS_VIEW_TYPES.truck:
                const truckId = view.view_id.split('_')[1];
                updateFilters({
                    ...manifestDefaultFilters,
                    truck          : [truckId],
                    manifest_status: [
                        ManifestFilterStatuses.STATUS_ASSIGNED,
                        ManifestFilterStatuses.STATUS_PLANNING,
                        ManifestFilterStatuses.STATUS_IN_PROGRESS
                    ]
                });
                break;
            default:
                updateFilters(manifestDefaultFilters);
                break;
            }
        }
    };

    return (
        <PageTabs
            value={selectedViewId}
            isScrollable
            onChange={(_, value) => selectView(value)}
            scrollToSelectedTab={!!views.length && !!statusStats}
        >
            {views.map((view) => (
                <PageTab
                    key={view.view_id}
                    label={(
                        <Stack
                            direction="row"
                            gap={2}
                            onClick={(event) => onClick(event, view)}
                            alignItems="center"
                        >
                            <Box
                                component="span"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                alignItems="center"
                                justifyContent="center"
                                fontWeight={600}
                                gap={1}
                                sx={{
                                    svg: {
                                        fill: (theme) =>
                                            theme.palette.semantic.foreground.brand.primary
                                    }
                                }}
                            >
                                {MANIFESTS_VIEWS_ICON_CONFIG[view.type]}
                                <Typography
                                    fontSize="inherit"
                                    fontWeight="inherit"
                                    color="inherit"
                                >
                                    {view.name}
                                </Typography>
                            </Box>
                            {tabsCount && typeof tabsCount[view.type] === 'number' && (
                                <CountBadge
                                    count={tabsCount[view.type]}
                                    isSelected={selectedViewId === view.view_id}
                                />
                            )}
                        </Stack>
                    )}
                    value={view.view_id}
                    {...(!defaultViewsList.includes(view.type)
                        ? {
                            icon: (
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        updateView(event, view);
                                    }}
                                    sx={{
                                        zIndex: 1000
                                    }}
                                    aria-label="Update view"
                                >
                                    <ArrowDropDownIcon fontSize="medium" />
                                </IconButton>
                            )
                        }
                        : {})}
                    iconPosition="end"
                />
            ))}
        </PageTabs>
    );
}
