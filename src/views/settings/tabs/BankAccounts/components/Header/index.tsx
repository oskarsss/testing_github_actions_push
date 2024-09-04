import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { BankAccountModel_Entity_Type } from '@proto/models/model_bank_account';
import { useAppSelector } from '@/store/hooks';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { BankAccount } from '@proto/bank_accounts';
import { useAddBankAccountDialog } from '../../dialogs/AddBankAccountDialog';

type Props = {
    value: TabsValue;
    setValue: (value: TabsValue) => void;
    categories: BankAccount[];
};

export default function BankAccountsHeader({
    value,
    setValue,
    categories
}: Props) {
    const { open } = useAddBankAccountDialog();
    const companyId = useAppSelector((state) => state.app.company_id);

    const handleOpenDialog = () =>
        open({
            entityType: BankAccountModel_Entity_Type.ENTITY_TYPE_COMPANY,
            entityId  : companyId
        });

    return (
        <SettingsHeader
            title="settings:bank_accounts.header.title"
            onClick={handleOpenDialog}
            icon={<AccountBalanceIcon />}
            children_left_side={(
                <SettingsHeaderTabs
                    value={value}
                    setValue={setValue}
                    categories={categories}
                />
            )}
        />
    );
}
