import AddIcon from '@mui/icons-material/Add';
import { default_trailers_filter, useTrailers } from '@/store/fleet/trailers/hooks';
import { TestIDs } from '@/configs/tests';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import BusinessIcon from '@mui/icons-material/Business';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import navigateToPage from '@/utils/navigateToPage';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { useAddTrailerDialog } from '../../../dialogs/AddTrailer/AddTrailer';
import Search from './Search';
import PageSwitcher, { View } from './PageSwitcher';
import Views from './Views';

const VIEWS: View[] = [
    {
        view_id: '0',
        name   : 'entity:trailers',
        icon   : TrailerIcon(),
        testID : TestIDs.pages.fleetTrailers.buttons.trailers
    },
    {
        view_id: '1',
        name   : 'entity:companies',
        icon   : <BusinessIcon color="action" />,
        testID : TestIDs.pages.fleetTrailers.buttons.companies
    }
];
const SELECTED_VIEW_ID = '0';
const PATH = '/trailers/companies';

export default function TrailersHeader() {
    const addTrailerDialog = useAddTrailerDialog();
    const editTrailerDialog = useEditTrailerDialog();

    const {
        filters,
        filter_id,
        selected_filters,
        isLoading
    } = useTrailers();

    const selectView = (view_id: string) => {
        if (view_id !== SELECTED_VIEW_ID) {
            navigateToPage(PATH);
        }
    };

    const onOpenAddTrailerDialog = () => {
        addTrailerDialog.open({
            onSuccessfulCreate: (trailer_id) => {
                editTrailerDialog.open({ trailer_id });
            }
        });
    };

    const bottomRight = (
        <PageHeadersKit.Buttons.ClearFilter
            filter_id={filter_id}
            selected_filters={selected_filters}
            default_filters={default_trailers_filter}
        />
    );

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <div>
                        <PageSwitcher
                            views={VIEWS}
                            selectView={selectView}
                            selected_view_id={SELECTED_VIEW_ID}
                        />
                    </div>
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="trailers"
                        testID={TestIDs.pages.fleetTrailers.buttons.import}
                    />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="TRAILERS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        onClick={onOpenAddTrailerDialog}
                        testID={TestIDs.pages.fleetTrailers.buttons.addTrailer}
                        title="common:actions.add_trailer"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={(
                <>
                    <FiltersContainer>
                        <Filters
                            default_filters={default_trailers_filter}
                            filter_id={filter_id}
                            filters={filters}
                            loading={isLoading}
                            skeleton_count={6}
                        />
                    </FiltersContainer>
                    <PageHeadersKit.TimeRange
                        filter_id={filter_id}
                        year={selected_filters.year}
                        field="trailer_year"
                    />
                </>
            )}
            bottomRight={bottomRight}
        />
    );
}
