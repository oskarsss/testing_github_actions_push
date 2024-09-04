import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAddTruckDialog } from '@/views/fleet/trucks/dialogs/AddTruck/AddTruck';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { useMemo } from 'react';
import { TruckModel_Status } from '@proto/models/model_truck';
import TruckOption from '../options/TruckOption';
import AssignComponent from '../AssignComponent';

export const useAssignTruckToTrailerMenu = menuHookFabric(AssignTruckToTrailer, {
    cleanContentOnClose: true
});

export const useAssignTruckToTrailerDialog = hookFabric(AssignTruckToTrailer, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="max-content"
        turnOffCloseButton
        keepMounted
        padding="0px"
        {...props}
    />
));

type Props = {
    trailerId: string;
    referenceId: string;
    isDialog?: boolean;
};

const activeTruckStatuses = [
    TruckModel_Status.onboarding,
    TruckModel_Status.active,
    TruckModel_Status.inactive,
    TruckModel_Status.pending_termination
];

function AssignTruckToTrailer({
    trailerId,
    referenceId,
    isDialog = false
}: Props) {
    const { t } = useAppTranslation();
    const [assignTrailerToTruck, { isLoading }] =
        TrucksGrpcService.useAssignTrailerToTruckMutation();
    const trucksList = useAppSelector(TrucksDataSelectors.getRows);
    const assignTruckToTrailerMenu = useAssignTruckToTrailerMenu(true);
    const assignTruckToTrailerDialog = useAssignTruckToTrailerDialog(true);
    const addTruckDialog = useAddTruckDialog();

    const modal = isDialog ? assignTruckToTrailerDialog : assignTruckToTrailerMenu;

    const openCreateTruckDialog = () => {
        addTruckDialog.open({});
    };

    const handleSubmit = (truckId: string) => {
        assignTrailerToTruck({
            truckId,
            trailerId
        }).unwrap();
        modal.close();
    };

    const filteredTrucks = useMemo(
        () =>
            trucksList.filter(
                (truck) => activeTruckStatuses.includes(truck.status) && !truck.trailerId
            ),
        [trucksList]
    );

    return (
        <AssignComponent
            title="core:assign_menu.truck_to_trailer.title"
            titleTranslationOptions={{ referenceId }}
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
