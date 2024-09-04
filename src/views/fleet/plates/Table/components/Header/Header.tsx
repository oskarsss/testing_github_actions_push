import AddIcon from '@mui/icons-material/Add';
import { default_plates_filters, usePlates } from '@/store/fleet/plates/hooks';
import Views from '@/views/fleet/plates/Table/components/Header/Views';
import { TestIDs } from '@/configs/tests';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import PageSwitcher from '@/views/fleet/plates/components/PageSwitcher/PageSwitcher';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import Search from './Search';
import { useAddPlateDialog } from '../../../dialogs/AddPlate/AddPlate';

export default function PlatesHeader() {
    const addPlateDialog = useAddPlateDialog();
    const {
        filter_id,
        filters,
        isLoading,
        selected_filters
    } = usePlates();

    const add = () => addPlateDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageSwitcher />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="plates"
                        isNotImplemented
                    />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="PLATES_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        testID={TestIDs.pages.fleetPlates.buttons.addPlate}
                        onClick={add}
                        title="common:actions.add_plate"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={(
                <FiltersContainer>
                    <Filters
                        default_filters={default_plates_filters}
                        filter_id={filter_id}
                        filters={filters}
                    />
                </FiltersContainer>
            )}
            bottomRight={
                !isLoading ? (
                    <>
                        <SwitchFilter
                            label="plates:header.filters.equipment_inactive.label"
                            filterType="equipment_inactive"
                            filterId={filter_id}
                            selectedFilters={selected_filters}
                            isLocalFilter
                        />
                        <PageHeadersKit.Buttons.ClearFilter
                            filter_id={filter_id}
                            selected_filters={selected_filters}
                            default_filters={default_plates_filters}
                        />
                    </>
                ) : (
                    <div />
                )
            }
        />
    );
}
