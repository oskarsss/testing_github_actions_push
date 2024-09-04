import { ManifestsIcon } from '@/@core/icons/custom-nav-icons/icons';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import React, { memo, useEffect } from 'react';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import {
    createManifestViewAction,
    updateManifestsViewAction
} from '@/store/dispatch/manifests/actions/views';
import { useAppDispatch } from '@/store/hooks';
import DateRange from '@/@core/components/data-range/DateRange';
import SortByFilter from '@/@core/components/filters/sort-by-filter/SortByFilter';
import AddIcon from '@mui/icons-material/Add';
import { useOptionsHeaderButtonNew } from '@/views/dispatch/manifests/modals/options-header-button-new/OptionsHeaderButtonNew';
import { ManifestView } from '@/store/dispatch/manifests/models';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import ManifestsSearchAutocomplete from './SearchAutocomplete';
import { ManifestsViews } from './Views';
import FiltersControl from './filters-control';
import MANIFEST_SORT_BY_OPTIONS from './sort-by-option';
import Filters from './Filters';

function Header() {
    const {
        filter_id,
        selectView,
        selected_filters,
        selected_view_id,
        view,
        views
    } =
        useManifestsFilters();

    const dispatch = useAppDispatch();
    const optionsMenu = useOptionsHeaderButtonNew();

    const createViewAction = (view: ManifestView) => {
        dispatch(createManifestViewAction(view));
        selectView(view.view_id);
    };

    useEffect(() => {
        const defaultViewId = views[0].view_id;
        if (!selected_view_id && defaultViewId) {
            selectView(defaultViewId);
        }
    }, [selected_view_id]);

    const updateViewAction = (view: ManifestView) => {
        dispatch(updateManifestsViewAction(view));
    };

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        optionsMenu.open({})(event);
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<ManifestsIcon />}
                        title="pages:manifests"
                    />
                    <ManifestsSearchAutocomplete />
                    <ManifestsViews />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        onClick={handleCreate}
                        icon={<AddIcon />}
                        title="common:new"
                        sx={{ minWidth: 'auto' }}
                    />
                </>
            )}
            bottomLeft={(
                <>
                    <DateRange
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        defaultStartAt={manifestDefaultFilters.start_at}
                        defaultEndAt={manifestDefaultFilters.end_at}
                    />
                    <PageHeadersKit.Divider />
                    <FiltersContainer>
                        <Filters />
                    </FiltersContainer>
                    <SortByFilter
                        defaultFilters={manifestDefaultFilters}
                        options={MANIFEST_SORT_BY_OPTIONS}
                        filter_id={filter_id}
                        updateType="redux"
                        selected_filters={selected_filters}
                    />
                </>
            )}
            bottomRight={(
                <FiltersControl
                    view={view}
                    filter_id={filter_id}
                    selected_filters={selected_filters}
                    selected_view_id={selected_view_id}
                    createViewAction={createViewAction}
                    updateViewAction={updateViewAction}
                />
            )}
        />
    );
}

export default memo(Header);
