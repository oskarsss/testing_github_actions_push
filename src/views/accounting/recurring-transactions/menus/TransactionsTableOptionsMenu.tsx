import SettlementsTypes from '@/store/accounting/settlements/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import React from 'react';
import MenuComponents from '@/@core/ui-kits/menus';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { useCreateRecurringTransactionDialog } from './RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { useEditRecurringTransactionDialog } from './RecurringTransactionsMenu/Edit/hooks';

type Props = {
    row: SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow;
};

export const useTransactionsRecurringTransactionsOptionsMenu = menuHookFabric(
    TransactionsTableOptionsMenu
);

function TransactionsTableOptionsMenu({ row }: Props) {
    const createTransactionDialog = useCreateRecurringTransactionDialog();
    const editTransactionDialog = useEditRecurringTransactionDialog();
    const optionsMenu = useTransactionsRecurringTransactionsOptionsMenu(true);

    const onClickAddTransaction = () => {
        createTransactionDialog.open({
            driver: {
                id  : row.entityId,
                name: row.fullName
            },
            enableChangeType: true,
            category_id     : '',
            category_type:
                row.categoryType === SettlementTransactionCategoryModel_Type.DEBIT
                    ? 'debit'
                    : 'credit',
            setDialogStyled: true
        });
        optionsMenu.close();
    };

    const onCLickEditTransaction = () => {
        optionsMenu.close();
        editTransactionDialog.open({
            id         : row.recurringTransactionId,
            category_id: row.categoryId,

            // readOnlyCategoryField: true,
            setDialogStyled: true,
            driver_id      : row.entityId
        });
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                text="recurring_transactions:tables.transactions.options_menu.add_transactions"
                Icon={<AddBoxIcon />}
                onClick={onClickAddTransaction}
            />
            <MenuComponents.Item
                text="recurring_transactions:tables.transactions.options_menu.edit_transaction"
                Icon={<EditIcon />}
                onClick={onCLickEditTransaction}
            />
        </MenuComponents.List>
    );
}

export default TransactionsTableOptionsMenu;
