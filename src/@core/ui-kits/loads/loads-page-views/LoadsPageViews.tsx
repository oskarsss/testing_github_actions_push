/* eslint-disable no-case-declarations */
import { MouseEvent, useCallback } from 'react';
import { useEditViewMenu } from '@/@core/ui-kits/loads/loads-page-views/edit-view-filter/EditViewFilter';
import PageTabs, { PageTabsChangeAction } from '@/@core/ui-kits/basic/page-tabs/PageTabs';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    default_loads_filters,
    defaultActiveView,
    defaultViewFilters,
    LOADS_VIEW_TYPES,
    LoadsView
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { LoadStatuses } from '@/models/loads/load';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import LOADS_VIEWS_ICON_CONFIG from './loads-views-icon-config';

export type UpdateViewsAction = (views: LoadsView[]) => void;
export type DeleteViewAction = (viewId: string) => void;
export type UpdateViewAction = (view: LoadsView) => void;

type Props = {
    views: LoadsView[];
    selectedViewId: string;
    selectView: (id: string) => void;
    updateViewsAction: UpdateViewsAction;
    deleteViewAction: DeleteViewAction;
    currentView?: LoadsView | null;
    filterId: string;
};

export default function LoadsPageViews({
    views,
    selectView,
    selectedViewId,
    deleteViewAction,
    updateViewsAction,
    currentView,
    filterId: filter_id
}: Props) {
    const menuEditView = useEditViewMenu();

    const updateView = (event: MouseEvent<HTMLButtonElement>, view: LoadsView) => {
        menuEditView.open({
            view,
            deleteViewAction,
            updateViewsAction,
            views
        })(event);
    };
    const updateFilters = useUpdateFilters({ filter_id });

    const selectViewHandler: PageTabsChangeAction<string> = useCallback(
        (_, id) => {
            selectView(id);
        },
        [selectView]
    );

    const onClick = (event: MouseEvent<HTMLDivElement>, view: LoadsView) => {
        if (event.detail === 2 && view.view_id === currentView?.view_id) {
            let filters;

            switch (view.type) {
            case LOADS_VIEW_TYPES.DEFAULT_ACTIVE:
                updateFilters(defaultActiveView.filters);
                break;

            case LOADS_VIEW_TYPES.BROKER:
                // TODO: VLAD  - Set primary filters to view structure
                const brokerId = view.view_id.split('_')[1];
                filters = {
                    ...defaultViewFilters,
                    broker: [brokerId]
                };
                updateFilters(filters);
                break;

            case LOADS_VIEW_TYPES.CUSTOMER:
                const customerId = view.view_id.split('_')[1];
                filters = {
                    ...defaultViewFilters,
                    user: [customerId]
                };
                updateFilters(filters);
                break;

            case LOADS_VIEW_TYPES.TRUCK:
                const truckId = view.view_id.split('_')[1];
                filters = {
                    ...defaultViewFilters,
                    truck      : [truckId],
                    load_status: [
                        LoadStatuses.PENDING,
                        LoadStatuses.ASSIGNED,
                        LoadStatuses.IN_PROGRESS
                    ]
                };
                updateFilters(filters);
                break;

            default:
                updateFilters(default_loads_filters);
                break;
            }
        }
    };

    return (
        <PageTabs
            value={selectedViewId}
            isScrollable
            onChange={selectViewHandler}
            scrollToSelectedTab
        >
            {views.map((view) => (
                <PageTab
                    onClick={(event) => onClick(event, view)}
                    key={view.view_id}
                    label={(
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
                                    fill: (theme) => theme.palette.semantic.foreground.brand.primary
                                }
                            }}
                        >
                            {LOADS_VIEWS_ICON_CONFIG[view.type]}
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                {view.name}
                            </Typography>
                        </Box>
                    )}
                    value={view.view_id}
                    {...(view.type !== LOADS_VIEW_TYPES.DEFAULT &&
                    view.type !== LOADS_VIEW_TYPES.DEFAULT_ACTIVE
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
