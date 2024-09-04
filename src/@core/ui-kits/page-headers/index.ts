import HeaderTitle from '@/@core/ui-kits/page-headers/components/HeaderTitle';
import TimeRange from '@/@core/ui-kits/page-headers/components/TimeRange';
import DateRange from '@/@core/ui-kits/page-headers/components/DateRange';
import AvatarGroup from '@/@core/ui-kits/page-headers/components/AvatarGroup/Avatars';
import Header from '@/@core/ui-kits/page-headers/components/Header';
import Divider from '@/@core/ui-kits/page-headers/components/Divider';
import HeaderButtons from '@/@core/ui-kits/page-headers/components/HeaderButtons';

/**
 * ### Vektor Header All Components:
 * #### Header:
 * - `Header` - is a Main component.
 * - `Title` - is a Title has text and icon.
 * - `Divider` - is a Divider component.
 * - `AvatarGroup` - is a shows all users, avatars, name, last time they were online.
 * #### Buttons:
 * - `ClearFilter` - is a checks for filter changes and clears if clicked.
 * - `Export` - is opens the Export dialog.
 * - `Import` - is opens the Import dialog.
 * - `Primary` - is the Primary button has variant = 'contained' by default.
 * - `Secondary` - is the Secondary button has variant = 'outlined' by default.
 * #### DateRange:
 * - `DateRange` - is a DateRange with format="MM/DD/YYYY".
 * - `TimeRange` - is a TimeRange with format="yyyy".
 *
 * @example
 * <PageHeadersKit.Header
 *         topLeft={(
 *             <PageHeadersKit.Title icon={fuelIcon} title="Fuel" />
 *         )}
 *         topRight={(
 *             <>
 *                 <PageHeadersKit.AvatarGroup />
 *                 <PageHeadersKit.Buttons.Import processor_id="fuel" />
 *                 <PageHeadersKit.Buttons.Export exporter_id="fuel" />
 *                 <PageHeadersKit.Divider />
 *                 <PageHeadersKit.Buttons.Primary
 *                     title="Add Transaction"
 *                     onClick={handleAddButton}
 *                     icon={<AddIcon fontSize="medium" />}
 *                 />
 *             </>
 *         )}
 *         bottomLeft={(
 *            <>
 *                   <PageHeadersKit.DateRange
 *                      label="Created At"
 *                      field="created_at"
 *                      date={selected_filters.created_at}
 *                      filter_id={filter_id}
 *                  />
 *                 <PageHeadersKit.Divider />
 *                 <Filters
 *                     default_filters={default_fuel_filters}
 *                     filter_id={filter_id}
 *                     filters={filters}
 *                 />
 *             </>
 *         )}
 *         bottomRight={(
 *             <PageHeadersKit.Buttons.ClearFilter
 *                 filter_id={filter_id}
 *                 selected_filters={selected_filters}
 *                 default_filters={default_fuel_filters}
 *             />
 *         )}
 *     />
 */
const PageHeadersKit = {
    AvatarGroup,
    Buttons: HeaderButtons,
    DateRange,
    Divider,
    Header,
    TimeRange,
    Title  : HeaderTitle
};

export default PageHeadersKit;
