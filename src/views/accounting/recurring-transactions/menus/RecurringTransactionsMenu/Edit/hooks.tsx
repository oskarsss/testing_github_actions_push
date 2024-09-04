/* eslint-disable import/prefer-default-export */
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import EditRecurringTransactionContainer from './EditRecurringTransactionContainer';

export const useEditRecurringTransactionsMenu = menuHookFabric(EditRecurringTransactionContainer);

export const useEditRecurringTransactionDialog = hookFabric(
    EditRecurringTransactionContainer,
    (props) => (
        <DialogComponents.DialogWrapper
            maxWidth="max-content"
            turnOffCloseButton
            {...props}
        />
    )
);
