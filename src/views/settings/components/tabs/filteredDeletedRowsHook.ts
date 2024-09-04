/* eslint-disable max-len */

import { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';
import { useMemo } from 'react';
import { useStableArray } from '@/hooks/useStable';

export function useFilteredDeletedRows<T extends { deleted: boolean }>(
    rows: T[] | undefined,
    tabsValue: TabsValue
) {
    const stableArray = useStableArray(rows);
    return useMemo(
        () =>
            stableArray.filter((row) =>
                tabsValue === TabsValue.CURRENT ? !row.deleted : row.deleted),
        [stableArray, tabsValue]
    );
}
