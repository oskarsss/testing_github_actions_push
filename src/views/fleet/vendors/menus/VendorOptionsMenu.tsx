import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MenuComponents from '@/@core/ui-kits/menus';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';

export const useVendorOptionsMenu = menuHookFabric(VendorOptionsMenu);

type Props = {
    id: string;
    name: string;
};

export default function VendorOptionsMenu({
    id,
    name
}: Props) {
    const vendorOptionsMenu = useVendorOptionsMenu(true);
    const editVendorDialog = useEditVendorDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const confirm = useConfirm();

    const [deleteVendor] = VendorsGrpcService.useDeleteVendorMutation();

    const remove = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:vendors.delete.title',
            body              : 'modals:vendors.delete.body',
            confirm_text      : 'common:button.delete',
            translationOptions: {
                title: { name }
            },
            onConfirm: () =>
                deleteVendor({
                    vendorId: id
                })
                    .unwrap()
                    .then(vendorOptionsMenu.close)
        });
    };

    const edit = () => {
        editVendorDialog.open({
            vendor_id: id
        });
        vendorOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : id,
            entity_type   : DocumentModel_DocumentEntityType.VENDOR,
            openEditDialog: () => {
                editVendorDialog.open({
                    vendor_id: id
                });
            }
        });
        vendorOptionsMenu.close();
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
