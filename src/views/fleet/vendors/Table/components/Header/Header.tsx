/* eslint-disable react/jsx-no-useless-fragment */
import AddIcon from '@mui/icons-material/Add';
import { TestIDs } from '@/configs/tests';
import Views from '@/views/fleet/vendors/Table/components/Header/Views';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import { default_vendors_filters, useVendors } from '@/store/fleet/vendors/hooks';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { VendorIcon } from '@/@core/icons/custom-nav-icons/icons';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';
import Search from './Search';
import { useAddVendorDialog } from '../../../dialogs/AddVendor/AddVendor';

const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    company, // this icon is not used for filters vendor
    ...custom_icons_for_filters
} = ENTITY_CHIP_ICONS;

export default function VendorsHeader() {
    const {
        filter_id,
        filters,
        selected_filters
    } = useVendors();

    const addVendorDialog = useAddVendorDialog();
    const editVendorDialog = useEditVendorDialog();

    const add = () => {
        addVendorDialog.open({
            onAdded: (vendor_id) => {
                editVendorDialog.open({ vendor_id });
            }
        });
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<VendorIcon />}
                        title="entity:vendors"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="vendors"
                        isNotImplemented
                    />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="VENDORS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        onClick={add}
                        testID={TestIDs.pages.fleetVendors.buttons.addVendor}
                        title="common:actions.add_vendor"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={(
                <FiltersContainer>
                    <Filters
                        default_filters={default_vendors_filters}
                        filter_id={filter_id}
                        filters={filters}
                    />
                </FiltersContainer>
            )}
            bottomRight={(
                <>
                    <SwitchFilter
                        label="vendors:header.filters.tax_id.label"
                        filterType="hasNoTaxId"
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        isLocalFilter
                    />
                    <PageHeadersKit.Buttons.ClearFilter
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        default_filters={default_vendors_filters}
                    />
                </>
            )}
        />
    );
}
