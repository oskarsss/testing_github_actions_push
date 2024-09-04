import PageHeadersKit from '@/@core/ui-kits/page-headers';
import TrackingSelectFilter from '@/views/dispatch/tracking/header/components/SelectFilter';
import SortByFilter from '@/@core/components/filters/sort-by-filter/SortByFilter';
import {
    useTrackingFilters,
    useTrackingPageData
} from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import DateRange from '@/@core/components/data-range/DateRange';
import {
    default_loads_filters,
    DEFAULT_LOADS_VIEW_IDS
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import LoadsPageViews, {
    DeleteViewAction,
    UpdateViewAction,
    UpdateViewsAction
} from '@/@core/ui-kits/loads/loads-page-views/LoadsPageViews';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    createTrackingViewAction,
    deleteTrackingViewAction,
    setDaysLinesTypeAction,
    toggleShowDaysLinesAction,
    updateTrackingViewAction,
    updateTrackingViewsAction
} from '@/store/dispatch/tracking/actions';
import LoadsFilterControl, {
    CreateViewAction
} from '@/@core/ui-kits/loads/loads-filters-control/LoadsFilterControl';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import TrackingSearchAutocomplete from './components/SearchAutocomplete';
import TRACKING_SORT_BY_OPTIONS from './tracking-sort-by-options';

export default function TrackingHeader() {
    const dispatch = useAppDispatch();
    const {
        filter_id: selectedFilterId,
        selected_filters: selectedFilters,
        selected_view_id,
        views,
        selectView,
        view
    } = useTrackingFilters();

    const toggleDaysLines = () => {
        dispatch(toggleShowDaysLinesAction());
    };

    const showDaysLines = useAppSelector((state) => state.tracking.settings.showDaysLines);
    const daysLinesType = useAppSelector((state) => state.tracking.settings.daysLinesType);

    const deleteViewAction: DeleteViewAction = (viewId: string) => {
        selectView(DEFAULT_LOADS_VIEW_IDS.DEFAULT);
        dispatch(deleteTrackingViewAction(viewId));
    };

    const updateViewAction: UpdateViewAction = (view) => {
        dispatch(updateTrackingViewAction(view));
    };

    const updateViewsAction: UpdateViewsAction = (views) => {
        dispatch(updateTrackingViewsAction(views));
    };

    const createViewAction: CreateViewAction = (view) => {
        dispatch(createTrackingViewAction(view));
        selectView(view.view_id);
    };

    const updateDaysLinesTypeAction = (type: DayLinesType) => {
        dispatch(setDaysLinesTypeAction(type));
    };

    const { filters } = useTrackingPageData();

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <TrackingSearchAutocomplete />
                    <LoadsPageViews
                        filterId={selectedFilterId}
                        currentView={view}
                        selectedViewId={selected_view_id}
                        updateViewsAction={updateViewsAction}
                        deleteViewAction={deleteViewAction}
                        selectView={selectView}
                        views={views}
                    />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.MoreImportAndExport
                        export_item={{
                            exporter_id: 'LOADS_EXPORTER',
                            filters
                        }}
                        import_item={{
                            category_id     : 'loads',
                            isNotImplemented: true
                        }}
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.CreateLoad />
                </>
            )}
            bottomLeft={(
                <>
                    <DateRange
                        filterId={selectedFilterId}
                        selectedFilters={selectedFilters}
                        defaultStartAt={default_loads_filters.start_at}
                        defaultEndAt={default_loads_filters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <TrackingSelectFilter />
                    <SortByFilter
                        updateType="redux"
                        defaultFilters={default_loads_filters}
                        filter_id={selectedFilterId}
                        selected_filters={selectedFilters}
                        options={TRACKING_SORT_BY_OPTIONS}
                    />
                </>
            )}
            bottomRight={(
                <LoadsFilterControl
                    toggleDaysLines={toggleDaysLines}
                    showDaysLines={showDaysLines}
                    filter_id={selectedFilterId}
                    createViewAction={createViewAction}
                    filters={filters}
                    selected_filters={selectedFilters}
                    selected_view_id={selected_view_id}
                    updateViewAction={updateViewAction}
                    view={view}
                    daysLinesType={daysLinesType}
                    setDaysLinesType={updateDaysLinesTypeAction}
                />
            )}
        />
    );
}
