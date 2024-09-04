import FullDialog from '@/@core/ui-kits/full-dialog';
import PlateStatusChipSelect from '@/@core/fields/chip-select/PlateStatusChipSelect';
import { Stack } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { PlateModel } from '@proto/models/model_plate';
import PlatesGrpcService, { PlateStatusGrpc } from '@/@grpcServices/services/plates.service';
import { useEditPlateForm } from '../EditPlateForm';
import { useEditPlateDialog } from '../EditPlate';

type Props = {
    plate: PlateModel;
    isMutationLoading: boolean;
    onClose: () => void;
};

export default function EditTruckHeaderContent({
    plate,
    isMutationLoading,
    onClose
}: Props) {
    const editPlateDialog = useEditPlateDialog();
    const confirm = useConfirm();

    // const
    const [deletePlate, { isLoading }] = PlatesGrpcService.useDeletePlateMutation();

    const remove = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:plates.delete.title',
            body              : 'modals:plates.delete.body',
            confirm_text      : 'common:button.delete',
            translationOptions: {
                title: {
                    number: plate.number
                }
            },
            onConfirm: () =>
                deletePlate({ plateId: plate.plateId }).unwrap().then(editPlateDialog.close)
        });
    };

    const {
        formState: { isDirty }
    } = useEditPlateForm();

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
            >
                <FullDialog.HeaderTitle title="modals:plates.edit.header.title">
                    {` ${plate.state}-${plate.number}`}
                    {/* {plate. && (
                        <>
                            <FullDialog.Slashed />
                            <FullDialog.CopyText text={plate.trailer.reference_id} />
                            <FullDialog.Slashed />
                            {plate?.trailer.year} {capitalizeFirstLetter(plate?.trailer.model)}
                        </>
                    )} */}
                </FullDialog.HeaderTitle>

                <PlateStatusChipSelect
                    plate_id={plate.plateId}
                    plate_status={PlateStatusGrpc[plate.status]}
                />
            </Stack>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isMutationLoading}
                    type="update"
                />
                <FullDialog.DeleteButton
                    disabled={isMutationLoading}
                    isLoading={isLoading}
                    onClick={remove}
                />
                <FullDialog.CloseButton onClose={onClose} />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
