import React, { memo } from 'react';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import TabsStyled from '@/@core/ui-kits/basic/tabs/TabsStyled';
import { ManifestDetailsTab } from '@/store/dispatch/manifests/models';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import { useAppDispatch } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type View = {
    label: IntlMessageKey;
    value: ManifestDetailsTab;
};

const VIEWS: View[] = [
    {
        label: 'entity:stops',
        value: 'stops'
    },
    {
        label: 'entity:loads',
        value: 'loads'
    },
    {
        label: 'modals:manifests.details.tabs.titles.driver_pay',
        value: 'driverPay'
    },
    {
        label: 'modals:manifests.details.tabs.titles.border_connect',
        value: 'borderConnect'
    }
];
type Props = {
    countsItemsTab: Record<string, number>;
    selectedTab: ManifestDetailsTab;
};

function Tabs({
    countsItemsTab,
    selectedTab
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: ManifestDetailsTab) => {
        dispatch(ManifestsActions.SelectManifestDetailsTab(newValue));
    };

    return (
        <TabsStyled.Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="fullWidth"
            sx={{ flexShrink: 0 }}
        >
            {VIEWS.map((view) => (
                <TabsStyled.Tab
                    value={view.value}
                    key={view.value}
                    disabled={view.value === 'borderConnect'}
                    iconPosition="start"
                    label={(
                        <>
                            {t(view.label)}
                            {view.value in countsItemsTab && (
                                <CountBadge
                                    count={countsItemsTab[view.value]}
                                    isSelected={view.value === selectedTab}
                                />
                            )}
                            {view.value === 'borderConnect' && (
                                <Badge
                                    sx={{
                                        textTransform: 'capitalize',
                                        borderRadius : '16px'
                                    }}
                                >
                                    Coming soon
                                </Badge>
                            )}
                        </>
                    )}
                />
            ))}
        </TabsStyled.Tabs>
    );
}

export default memo(Tabs);
