import { useMemo } from 'react';
import { Fade } from '@mui/material';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import GPSTracking from '@/views/fleet/trailers/Details/components/Right/components/GPSTracking/GPSTracking';
import AssignedUsers from '@/views/fleet/drivers/Details/components/Right/components/AssignedUsers';
import { TestIDs } from '@/configs/tests';
import TruckIcon from '@/views/fleet/drivers/Details/components/Center/tabs/Map/icons/truck_icon.png';
import PrimaryDriverPartner from '@/views/fleet/trucks/Details/components/Right/components/DriverPartners/PrimaryDriverPartner';
import { useTruckLocation } from '@/store/streams/events/hooks';
import Profiles from '@/@core/ui-kits/profiles';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useAssignDriverToTruckDialog } from '@/@core/components/assign/modals/AssignDriverToTruck';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useUsersMap } from '@/store/hash_maps/hooks';
import DriverPartners from './components/DriverPartners/DriverPartners';
import Trailer from './components/Trailer/Trailer';

type Drivers = {
    primaryDriverId: string;
    secondaryDriversIds: string[];
};

type Props = {
    truck: TruckModel_Truck;
};

export default function Right({ truck }: Props) {
    const truckLocation = useTruckLocation(truck.truckId);
    const assignDriverToTruckDialog = useAssignDriverToTruckDialog();
    const [removeUserFromTruck] = TrucksGrpcService.useRemoveUserFromTruckMutation();
    const [removeDriverFromTruck] = TrucksGrpcService.useRemoveDriverFromTruckMutation();
    const usersMap = useUsersMap();

    const usersList = useMemo(
        () => truck.users.map((userId) => usersMap[userId]),
        [truck.users, usersMap]
    );

    const [updateTruckParkingLocation, {
        isLoading,
        isSuccess,
        reset
    }] =
        TrucksGrpcService.endpoints.updateTruckParkingLocation.useMutation();

    const selectDriver = (isPrimaryDriverSelect: boolean) => {
        assignDriverToTruckDialog.open({
            truckId    : truck.truckId,
            referenceId: truck.referenceId,
            isDialog   : true,
            isPrimaryDriverSelect
        });
    };

    const split_drivers = useMemo(
        () =>
            truck.drivers.reduce<Drivers>(
                (acc, driver) => {
                    if (driver.primary) {
                        acc.primaryDriverId = driver.driverId;
                    } else {
                        acc.secondaryDriversIds.push(driver.driverId);
                    }
                    return acc;
                },
                {
                    primaryDriverId    : '',
                    secondaryDriversIds: []
                }
            ),
        [truck.drivers]
    );

    const updateGarageLocation = (parkingLocation: string) => {
        updateTruckParkingLocation({
            truckId: truck.truckId,
            parkingLocation
        });
    };

    const onRemoveUserFromTruck = ({
        id,
        user_id
    }: { id: string; user_id: string }) =>
        removeUserFromTruck({
            truckId: id,
            userId : user_id
        }).unwrap();

    const showOtherDrivers =
        split_drivers.secondaryDriversIds.length > 0 || split_drivers.primaryDriverId;

    return (
        <Fade in>
            <RightStyled.Container>
                <RightStyled.Box>
                    <PrimaryDriverPartner
                        id={truck.truckId}
                        primaryDriverId={split_drivers.primaryDriverId}
                        onSelect={selectDriver}
                        onRemove={removeDriverFromTruck}
                    />

                    {showOtherDrivers && (
                        <DriverPartners
                            id={truck.truckId}
                            drivers={split_drivers.secondaryDriversIds}
                            onSelect={selectDriver}
                            onRemove={removeDriverFromTruck}
                            testOptions={{
                                assignTestId: TestIDs.pages.truckProfile.buttons.assignDriver,
                                removeTestId: TestIDs.pages.truckProfile.buttons.removeDriver
                            }}
                        />
                    )}

                    <Trailer truck={truck} />

                    <Profiles.GarageLocation
                        isSuccess={isSuccess}
                        reset={reset}
                        isLoading={false}
                        onUpdateLocation={updateGarageLocation}
                        parking_location={truck.parkingLocation}
                        testOptions={{
                            garageLocation: TestIDs.pages.truckProfile.fields.garageLocation,
                            saveGarageLocation:
                                TestIDs.pages.truckProfile.buttons.saveGarageLocation
                        }}
                    />

                    <GPSTracking
                        lat={truckLocation?.lat}
                        lon={truckLocation?.lon}
                        integration_provide_id={truckLocation?.integrationProviderId}
                        timestamp={truckLocation?.timestamp}
                        icon={TruckIcon.src}
                    />

                    <AssignedUsers
                        id={truck.truckId}
                        users={usersList}
                        onRemove={onRemoveUserFromTruck}
                        testOptions={{
                            assignTestId : TestIDs.pages.truckProfile.buttons.assignUser,
                            confirmTestId: TestIDs.pages.truckProfile.buttons.confirmAssignUser,
                            userTestId   : TestIDs.pages.truckProfile.fields.user
                        }}
                    />
                </RightStyled.Box>
            </RightStyled.Container>
        </Fade>
    );
}
