import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useRouter } from 'next/router';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useEffect } from 'react';
import { TestIDs } from '@/configs/tests';
import TruckStatusChipSelect from '@/@core/fields/chip-select/TruckStatusChipSelect';
import { Stack } from '@mui/material';
import navigateToPage from '@/utils/navigateToPage';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TRUCK_STATUS_TO_LOCALE } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { PlateModel } from '@proto/models/model_plate';
import { useEditTruckDialog } from '../EditTruck';
import { useEditTruckForm } from '../EditTruckForm';

type Props = {
    truck: TruckModel_Truck;
    isMutationLoading: boolean;
    onClose: () => void;
    plate?: PlateModel;
};

export default function EditTruckHeaderContent({
    truck,
    isMutationLoading,
    onClose,
    plate
}: Props) {
    const router = useRouter();
    const { t } = useAppTranslation();
    const editTruckDialog = useEditTruckDialog();
    const confirm = useConfirm();
    const [deleteTruck, {
        isLoading,
        isSuccess
    }] = TrucksGrpcService.useDeleteTruckMutation();

    const onDelete = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:trucks.delete.title',
            body            : 'modals:trucks.delete.body',
            confirm_text    : 'common:button.delete',
            max_width_dialog: '590px',
            onConfirm       : () => deleteTruck({ truckId: truck.truckId }),
            cancelTestId    : TestIDs.pages.editTruck.buttons.cancelDeleteTruck,
            confirmTestId   : TestIDs.pages.editTruck.buttons.confirmDeleteTruck
        });
    };

    useEffect(() => {
        if (isSuccess) {
            editTruckDialog.close();
            if (router.pathname === '/trucks/[id]') {
                navigateToPage('/trucks');
            }
        }
    }, [isSuccess]);

    const {
        formState: { isDirty }
    } = useEditTruckForm();

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
            >
                <FullDialog.HeaderTitle title="modals:trucks.edit.header.title">
                    <FullDialog.CopyText text={truck.referenceId} />
                    <FullDialog.Slashed />
                    {plate && plate.state
                        ? `${plate.state}-${plate.number}`
                        : t('common:empty.no_plate')}
                    <FullDialog.Slashed />
                    {truck.year} {capitalizeFirstLetter(truck.model)}
                    <FullDialog.Slashed />
                    <FullDialog.CopyText text={truck.vin} />
                </FullDialog.HeaderTitle>

                <TruckStatusChipSelect
                    truck_id={truck.truckId}
                    truck_status={TRUCK_STATUS_TO_LOCALE[truck.status]}
                    buttonTestId={TestIDs.pages.editTruck.fields.status}
                    optionTestId={TestIDs.components.select.status.optionPrefix}
                />
            </Stack>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                    type="update"
                    testId={TestIDs.pages.editTruck.buttons.saveTruckEditing}
                />
                <FullDialog.DeleteButton
                    disabled={false}
                    isLoading={false}
                    onClick={onDelete}
                    testId={TestIDs.pages.editTruck.buttons.deleteTruck}
                />
                <FullDialog.ViewButton
                    onClose={editTruckDialog.close}
                    path={`/trucks/${truck.truckId}`}
                    hidden={router.pathname === '/trucks/[id]'}
                />
                <FullDialog.CloseButton
                    onClose={onClose}
                    testId={TestIDs.pages.editTruck.buttons.close}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
