import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import getFilteredData, { TypeParams } from '@/@core/components/assign/getFilteredData';
import { useTrailers } from '@/store/fleet/trailers/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAddTrailerDialog } from '@/views/fleet/trailers/dialogs/AddTrailer/AddTrailer';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import TrailersOption from '../options/TrailersOption';
import AssignComponent from '../AssignComponent';

export const useAssignTrailerToTruckMenu = menuHookFabric(AssignTrailerToTruck, {
    cleanContentOnClose: true
});

export const useAssignTrailerToTruckDialog = hookFabric(AssignTrailerToTruck, (props) => (
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
    titleTranslationOptions: IntlOptions;
    isDialog?: boolean;
};

function AssignTrailerToTruck({
    truckId,
    title = 'core:assign_menu.trailer_to_truck.title',
    titleTranslationOptions,
    isDialog = false
}: Props) {
    const { t } = useAppTranslation();
    const [assignTrailerToTruck, { isLoading }] =
        TrucksGrpcService.useAssignTrailerToTruckMutation();
    const { convertedTrailers } = useTrailers();
    const assignTrailerToTruckMenu = useAssignTrailerToTruckMenu(true);
    const assignTrailerToTruckDialog = useAssignTrailerToTruckDialog(true);
    const openAddTrailerDialog = useAddTrailerDialog();

    const modal = isDialog ? assignTrailerToTruckDialog : assignTrailerToTruckMenu;

    const openCreateTrailerDialog = () => {
        openAddTrailerDialog.open({});
    };

    const handleSubmit = (trailerId: string) => {
        assignTrailerToTruck({
            truckId,
            trailerId
        }).unwrap();

        modal.close();
    };

    const filteredTrailers = getFilteredData(convertedTrailers, TypeParams.TRAILER);

    return (
        <AssignComponent
            title={title}
            titleTranslationOptions={titleTranslationOptions}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            textFieldLabel="entity:trailers"
            options={filteredTrailers}
            OptionComponent={TrailersOption}
            onClose={modal.close}
            optionHelpers={{
                getOptionId   : (option) => option.trailerId,
                getOptionLabel: (option) =>
                    `#${option.referenceId} ${option.year} ${option.model} ${option?.make || ''}`
            }}
            onAdd={openCreateTrailerDialog}
            noOptionsText="core:assign_menu.create_by_entity.create_trailer"
        />
    );
}
