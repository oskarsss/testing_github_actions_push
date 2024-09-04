import { menuHookFabric } from '@/utils/menu-hook-fabric';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useActiveConvertTrucks } from '@/store/fleet/trucks/hooks';
import AssignComponent from '../AssignComponent';
import TruckWithDriverOption from '../options/truck-with-driver/TruckWithDriverOption';

export const useAssignTruckMenu = menuHookFabric(AssignTruck, {
    cleanContentOnClose: true
});

type Props = {
    onTruckSelect: (id: string, type_id: string, reference_id: string) => void;
};

function AssignTruck({ onTruckSelect }: Props) {
    const { trucks } = useActiveConvertTrucks();
    const assignTruckMenu = useAssignTruckMenu(true);

    const handleSubmit = (truckId: string) => {
        const selectedTruck = trucks.find((truck) => truck.truckId === truckId);
        onTruckSelect(
            truckId,
            selectedTruck?.driver?.settlementRevenueTypeId || '',
            selectedTruck?.referenceId || ''
        );
        assignTruckMenu.close();
    };

    const filteredTrucks = () => {
        const filteredTruckByStatus = getFilteredData(trucks, TypeParams.SELECT_TRUCK);
        const filteredTruckByDriver = filteredTruckByStatus.filter((truck) => truck.driver);

        return filteredTruckByDriver;
    };

    return (
        <AssignComponent
            title="core:assign_menu.select_truck.title"
            isLoading={false}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trucks"
            options={filteredTrucks()}
            OptionComponent={TruckWithDriverOption}
            onClose={assignTruckMenu.close}
            optionHelpers={{
                getOptionId   : (option) => option.truckId,
                getOptionLabel: (option) =>
                    `#${option.referenceId} ${
                        option.driver ? `${option.driver.firstName} ${option.driver.lastName}` : ''
                    }`
            }}
            noOptionsText="common:empty.no_options"
        />
    );
}
