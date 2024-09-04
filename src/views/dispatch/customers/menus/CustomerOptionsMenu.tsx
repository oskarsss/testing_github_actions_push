import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';
import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MenuComponents from '@/@core/ui-kits/menus';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';

export const useCustomerOptionsMenu = menuHookFabric(CustomerOptionsMenu);

type Props = {
    id: string;
    name: string;
};

export default function CustomerOptionsMenu({
    id,
    name
}: Props) {
    const customerOptionsMenu = useCustomerOptionsMenu(true);
    const editCustomerDialog = useEditCustomerDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const confirm = useConfirm();

    const [deleteCustomer] = CustomersGrpcService.useDeleteCustomerMutation();

    const remove = () => {
        confirm({
            icon        : <DangerousIcon color="secondary" />,
            title       : 'modals:customers.options.confirm_delete.title',
            body        : 'modals:customers.options.confirm_delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () =>
                deleteCustomer({ customerId: id }).unwrap().then(customerOptionsMenu.close),
            translationOptions: {
                title: { name }
            }
        });
    };

    const edit = () => {
        editCustomerDialog.open({
            customerId: id
        });
        customerOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : id,
            entity_type   : DocumentModel_DocumentEntityType.CUSTOMER,
            openEditDialog: () => {
                editCustomerDialog.open({
                    customerId: id
                });
            }
        });
        customerOptionsMenu.close();
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
