/* eslint-disable no-underscore-dangle */
// ** React Import
import { useEffect, useMemo, useRef, useState } from 'react';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Component Imports
import { LayoutSettingsType, SaveLayoutSettingsType } from '@/context/LayoutSettingsContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import SetupChecklist from '@/layouts/UserLayout/components/SetupChecklist/SetupChecklist';
import NavigationStyled from './styled';
import { helperNav } from './navigation_config';
import NavLink, { Item } from './components/NavLink/NavLink';
import NavBottom from './components/nav-bottom/NavBottom';
import Header from './components/NavHeader/NavHeader';
import NavItems from './components/NavItems/NavItems';
import D from './components/dd';

type ScrollRefHelper = {
    scrollbarYRail: {
        style: {
            zIndex: number;
            userSelect: string;
        };
    };
    scrollbarY: {
        style: {
            userSelect: string;
        };
    };
};

interface Props {
    settings: LayoutSettingsType;
    saveSettings: SaveLayoutSettingsType;
    navItems: Item[];
}

export default function Navigation({
    settings,
    saveSettings,
    navItems
}: Props) {
    const [groupActive, setGroupActive] = useState<string[]>([]);
    const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);
    const scrollRef = useRef<PerfectScrollbar | null>(null);
    const containerRef = useRef<HTMLElement | null>(null);
    const collapsed = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    const navCollapsed = useMemo(
        () => collapsed || settings.navCollapsed,
        [collapsed, settings.navCollapsed]
    );

    useEffect(() => {
        if (scrollRef.current && '_ps' in scrollRef.current) {
            const ps = scrollRef.current._ps as ScrollRefHelper;

            if (navCollapsed) {
                ps.scrollbarYRail.style.zIndex = 10;
            } else {
                ps.scrollbarYRail.style.zIndex = 1000;
            }
        }
    }, [scrollRef.current, navCollapsed]);

    useEffect(() => {
        if (containerRef.current?.scrollTop) {
            // eslint-disable-next-line no-param-reassign
            containerRef.current.scrollTop = 0;
        }
        if (scrollRef.current?.updateScroll) {
            scrollRef.current.updateScroll();
        }
    }, [containerRef, navCollapsed, scrollRef]);

    return (
        <D navCollapsed={navCollapsed}>
            <Header navCollapsed={navCollapsed} />
            <SetupChecklist navCollapsed={navCollapsed} />
            <PerfectScrollbar
                containerRef={(ref) => {
                    containerRef.current = ref;
                }}
                ref={(ref) => {
                    scrollRef.current = ref;
                }}
                options={{
                    wheelPropagation: true,
                    wheelSpeed      : 1
                }}
            >
                <NavigationStyled.Wrap>
                    <NavigationStyled.List className="nav-items">
                        <NavItems
                            groupActive={groupActive}
                            setGroupActive={setGroupActive}
                            currentActiveGroup={currentActiveGroup}
                            setCurrentActiveGroup={setCurrentActiveGroup}
                            navCollapsed={navCollapsed}
                            navItems={navItems}
                            settings={settings}
                            saveSettings={saveSettings}
                        />
                    </NavigationStyled.List>

                    <NavigationStyled.List
                        className="nav-items"
                        sx={{ marginTop: '-8px' }}
                    >
                        {helperNav.map((el, index) => (
                            <NavLink
                                navCollapsed={navCollapsed}
                                item={el}
                                key={el.id || index}
                            />
                        ))}
                    </NavigationStyled.List>
                </NavigationStyled.Wrap>
            </PerfectScrollbar>

            <NavBottom
                setGroupActive={setGroupActive}
                saveSettings={saveSettings}
                settings={settings}
                isFullVisible={navCollapsed}
            />
        </D>
    );
}
