import AddIcon from '@mui/icons-material/Add';
import { default_drivers_filters, useDrivers } from '@/store/fleet/drivers/hooks';
import { useCreateDriverDialog } from '@/views/fleet/drivers/dialogs/CreateDriver';
import { TestIDs } from '@/configs/tests';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import YearsRange from '@/views/fleet/drivers/Table/components/Header/YearsRange';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { DriverIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useInviteDriverDialog } from '@/views/fleet/drivers/dialogs/InviteDriver/InviteDriver';
import { Stack } from '@mui/material';
import { FilterComponentsMap } from '@/@core/components/filters/types';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { useAppDispatch } from '@/store/hooks';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useRouter } from 'next/router';
import Search from './Search';
import Views from './Views';

const componentsConfig: FilterComponentsMap = {
    driver_hire_date: ({
        filter_id,
        value
    }) => (
        <PageHeadersKit.DateRange
            filterId={filter_id}
            date={value as string[]}
            labelStart="drivers:header.filters.hire_date.start"
            labelEnd="drivers:header.filters.hire_date.end"
            field="driver_hire_date"
        />
    ),
    driver_age: ({
        filter_id,
        value
    }) => (
        <YearsRange
            filter_id={filter_id}
            age={value as string[]}
            fieldKey="driver_age"
        />
    )
};

export default function DriversHeader() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {
        filters,
        filter_id,
        isLoading,
        selected_filters
    } = useDrivers();

    const createDriverDialog = useCreateDriverDialog();
    const inviteDriverDialog = useInviteDriverDialog();

    const add = () => {
        createDriverDialog.open({
            onSuccessfulCreate: (driver_id) => {
                router.push(`/drivers/${driver_id}`);
                dispatch(DriverActions.isShowEditDriverDialog(true));
            }
        });
    };

    const invite = () => inviteDriverDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<DriverIcon />}
                        title="entity:drivers"
                    />
                    <Search />
                    <Views />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import
                        category_id="drivers"
                        testID={TestIDs.pages.fleetDrivers.buttons.import}
                    />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="DRIVERS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Secondary
                        icon={(
                            <Stack
                                sx={{
                                    position: 'relative',
                                    top     : '-1px',

                                    svg: {
                                        width : '22px',
                                        height: '22px',
                                        fill  : ({ palette }) =>
                                            palette.semantic.foreground.brand.primary
                                    }
                                }}
                            >
                                <DriverIcon />
                            </Stack>
                        )}
                        onClick={invite}
                        title="common:actions.invite_driver"
                    />
                    <PageHeadersKit.Buttons.Primary
                        onClick={add}
                        testID={TestIDs.pages.fleetDrivers.buttons.addDriver}
                        title="common:actions.add_driver"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={(
                <FiltersContainer>
                    <Filters
                        default_filters={default_drivers_filters}
                        filter_id={filter_id}
                        filters={filters}
                        loading={isLoading}
                        componentsConfig={componentsConfig}
                    />
                </FiltersContainer>
            )}
            bottomRight={(
                <>
                    <SwitchFilter
                        label="fields:uninsured.label"
                        filterType="uninsured"
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        isLocalFilter
                        isNegative
                    />
                    <PageHeadersKit.Buttons.ClearFilter
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        default_filters={default_drivers_filters}
                    />
                </>
            )}
        />
    );
}
