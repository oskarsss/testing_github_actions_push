import Search from '@/views/dispatch/orders/main/header/components/LoadsSearchAutocomplete';
import LoadsFilterControl, {
    CreateViewAction
} from '@/@core/ui-kits/loads/loads-filters-control/LoadsFilterControl';
import LoadsPageViews, {
    DeleteViewAction,
    UpdateViewsAction
} from '@/@core/ui-kits/loads/loads-page-views/LoadsPageViews';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import SortByFilter from '@/@core/components/filters/sort-by-filter/SortByFilter';
import LoadFilterSelect from '@/views/dispatch/orders/main/header/components/LoadFilterSelect';
import DateRange from '@/@core/components/data-range/DateRange';
import {
    default_loads_filters,
    DEFAULT_LOADS_VIEW_IDS,
    LoadsView
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import {
    useOrdersPageData,
    useOrdersPageFilters
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    createLoadViewAction,
    deleteLoadViewAction,
    setDaysLinesTypeAction,
    toggleShowDaysLinesAction,
    updateLoadViewAction,
    updateLoadViewsAction
} from '@/store/dispatch/loads/actions';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import LOAD_SORT_BY_OPTIONS from './loads-sort-by-options';

export default function LoadsHeader() {
    const dispatch = useAppDispatch();
    const {
        filter_id,
        selected_filters,
        selectView,
        selected_view_id,
        views,
        view
    } =
        useOrdersPageFilters();

    const { filters } = useOrdersPageData();

    const toggleDaysLines = () => {
        dispatch(toggleShowDaysLinesAction());
    };

    const showDaysLines = useAppSelector((state) => state.loads.settings.showDaysLines);
    const daysLinesType = useAppSelector((state) => state.loads.settings.daysLinesType);

    const deleteViewAction: DeleteViewAction = (viewId) => {
        selectView(DEFAULT_LOADS_VIEW_IDS.DEFAULT);
        dispatch(deleteLoadViewAction(viewId));
    };

    const updateViewAction = (view: LoadsView) => {
        dispatch(updateLoadViewAction(view));
    };

    const updateViewsAction: UpdateViewsAction = (views) => {
        dispatch(updateLoadViewsAction(views));
    };

    const createViewAction: CreateViewAction = (view) => {
        dispatch(createLoadViewAction(view));

        selectView(view.view_id);
    };

    const updateDaysLinesTypeAction = (type: DayLinesType) => {
        dispatch(setDaysLinesTypeAction(type));
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <Search />
                    <LoadsPageViews
                        filterId={filter_id}
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
                            isShowSelectType: false,
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
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        defaultStartAt={default_loads_filters.start_at}
                        defaultEndAt={default_loads_filters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <LoadFilterSelect />
                    <SortByFilter
                        defaultFilters={default_loads_filters}
                        updateType="redux"
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        options={LOAD_SORT_BY_OPTIONS}
                    />
                </>
            )}
            bottomRight={(
                <LoadsFilterControl
                    showDaysLines={showDaysLines}
                    toggleDaysLines={toggleDaysLines}
                    createViewAction={createViewAction}
                    filter_id={filter_id}
                    filters={filters}
                    selected_filters={selected_filters}
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
