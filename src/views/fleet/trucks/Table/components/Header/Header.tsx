import AddIcon from '@mui/icons-material/Add';
import { default_trucks_filters, useTrucks } from '@/store/fleet/trucks/hooks';
import { TestIDs } from '@/configs/tests';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { FilterComponentsMap } from '@/@core/components/filters/types';
import { $Filter } from '@/@core/components/filters/utils';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import Views from './Views';
import { useAddTruckDialog } from '../../../dialogs/AddTruck/AddTruck';
import Search from './Search';

const filterComponents: FilterComponentsMap = {
    truck_year: ({
        filter_id,
        value
    }) => (
        <PageHeadersKit.TimeRange
            filter_id={filter_id}
            year={value as number[]}
            field="truck_year"
        />
    )
};

const filterLables = $Filter.labelsConfig({
    trailer_type: 'entity:trailer_type',
    truck_users : 'entity:users'
});

export default function TrucksHeader() {
    const addTruckDialog = useAddTruckDialog();
    const editTruckDialog = useEditTruckDialog();

    const {
        filters,
        filter_id,
        selected_filters
    } = useTrucks();

    const onOpenAddTruckDialog = () => {
        addTruckDialog.open({
            onSuccessfulCreate: (truck_id) => {
                editTruckDialog.open({ truck_id });
            }
        });
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<TrucksIcon />}
                        title="entity:trucks"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="trucks"
                        testID={TestIDs.pages.fleetTrucks.buttons.import}
                    />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="TRUCKS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        title="common:actions.add_truck"
                        testID={TestIDs.pages.fleetTrucks.buttons.addTruck}
                        onClick={onOpenAddTruckDialog}
                        icon={<AddIcon fontSize="medium" />}
                    />
                </>
            )}
            bottomLeft={(
                <FiltersContainer>
                    <Filters
                        default_filters={default_trucks_filters}
                        filter_id={filter_id}
                        filters={filters}
                        componentsConfig={filterComponents}
                        labelsConfig={filterLables}
                    />
                </FiltersContainer>
            )}
            bottomRight={(
                <PageHeadersKit.Buttons.ClearFilter
                    filter_id={filter_id}
                    selected_filters={selected_filters}
                    default_filters={default_trucks_filters}
                />
            )}
        />
    );
}
