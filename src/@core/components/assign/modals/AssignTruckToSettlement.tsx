import { menuHookFabric } from '@/utils/menu-hook-fabric';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useActiveConvertTrucks } from '@/store/fleet/trucks/hooks';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import AssignComponent from '../AssignComponent';
import TruckWithDriverOption from '../options/truck-with-driver/TruckWithDriverOption';

export const useAssignTruckToSettlementMenu = menuHookFabric(AssignTruckToSettlement, {
    cleanContentOnClose: true
});

type Props = {
    cycleId: string;
    periodId: string;
    settlementId: string;
    settlementFriendlyId: string;
};

function AssignTruckToSettlement({
    cycleId,
    periodId,
    settlementId,
    settlementFriendlyId
}: Props) {
    const [assignTruckToSettlement, { isLoading }] =
        SettlementsGrpcService.useAssignTruckToSettlementMutation();
    const { trucks } = useActiveConvertTrucks();
    const assignTruckToSettlementMenu = useAssignTruckToSettlementMenu(true);

    const handleSubmit = (truckId: string) => {
        assignTruckToSettlement({
            cycleId,
            periodId,
            settlementId,
            truckId
        })
            .unwrap()
            .then(assignTruckToSettlementMenu.close);
    };

    const filteredTrucks = getFilteredData(trucks, TypeParams.SELECT_TRUCK);

    return (
        <AssignComponent
            title="core:assign_menu.truck_to_settlement.title"
            titleTranslationOptions={{ friendly_id: settlementFriendlyId }}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trucks"
            options={filteredTrucks}
            OptionComponent={TruckWithDriverOption}
            onClose={assignTruckToSettlementMenu.close}
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
