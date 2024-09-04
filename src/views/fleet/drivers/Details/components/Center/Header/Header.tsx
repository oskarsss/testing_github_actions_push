import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ReactNode, SyntheticEvent, useRef, WheelEvent } from 'react';
import { applyTestId } from '@/configs/tests';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import CenterStyled from '../styled';

export type View = {
    id: string;
    name: IntlMessageKey;
    testID?: string;
    count?: number;
    children: ReactNode;
};

type HeaderProps = {
    views: View[];
    value: DETAILS_TABS_IDS;
    setSelectedViewId?: (view_id: DETAILS_TABS_IDS) => void;
};

export default function Header({
    views,
    value,
    setSelectedViewId
}: HeaderProps) {
    const { t } = useAppTranslation();
    const containerRef = useRef<HTMLElement>();

    const handleChange = (event: SyntheticEvent<Element>, newValue: DETAILS_TABS_IDS) => {
        if (setSelectedViewId) {
            setSelectedViewId(newValue);
        }
    };

    const handleScroll = (e: WheelEvent<HTMLElement>) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <CenterStyled.HeaderBlock
            onWheel={handleScroll}
            ref={containerRef}
            sx={{
                display               : 'flex',
                flex                  : '1 1 0',
                overflow              : 'auto',
                scrollbarWidth        : 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons={false}
                variant="scrollable"
                sx={{ overflow: 'initial' }}
            >
                {views.map((view, index) => (
                    <Tab
                        key={view.id}
                        value={view.id}
                        label={(
                            <CenterStyled.TabLabel count={view.count}>
                                {t(view.name)}
                            </CenterStyled.TabLabel>
                        )}
                        style={{
                            fontWeight    : 800,
                            justifyContent: 'space-between'
                        }}
                        {...applyTestId(view.testID)}
                    />
                ))}
            </Tabs>
        </CenterStyled.HeaderBlock>
    );
}
