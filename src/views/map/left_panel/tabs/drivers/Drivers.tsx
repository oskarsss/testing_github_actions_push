import { useMemo } from 'react';

import DriverItem from '@/views/map/left_panel/tabs/drivers/DriverItem';
import { useAppSelector } from '@/store/hooks';
import { map_drivers_default_filters, useMapDrivers } from '@/views/map/hooks/drivers';
import { driver_filter_id } from '@/views/map/left_panel/components/Filters/DriversFilters';
import { useCreateDriverDialog } from '@/views/fleet/drivers/dialogs/CreateDriver';
import Loading from '@/@core/components/page/Loading';
import ErrorDetailsPage from '@/@core/components/page/ErrorDetailsPage';
import EmptyScreen from '@/views/map/left_panel/components/EmptyScreen/EmptyScreen';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';

export default function Drivers() {
    const {
        drivers,
        isLoading
    } = useMapDrivers();
    const createDriverDialog = useCreateDriverDialog();
    const editDriverDialog = useEditDriverDialog();
    const search = useAppSelector((state) => state.map.search.drivers);

    const filteredDrivers = useMemo(() => {
        const serializedSearch = search.trim().toLowerCase();
        if (!serializedSearch) {
            return drivers;
        }

        return drivers.filter((driver) =>
            `${driver.firstName} ${driver.lastName} ${driver.driverType?.name || ''} ${
                driver.addressCity || ''
            } ${driver.addressPostalCode || ''} ${driver.phoneNumber || ''} ${driver.status || ''}`
                .toLowerCase()
                .includes(serializedSearch));
    }, [search, drivers]);

    if (isLoading) {
        return <Loading />;
    }

    // if (isError) {
    //     return (
    //         <ErrorDetailsPage
    //             buttonText="common:button.reload"
    //             onClick={refetch}
    //             error={error}
    //         />
    //     );
    // }

    if (!filteredDrivers?.length) {
        const onOpenAddDriverDialog = () => {
            createDriverDialog.open({
                onSuccessfulCreate: (driver_id) => {
                    editDriverDialog.open({ driver_id });
                }
            });
        };
        return (
            <EmptyScreen
                onCreateItem={onOpenAddDriverDialog}
                tableName="drivers"
                rows={filteredDrivers}
                filter_id={driver_filter_id}
                search={search}
                defaultFilters={map_drivers_default_filters}
            />
        );
    }

    return (
        <>
            {filteredDrivers.map((driver) => (
                <DriverItem
                    driver={driver}
                    key={driver.driverId}
                />
            ))}
        </>
    );
}
