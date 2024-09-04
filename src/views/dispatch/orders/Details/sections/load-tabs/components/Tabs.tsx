import React, { SyntheticEvent } from 'react';
import { LoadDetailsTabs, LoadsActions } from '@/store/dispatch/loads/slice';
import TabsStyled from '@/@core/ui-kits/basic/tabs/TabsStyled';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import { VIEWS } from '@/views/dispatch/orders/Details/sections/load-tabs/LoadTabs';
import { useAppDispatch } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LoadData_Load } from '@proto/loads';

type Props = {
    selectedTab: LoadDetailsTabs;
    load: LoadData_Load;
};

function Tabs({
    selectedTab,
    load
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const handlerTabChange = (event: SyntheticEvent, newValue: LoadDetailsTabs) => {
        dispatch(LoadsActions.selectLoadDetailsTab(newValue));
    };

    return (
        <TabsStyled.Tabs
            value={selectedTab}
            variant="fullWidth"
            onChange={handlerTabChange}
        >
            {VIEWS.map(({
                value,
                label,
                getCounts,
                countLabel
            }) => {
                const counts = getCounts?.(load);
                const showDefaultCount = ['number', 'string'].includes(typeof counts) && !!counts;
                return (
                    <TabsStyled.Tab
                        value={value}
                        label={
                            countLabel?.(load, selectedTab === value) || (
                                <>
                                    {t(label)}
                                    {showDefaultCount && (
                                        <CountBadge
                                            isSelected={value === selectedTab}
                                            count={counts}
                                        />
                                    )}
                                </>
                            )
                        }
                    />
                );
            })}
        </TabsStyled.Tabs>
    );
}

export default Tabs;
