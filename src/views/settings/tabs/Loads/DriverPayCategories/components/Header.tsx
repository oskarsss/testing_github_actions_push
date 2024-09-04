import LoadsTypes from '@/store/dispatch/loads/types';
import SettingIcons from '@/views/settings/icons/icons';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import { useAddDriverPayCategoryDialog } from '@/views/settings/tabs/Loads/DriverPayCategories/dialogs/AddDriverPayCategories';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { memo } from 'react';

type Props = {
    value: TabsValue;
    setValue: (value: TabsValue) => void;
    categories: LoadsTypes.DriverPayItemCategory[];
};

function DriverPayCategoriesHeader({
    value,
    setValue,
    categories
}: Props) {
    const dialog = useAddDriverPayCategoryDialog();

    const add = () => dialog.open({});

    return (
        <SettingsHeader
            title="settings:loads.driver_pay_categories.title"
            icon={<SettingIcons.DriverPayCategories />}
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

export default memo(DriverPayCategoriesHeader);
