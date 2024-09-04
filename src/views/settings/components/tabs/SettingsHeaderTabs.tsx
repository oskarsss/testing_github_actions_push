import CommonTabs, { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import { SyntheticEvent, useEffect, useMemo } from 'react';

export enum TabsValue {
    CURRENT = 'current',
    DELETED = 'deleted'
}

type Props<T extends { deleted: boolean }> = {
    value: TabsValue;
    setValue: (value: TabsValue) => void;
    categories: T[];
};

export default function SettingsHeaderTabs<T extends { deleted: boolean }>({
    value,
    setValue,
    categories
}: Props<T>) {
    const deletedCategories = useMemo(
        () => categories.filter((category) => category.deleted),
        [categories]
    );
    const currentCategories = useMemo(
        () => categories.filter((category) => !category.deleted),
        [categories]
    );

    const options: Options[] = [
        {
            label             : 'settings:categories.header.tabs.current',
            value             : TabsValue.CURRENT,
            color             : 'text.primary',
            translationOptions: {
                count: currentCategories.length
            }
        },
        {
            label             : 'settings:categories.header.tabs.deleted',
            value             : TabsValue.DELETED,
            color             : 'text.primary',
            translationOptions: {
                count: deletedCategories.length
            }
        }
    ];

    const handleChange = (e: SyntheticEvent<Element>, value: TabsValue) => {
        setValue(value);
    };

    useEffect(() => {
        if (!deletedCategories.length) {
            setValue(TabsValue.CURRENT);
        }
    }, [deletedCategories.length, setValue]);

    if (!deletedCategories.length) return null;

    return (
        <CommonTabs
            value={value}
            options={options}
            aria-label="settings header tabs"
            onChange={handleChange}
            slots={{
                tabsSx: {
                    minHeight   : '34px',
                    borderRadius: '8px'
                },
                tabSx: {
                    textTransform: 'capitalize',
                    minWidth     : '80px',
                    fontWeight   : 500
                }
            }}
        />
    );
}
