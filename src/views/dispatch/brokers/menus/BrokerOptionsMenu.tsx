/* eslint-disable max-len */
import { useEditBrokerDialog } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBroker';
import { useDownloadDocumentByEntityDialog } from '@/@core/components/documents/dialogs/DownloadDocuments/DownloadDocumentByEntity';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MenuComponents from '@/@core/ui-kits/menus';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';

export const useBrokerOptionsMenu = menuHookFabric(BrokerOptionsMenu);

type Props = {
    id: string;
    mc: number;
};

export default function BrokerOptionsMenu({
    id,
    mc
}: Props) {
    const brokerOptionsMenu = useBrokerOptionsMenu(true);
    const editBrokerDialog = useEditBrokerDialog();
    const downloadDocumentDialog = useDownloadDocumentByEntityDialog();
    const confirm = useConfirm();

    const [deleteBroker] = BrokersGrpcService.useDeleteBrokerMutation();

    const remove = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:brokers.options.confirm_delete.title',
            body              : 'modals:brokers.options.confirm_delete.body',
            confirm_text      : 'common:button.delete',
            onConfirm         : () => deleteBroker({ brokerId: id }).unwrap().then(brokerOptionsMenu.close),
            translationOptions: {
                title: { mc }
            }
        });
    };

    const edit = () => {
        editBrokerDialog.open({
            brokerId: id
        });
        brokerOptionsMenu.close();
    };

    const downloadDocs = () => {
        downloadDocumentDialog.open({
            entity_id     : id,
            entity_type   : DocumentModel_DocumentEntityType.BROKER,
            openEditDialog: () => {
                editBrokerDialog.open({
                    brokerId: id
                });
            }
        });
        brokerOptionsMenu.close();
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
