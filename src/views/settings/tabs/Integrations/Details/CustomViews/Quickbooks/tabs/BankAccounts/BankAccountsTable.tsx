import React from 'react';
import { RowClickAction } from '@/views/settings/components/Table/types';
import IntegrationDetailsTable from '@/views/settings/tabs/Integrations/Details/components/Table/IntegrationDetailsTable';
import { BankAccountTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { columns } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/tabs/BankAccounts/columns';
import { useEditBankAccountQBDialog } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/dialogs/EditBankAccountQBDialog';

type Props = {
    data: BankAccountTabData[];
    loading: boolean;
};

export default function BankAccountsTable({
    data,
    loading
}: Props) {
    const editBankAccountDialog = useEditBankAccountQBDialog();
    const onClickRow: RowClickAction<BankAccountTabData> = (event, row) => {
        event.preventDefault();
        event.stopPropagation();
        editBankAccountDialog.open({
            quickbooksId   : row.quickbooks_id,
            bankAccountId  : row.bankAccountId,
            bankAccountName: row.bankName
        });
    };

    return (
        <IntegrationDetailsTable
            onClickRow={onClickRow}
            keyField="bankAccountId"
            items={data}
            loading={loading}
            columns={columns}
        />
    );
}
