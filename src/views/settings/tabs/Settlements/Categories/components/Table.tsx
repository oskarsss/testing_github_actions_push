/* eslint-disable max-len */

import { useCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import SettingTable from '@/views/settings/components/Table/Table';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useFilteredDeletedRows } from '@/views/settings/components/tabs/filteredDeletedRowsHook';
import {
    SettlementTransactionCategoryModel_Category,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import columns from './columns';
import { useEditCategoryDialog } from '../dialogs/Category/EditCategoryDialog';
import { useAddCategoryDialog } from '../dialogs/Category/AddCategoryDialog';

type Props = {
    type: SettlementTransactionCategoryModel_Type;
    value: TabsValue;
};

export default function CategoriesTable({
    type,
    value
}: Props) {
    const {
        categories,
        isLoading
    } = useCategories(type);
    const [deleteCategory] =
        SettlementTransactionCategoriesGrpcService.endpoints.deleteCategory.useMutation();
    const [restoreCategory] =
        SettlementTransactionCategoriesGrpcService.useRestoreSettlementTransactionCategoryMutation();
    const dialog = useEditCategoryDialog();
    const createCategoryDialog = useAddCategoryDialog();
    const confirm = useConfirm();

    const executeAction: ExecuteAction<SettlementTransactionCategoryModel_Category> = (
        name,
        { row }
    ) => {
        switch (name) {
        case 'edit':
            if (row.deleted) return;
            dialog.open({
                type,
                category: row
            });
            break;
        case 'delete':
            confirm({
                title    : 'settings:settlements.table.confirm.delete.title',
                body     : 'settings:settlements.table.confirm.delete.body',
                onConfirm: () =>
                    deleteCategory({
                        settlementTransactionCategoryId: row.transactionCategoryId
                    }),
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    body: { name: row.name }
                }
            });
            break;
        case 'restore':
            confirm({
                title    : 'settings:settlements.table.confirm.restore.title',
                body     : 'settings:settlements.table.confirm.restore.body',
                onConfirm: () =>
                    restoreCategory({
                        settlementTransactionCategoryId: row.transactionCategoryId
                    }),
                confirm_text      : 'common:button.restore',
                translationOptions: {
                    body: { name: row.name }
                }
            });
            break;
        default:
            break;
        }
    };

    const openCreateCategoryDialog = () => createCategoryDialog.open({ type });

    const filteredCategories = useFilteredDeletedRows(categories, value);

    return (
        <SettingTable<SettlementTransactionCategoryModel_Category>
            rows={filteredCategories}
            isLoading={isLoading}
            elementKey="transactionCategoryId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={
                type === SettlementTransactionCategoryModel_Type.CREDIT
                    ? FallbackType.CREDIT_CATEGORIES
                    : FallbackType.DEBIT_CATEGORIES
            }
            onClickFallback={openCreateCategoryDialog}
        />
    );
}
