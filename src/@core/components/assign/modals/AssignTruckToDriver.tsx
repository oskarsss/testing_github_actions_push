import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useActiveConvertTrucks } from '@/store/fleet/trucks/hooks';
import { useAddTruckDialog } from '@/views/fleet/trucks/dialogs/AddTruck/AddTruck';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useMemo } from 'react';
import { TruckStatuses } from '@/models/fleet/trucks/truck-status';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { useAppSelector } from '@/store/hooks';
import { TruckModel_Status } from '@proto/models/model_truck';
import TruckOption from '../options/TruckOption';
import AssignComponent from '../AssignComponent';

export const useAssignTruckToDriverMenu = menuHookFabric(AssignTruckToDriver, {
    cleanContentOnClose: true
});

export const useAssignTruckToDriverDialog = hookFabric(AssignTruckToDriver, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="max-content"
        turnOffCloseButton
        keepMounted
        padding="0px"
        {...props}
    />
));

type Props = {
    driverId: string;
    firstName: string;
    isDialog?: boolean;
};

const activeTruckStatuses = [
    TruckModel_Status.onboarding,
    TruckModel_Status.active,
    TruckModel_Status.inactive,
    TruckModel_Status.pending_termination
];

function AssignTruckToDriver({
    driverId,
    firstName,
    isDialog = false
}: Props) {
    const { t } = useAppTranslation();
    const [assignDriverToTruck, { isLoading }] = TrucksGrpcService.useAssignDriverToTruckMutation();
    const trucksList = useAppSelector(TrucksDataSelectors.getRows);
    const assignTruckToDriverMenu = useAssignTruckToDriverMenu(true);
    const assignTruckToDriverDialog = useAssignTruckToDriverDialog(true);
    const addTruckDialog = useAddTruckDialog();

    const modal = isDialog ? assignTruckToDriverDialog : assignTruckToDriverMenu;

    const openCreateTruckDialog = () => {
        addTruckDialog.open({});
    };

    const handleSubmit = (truckId: string) => {
        assignDriverToTruck({
            truckId,
            driverId,
            primary: true
        }).unwrap();
        modal.close();
    };

    const filteredTrucks = useMemo(
        () =>
            trucksList.filter(
                (truck) => activeTruckStatuses.includes(truck.status) && !truck.drivers?.length
            ),
        [trucksList]
    );

    return (
        <AssignComponent
            title="core:assign_menu.truck_to_driver.title"
            titleTranslationOptions={{ firstName }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trucks"
            options={filteredTrucks}
            OptionComponent={TruckOption}
            onClose={modal.close}
            optionHelpers={{
                getOptionId   : (option) => option.truckId,
                getOptionLabel: (option) =>
                    `#${option.referenceId} ${option.year} ${option.model} ${option?.make || ''}`
            }}
            onAdd={openCreateTruckDialog}
            noOptionsText="core:assign_menu.create_by_entity.create_truck"
        />
    );
}
