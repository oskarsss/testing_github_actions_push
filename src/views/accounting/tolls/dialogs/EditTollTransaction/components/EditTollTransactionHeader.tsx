import FullDialog from '@/@core/ui-kits/full-dialog';
import { Stack } from '@mui/material';
import CommonTabs from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import { useConfirm } from '@/@core/components/confirm-dialog';
import TollsGrpcService from '@/@grpcServices/services/tolls.service';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { selectedVehicleOptions } from '../../constants';

type SelectedEntity =
    | DocumentModel_DocumentEntityType.TRUCK
    | DocumentModel_DocumentEntityType.TRAILER;

type Props = {
    toll_transaction_id: string;
    setSelectedEntity: React.Dispatch<React.SetStateAction<SelectedEntity>>;
    selectedEntity: SelectedEntity;
    onClose: () => void;
    isUpdating: boolean;
    isDirty: boolean;
};

export default function EditTollTransactionHeader({
    toll_transaction_id,
    setSelectedEntity,
    selectedEntity,
    onClose,
    isUpdating,
    isDirty
}: Props) {
    const confirm = useConfirm();
    const [deleteToll, { isLoading: isDeleting }] = TollsGrpcService.useDeleteTollMutation();

    const onDelete = () => {
        confirm({
            title       : 'modals:tolls.edit.delete.confirm.title',
            body        : 'modals:tolls.edit.delete.confirm.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () => {
                deleteToll({
                    tollIds: [toll_transaction_id]
                })
                    .unwrap()
                    .then(onClose);
            }
        });
    };

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
            >
                <FullDialog.HeaderTitle title="modals:tolls.edit.title" />
                <Stack
                    direction="row"
                    minWidth={300}
                >
                    <CommonTabs
                        value={selectedEntity}
                        options={selectedVehicleOptions}
                        aria-label="edit settlement tabs"
                        slots={{
                            tabsSx: { width: '300px' }
                        }}
                        onChange={(event, value) => {
                            setSelectedEntity(value);
                        }}
                    />
                </Stack>
            </Stack>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={isUpdating}
                    type="update"

                    // testId={TestIDs.pages.editTruck.buttons.saveTruckEditing}
                />
                <FullDialog.DeleteButton
                    disabled={isUpdating}
                    isLoading={isDeleting}
                    onClick={onDelete}

                    // testId={TestIDs.pages.editTruck.buttons.deleteTruck}
                />
                <FullDialog.CloseButton
                    onClose={onClose}

                    // testId={TestIDs.pages.editTruck.buttons.close}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
