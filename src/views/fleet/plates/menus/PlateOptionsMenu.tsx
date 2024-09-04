import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MenuComponents from '@/@core/ui-kits/menus';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditPlateDialog } from '@/views/fleet/plates/dialogs/EditPlate/EditPlate';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import PlatesGrpcService from '@/@grpcServices/services/plates.service';

export const usePlateOptionsMenu = menuHookFabric(PlateOptionsMenu);

type Props = {
    id: string;
    number: string;
};

export default function PlateOptionsMenu({
    id,
    number
}: Props) {
    const plateOptionsMenu = usePlateOptionsMenu(true);
    const editPlateDialog = useEditPlateDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const confirm = useConfirm();

    const [deletePlate] = PlatesGrpcService.useDeletePlateMutation();

    const remove = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:plates.delete.title',
            body              : 'modals:plates.delete.body',
            confirm_text      : 'common:button.delete',
            translationOptions: {
                title: { number }
            },
            onConfirm: () => deletePlate({ plateId: id }).unwrap().then(plateOptionsMenu.close)
        });
    };

    const edit = () => {
        editPlateDialog.open({
            plate_id: id
        });
        plateOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : id,
            entity_type   : DocumentModel_DocumentEntityType.PLATE,
            openEditDialog: () => {
                editPlateDialog.open({
                    plate_id: id
                });
            }
        });
        plateOptionsMenu.close();
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                Icon={<EditIcon fontSize="small" />}
                text="common:button.edit"
                onClick={edit}
            />

            <MenuComponents.Item
                Icon={<DownloadIcon fontSize="small" />}
                text="common:button.download_docs"
                onClick={downloadDocs}
            />

            <MenuComponents.DangerItem
                Icon={<DeleteIcon fontSize="small" />}
                text="common:button.delete"
                onClick={remove}
            />
        </MenuComponents.List>
    );
}
