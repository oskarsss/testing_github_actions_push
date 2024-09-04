import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { type ChangeEvent, useState } from 'react';
import { useDrivers } from '@/store/fleet/drivers/hooks';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useCreateDriverDialog } from '@/views/fleet/drivers/dialogs/CreateDriver';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import DriverOption from '../options/DriverOption';
import PrimaryCheckbox from '../components/PrimaryCheckbox';
import AssignComponent from '../AssignComponent';

export const useAssignDriverToTruckMenu = menuHookFabric(AssignDriverToTruck, {
    cleanContentOnClose: true
});

export const useAssignDriverToTruckDialog = hookFabric(AssignDriverToTruck, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="max-content"
        turnOffCloseButton
        keepMounted
        padding="0px"
        {...props}
    />
));

type Props = {
    truckId: string;
    title?: IntlMessageKey;
    referenceId: string;
    isDialog?: boolean;
    isPrimaryDriverSelect?: boolean;
    requestMessages?: {
        loading: IntlMessageKey;
        success: IntlMessageKey;
    };
};

function AssignDriverToTruck({
    truckId,
    title = 'core:assign_menu.driver_to_truck.title',
    referenceId,
    isDialog = false,
    isPrimaryDriverSelect = false,
    requestMessages = {
        loading: 'core:assign_menu.driver_to_truck.message.loading',
        success: 'core:assign_menu.driver_to_truck.message.success'
    }
}: Props) {
    const { t } = useAppTranslation();
    const [primary, setPrimary] = useState<boolean>(isPrimaryDriverSelect);
    const [assignDriverToTruck, { isLoading }] = TrucksGrpcService.useAssignDriverToTruckMutation();
    const { driversList } = useDrivers();
    const assignDriverToTruckMenu = useAssignDriverToTruckMenu(true);
    const assignDriverToTruckDialog = useAssignDriverToTruckDialog(true);
    const createDriverDialog = useCreateDriverDialog();

    const modal = isDialog ? assignDriverToTruckDialog : assignDriverToTruckMenu;

    const openCreateDriverDialog = () => {
        createDriverDialog.open({});
    };

    const handleSubmit = (driverId: string) => {
        assignDriverToTruck({
            truckId,
            driverId,
            primary
        }).unwrap();

        modal.close();
    };

    const filteredDrivers = getFilteredData(driversList, TypeParams.DRIVER);

    const handlePrimaryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrimary(event.target.checked);
    };

    return (
        <AssignComponent
            title={title}
            titleTranslationOptions={{ referenceId }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:drivers"
            options={filteredDrivers}
            OptionComponent={DriverOption}
            onClose={modal.close}
            optionHelpers={{
                getOptionId   : (option) => option.driverId,
                getOptionLabel: (option) => `${option.firstName} ${option.lastName}`
            }}
            onAdd={openCreateDriverDialog}
            noOptionsText="core:assign_menu.create_by_entity.create_driver"
        >
            {filteredDrivers.length > 0 && !isPrimaryDriverSelect && (
                <PrimaryCheckbox
                    checked={primary}
                    onChange={handlePrimaryChange}
                />
            )}
        </AssignComponent>
    );
}
