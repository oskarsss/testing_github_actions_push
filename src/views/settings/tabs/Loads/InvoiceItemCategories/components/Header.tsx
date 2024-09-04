import LoadsTypes from '@/store/dispatch/loads/types';
import SettingIcons from '@/views/settings/icons/icons';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import { useAddInvoiceItemCategoryDialog } from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/AddInvoiceItemCategory';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { memo } from 'react';

type Props = {
    value: TabsValue;
    setValue: (value: TabsValue) => void;
    categories: LoadsTypes.InvoiceItemCategory[];
};

function InvoiceCategoriesHeader({
    value,
    setValue,
    categories
}: Props) {
    const dialog = useAddInvoiceItemCategoryDialog();

    const add = () => dialog.open({});

    return (
        <SettingsHeader
            title="settings:loads.invoice_item_categories.title"
            icon={<SettingIcons.InvoiceCategories />}
            onClick={add}
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

export default memo(InvoiceCategoriesHeader);
