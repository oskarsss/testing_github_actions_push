import { memo } from 'react';
import { TestIDs } from '@/configs/tests';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import TruckMarkup from '@/views/fleet/drivers/Details/components/Right/components/Truck/TruckMarkup/TruckMarkup';
import { useAssignTruckToDriverDialog } from '@/@core/components/assign/modals/AssignTruckToDriver';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useTruckByDriverId } from '@/store/storage/trucks/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';

type Props = {
    driver: DriverModel_Driver;
};

const Truck = ({ driver }: Props) => {
    const assignTruckToDriverDialog = useAssignTruckToDriverDialog();
    const confirm = useConfirm();
    const truck = useTruckByDriverId(driver.driverId || '');
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);

    const [removeDriverFromTruck] = TrucksGrpcService.useRemoveDriverFromTruckMutation();

    const selectTruck = () => {
        assignTruckToDriverDialog.open({
            driverId : driver.driverId,
            firstName: driver.firstName,
            isDialog : true
        });
    };

    const removeTruck = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'drivers:profile.right.truck.dialog.unassign_truck.title',
            body              : 'drivers:profile.right.truck.dialog.unassign_truck.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    referenceId: truck?.referenceId || ''
                }
            },
            onConfirm: () => {
                if (!truck) return;

                removeDriverFromTruck({
                    truckId : truck.truckId,
                    driverId: driver.driverId
                }).unwrap();
            }
        });
    };

    return (
        <TruckMarkup
            truck_id={truck?.truckId || ''}
            onSelect={selectTruck}
            truck={truck}
            isLoading={isLoading}
            removeTruck={removeTruck}
            disabledAssign={driver.status === DriverModel_Status.DELETED}
            testOptions={{
                assignTestId: TestIDs.pages.driverProfile.buttons.assignTruck,
                removeTestId: TestIDs.pages.driverProfile.buttons.removeTruck
            }}
        />
    );
};

export default memo(Truck);
