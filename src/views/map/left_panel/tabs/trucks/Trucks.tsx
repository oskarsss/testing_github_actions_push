import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { default_map_trucks_filters, useMapTrucks } from '@/views/map/hooks/trucks';
import { filter_id } from '@/views/map/left_panel/components/Filters/TruckFilters';
import { useAddTruckDialog } from '@/views/fleet/trucks/dialogs/AddTruck/AddTruck';
import Loading from '@/@core/components/page/Loading';
import EmptyScreen from '@/views/map/left_panel/components/EmptyScreen/EmptyScreen';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import TruckItem from './TruckItem';

export default function Trucks() {
    const {
        trucks,
        isLoading
    } = useMapTrucks();
    const addTruckDialog = useAddTruckDialog();
    const editTruckDialog = useEditTruckDialog();
    const driversMap = useDriversMap();
    const trailerMap = useTrailersMap();
    const search = useAppSelector((state) => state.map.search.trucks);

    const filteredTrucks = useMemo(() => {
        const serializedSearch = search.trim().toLowerCase();
        if (!serializedSearch) {
            return trucks;
        }

        return trucks.filter((truck) => {
            const driverId = truck.drivers[0]?.driverId || '';
            const driver = driversMap[driverId];
            const trailer = trailerMap[truck.trailerId];
            return `${truck.referenceId} ${`${driver.firstName} ${driver.lastName}` || ''} ${
                trailer?.referenceId || ''
            }`
                .toLowerCase()
                .includes(serializedSearch);
        });
    }, [driversMap, search, trailerMap, trucks]);

    if (isLoading) {
        return <Loading />;
    }

    if (!filteredTrucks.length) {
        const onOpenAddTruckDialog = () => {
            addTruckDialog.open({
                onSuccessfulCreate: (truck_id) => {
                    editTruckDialog.open({ truck_id });
                }
            });
        };

        return (
            <EmptyScreen
                tableName="trucks"
                rows={filteredTrucks}
                onCreateItem={onOpenAddTruckDialog}
                filter_id={filter_id}
                search={search}
                defaultFilters={default_map_trucks_filters}
            />
        );
    }

    return (
        <>
            {filteredTrucks.map((truck) => (
                <TruckItem
                    key={truck.truckId}
                    truck={truck}
                />
            ))}
        </>
    );
}
