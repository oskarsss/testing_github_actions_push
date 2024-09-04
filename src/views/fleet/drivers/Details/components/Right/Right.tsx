import { Fade } from '@mui/material';
import MobileApp from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/MobileApp';
import AssignedUsers from '@/views/fleet/drivers/Details/components/Right/components/AssignedUsers';
import { TestIDs } from '@/configs/tests';
import GPSTracking from '@/views/fleet/drivers/Details/components/Right/components/GPSTraking/GPSTracking';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { useUsersMap, useVendorsMap } from '@/store/hash_maps/hooks';
import { useTruckByDriverId } from '@/store/storage/trucks/hooks/common';
import DriverPartners from './components/DriverPartners/DriverPartners';
import RightStyled from './styled';
import Truck from './components/Truck/Truck';
import DriverPayment from './components/BankInformation';
import Vendor from './components/Vendor';
import PinnedNote from './components/PinnedNote';

type Props = {
    driver: DriverModel_Driver;
};

export default function Right({ driver }: Props) {
    const [removeUser] = DriversGrpcService.useRemoveUserFromDriverMutation();
    const vendor = useVendorsMap(driver.vendorId || '');
    const usersMap = useUsersMap();
    const truck = useTruckByDriverId(driver.driverId);
    const drivers = truck?.drivers?.filter((d) => d.driverId !== driver.driverId);
    const usersList = driver.users.map((user) => usersMap[user.userId]);
    const onRemove = (data: { id: string; user_id: string }) =>
        removeUser({
            driverId: data.id,
            userId  : data.user_id
        });

    return (
        <Fade in>
            <RightStyled.Container>
                <RightStyled.Box>
                    <Truck driver={driver} />

                    <DriverPartners drivers={drivers || []} />

                    <Vendor
                        id={driver.driverId}
                        vendor_id={vendor ? driver.vendorId : ''}
                        name={vendor ? vendor.name : ''}
                        disabledAssign={driver.status === DriverModel_Status.DELETED}
                    />

                    <DriverPayment
                        driverId={driver.driverId}
                        disabledAddNewBank={driver.status === DriverModel_Status.DELETED}
                    />

                    <MobileApp driver={driver} />

                    <GPSTracking id={driver.driverId} />

                    <AssignedUsers
                        type="driver"
                        id={driver.driverId}
                        users={usersList}
                        onRemove={onRemove}
                        disabledAssign={driver.status === DriverModel_Status.DELETED}
                        testOptions={{
                            assignTestId : TestIDs.pages.driverProfile.buttons.assignUser,
                            confirmTestId: TestIDs.pages.driverProfile.buttons.confirmAssignUser,
                            userTestId   : TestIDs.pages.driverProfile.fields.user
                        }}
                    />

                    <PinnedNote
                        id={driver.driverId}
                        note={driver.note}
                    />
                </RightStyled.Box>
            </RightStyled.Container>
        </Fade>
    );
}
