import SettingIcons from '@/views/settings/icons/icons';
import { useMemo } from 'react';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useCategories } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { useAddCategoryDialog } from '../dialogs/Category/AddCategoryDialog';

type Props = {
    type: SettlementTransactionCategoryModel_Type;
    value: TabsValue;
    setValue: (value: TabsValue) => void;
};

export default function CategoriesHeader({
    type,
    value,
    setValue
}: Props) {
    const { categories } = useCategories(type);
    const dialog = useAddCategoryDialog();

    const openDialog = () => {
        dialog.open({
            type
        });
    };

    const title = useMemo(() => {
        if (type === SettlementTransactionCategoryModel_Type.DEBIT) {
            return 'settings:settlements.debit_categories.title';
        }
        if (type === SettlementTransactionCategoryModel_Type.CREDIT) {
            return 'settings:settlements.credit_categories.title';
        }
        return '';
    }, [type]);

    return (
        <SettingsHeader
            title={title}
            icon={
                type === SettlementTransactionCategoryModel_Type.DEBIT ? (
                    <SettingIcons.DebitTransactions />
                ) : (
                    <SettingIcons.CreditTransactions />
                )
            }
            onClick={openDialog}
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
