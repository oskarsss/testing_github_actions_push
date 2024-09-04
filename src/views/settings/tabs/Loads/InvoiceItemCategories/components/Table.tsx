import SettingTable from '@/views/settings/components/Table/Table';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadInvoiceItemCategoriesGrpcService from '@/@grpcServices/services/loads-service/load-invoice-item-categories.service';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { useEditInvoiceItemCategoryDialog } from '../dialogs/EditInvoiceItemCategory';
import columns from './columns';
import { useAddInvoiceItemCategoryDialog } from '../dialogs/AddInvoiceItemCategory';

type Props = {
    categories: LoadsTypes.InvoiceItemCategory[];
    isLoading: boolean;
};

export default function Table({
    categories,
    isLoading
}: Props) {
    const confirm = useConfirm();
    const dialog = useEditInvoiceItemCategoryDialog();
    const createInvoiceCategoryDialog = useAddInvoiceItemCategoryDialog();
    const [deleteItem] =
        LoadInvoiceItemCategoriesGrpcService.useDeleteInvoiceItemCategoryMutation();

    const [restoreItem] =
        LoadInvoiceItemCategoriesGrpcService.useRestoreInvoiceItemCategoryMutation();

    const executeAction: ExecuteAction<LoadsTypes.InvoiceItemCategory> = (name, {
        row,
        event
    }) => {
        event.preventDefault();
        event.stopPropagation();
        switch (name) {
        case 'edit':
            if (row.deleted) return;
            dialog.open({ item: row });
            break;
        case 'delete':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:loads.invoice_item_categories.table.confirm.delete.title',
                body              : 'settings:loads.invoice_item_categories.table.confirm.delete.body',
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    title: { name: row.name }
                },
                onConfirm: () =>
                    deleteItem({
                        invoiceItemCategoryId: row.invoiceItemCategoryId
                    })
            });
            break;
        case 'restore':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:loads.invoice_item_categories.table.confirm.restore.title',
                body              : 'settings:loads.invoice_item_categories.table.confirm.restore.body',
                confirm_text      : 'common:button.restore',
                translationOptions: {
                    title: { name: row.name }
                },
                onConfirm: () =>
                    restoreItem({
                        invoiceItemCategoryId: row.invoiceItemCategoryId
                    })
            });
            break;
        default:
            break;
        }
    };

    const openCreateInvoiceCategoryDialog = () => createInvoiceCategoryDialog.open({});

    return (
        <SettingTable<LoadsTypes.InvoiceItemCategory>
            rows={categories}
            isLoading={isLoading}
            elementKey="invoiceItemCategoryId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.INVOICE_ITEM_CATEGORIES}
            onClickFallback={openCreateInvoiceCategoryDialog}
        />
    );
}
