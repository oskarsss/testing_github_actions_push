import React, { MemoExoticComponent } from 'react';
import { TabContext } from '@mui/lab';
import LoadManifests from '@/views/dispatch/orders/Details/sections/load-tabs/load-stops-tab/LoadManifests';
import Financials from '@/views/dispatch/orders/Details/sections/load-tabs/load-financials-tab/LoadsFinancials';
import LoadDocumentsTab from '@/views/dispatch/orders/Details/sections/load-tabs/load-documents/LoadDocumentsTab';
import type { IntlMessageKey } from '@/@types/next-intl';

import { isCompletedLoadStop, isCompletedManifestStop } from '@/utils/load-stops';
import LoadDocumentsCountLabel from '@/views/dispatch/orders/Details/sections/load-tabs/load-documents/LoadDocumentsCountLabel';
import { useAppSelector } from '@/store/hooks';
import { LoadDetailsTabs } from '@/store/dispatch/loads/slice';
import useScrollToElement, { ScrollToElement } from '@/hooks/useScrollToElement';
import Tabs from '@/views/dispatch/orders/Details/sections/load-tabs/components/Tabs';
import { LoadData_Load } from '@proto/loads';
import LoadTabsStyled from './LoadTabs.styled';
import Commodities from './commodities';

export type TabComponentProps = MemoExoticComponent<
    ({
        load,
        scrollToElement
    }: {
        load: LoadData_Load;
        scrollToElement?: ScrollToElement;
    }) => React.JSX.Element
>;

interface IViews {
    value: LoadDetailsTabs;
    label: IntlMessageKey;
    Component: TabComponentProps;
    getCounts?: (load: LoadData_Load) => string | number | null;
    countLabel?: (load: LoadData_Load, selected: boolean) => React.ReactNode;
}

function getLoadStopsCount(load: LoadData_Load) {
    if (!load.manifests.length) return null;
    let completedStops = 0;
    let countStops = 0;
    load.manifests.forEach((manifest) => {
        manifest.stops.forEach((stop) => {
            countStops += 1;
            if (stop.loadStopId) {
                if (isCompletedLoadStop(stop.loadStopStatus)) {
                    completedStops += 1;
                }
            }
            if (stop.manifestStopId) {
                if (isCompletedManifestStop(stop.manifestStopStatus)) {
                    completedStops += 1;
                }
            }
        });
    });
    if (countStops === 0) return null;
    return `${completedStops}/${countStops}`;
}

export const VIEWS: IViews[] = [
    {
        value    : 'loadStops',
        label    : 'entity:stops',
        Component: LoadManifests,
        getCounts: getLoadStopsCount
    },
    {
        value     : 'loadDocuments',
        label     : 'loads:details.tabs.labels.documents',
        Component : LoadDocumentsTab,
        countLabel: (load, selected) => (
            <LoadDocumentsCountLabel
                load={load}
                selected={selected}
            />
        )
    },
    {
        value    : 'loadCommodities',
        label    : 'loads:details.tabs.labels.commodities',
        Component: Commodities
    },
    {
        value    : 'loadFinancial',
        label    : 'loads:details.tabs.labels.financials',
        Component: Financials
    }
];

type Props = {
    load: LoadData_Load;
};

export default function LoadTabs({ load }: Props) {
    const selectedTab = useAppSelector((state) => state.loads.selectedLoadDetailsTab);
    const scrollContainerRef = React.useRef<HTMLElement | null>(null);
    const scrollToElement = useScrollToElement(scrollContainerRef);

    if (!load) return null;

    return (
        <LoadTabsStyled.Container>
            <Tabs
                selectedTab={selectedTab}
                load={load}
            />
            <TabContext value={selectedTab}>
                {VIEWS.map(({
                    value,
                    Component
                }) => (
                    <LoadTabsStyled.TabPanel
                        key={value}
                        value={value}
                    >
                        <LoadTabsStyled.PerfectScrollbar
                            containerRef={(ref) => {
                                scrollContainerRef.current = ref;
                            }}
                            options={{
                                wheelSpeed      : 1,
                                wheelPropagation: false,
                                suppressScrollX : true
                            }}
                        >
                            {load ? (
                                <Component
                                    load={load}
                                    scrollToElement={scrollToElement}
                                />
                            ) : (
                                <span />
                            )}
                        </LoadTabsStyled.PerfectScrollbar>
                    </LoadTabsStyled.TabPanel>
                ))}
            </TabContext>
        </LoadTabsStyled.Container>
    );
}
