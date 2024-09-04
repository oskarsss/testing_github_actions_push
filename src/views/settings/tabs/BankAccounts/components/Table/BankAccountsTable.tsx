import SettingTable from '@/views/settings/components/Table/Table';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import BankAccountsGrpcService from '@/@grpcServices/services/bank-accounts.service';
import type { ExecuteAction } from '@/views/settings/components/Table/types';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import { useAppSelector } from '@/store/hooks';
import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useMemo } from 'react';
import { useAddBankAccountDialog } from '../../dialogs/AddBankAccountDialog';
import columns, { type BankAccountData } from './columns';

type Props = {
    rows: BankAccountData[];
    isLoading: boolean;
    selectedTab: TabsValue;
};

export default function BankAccountsTable({
    rows,
    isLoading,
    selectedTab
}: Props) {
    const addBankAccountDialog = useAddBankAccountDialog();
    const confirm = useConfirm();
    const companyId = useAppSelector((state) => state.app.company_id);

    const [deleteAccount] = BankAccountsGrpcService.useDeleteBankAccountMutation();

    const [restoreAccount] = BankAccountsGrpcService.useRestoreBankAccountMutation();

    const filteredRows = useMemo(
        () =>
            rows.filter((row) => (selectedTab === TabsValue.DELETED ? row.deleted : !row.deleted)),
        [selectedTab, rows]
    );

    const handleOpenDialog = () =>
        addBankAccountDialog.open({
            entityType: BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY,
            entityId  : companyId
        });

    const executeAction: ExecuteAction<BankAccountData> = (name, { row }) => {
        switch (name) {
        case 'delete':
            confirm({
                title       : 'modals:settings.bank_accounts.delete.title',
                body        : 'modals:settings.bank_accounts.delete.body',
                confirm_text: 'common:button.delete',
                onConfirm   : () => deleteAccount({ bankAccountId: row.bankAccountId })
            });
            break;
        case 'restore':
            confirm({
                title       : 'modals:settings.bank_accounts.restore.title',
                body        : 'modals:settings.bank_accounts.restore.body',
                confirm_text: 'common:button.restore',
                onConfirm   : () => restoreAccount({ bankAccountId: row.bankAccountId })
            });
            break;
        default:
            break;
        }
    };

    return (
        <SettingTable<BankAccountData>
            columns={filteredRows.length ? columns : []}
            rows={filteredRows}
            isLoading={isLoading}
            elementKey="bankAccountId"
            executeAction={executeAction}
            fallbackType={FallbackType.BANK_ACCOUNTS}
            onClickFallback={handleOpenDialog}
        />
    );
}
