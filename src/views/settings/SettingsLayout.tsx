import {
    useEffect,
    useRef,
    useState,
    memo,
    PropsWithChildren,
    useCallback,
    CSSProperties
} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { debounce } from 'lodash';
import { SxProps, Theme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Navigation from './components/Navigation/Navigation';
import MyContext from './context';
import {
    Container,
    PerfectScrollbarNavigation,
    PerfectScrollbarSection,
    MenuList,
    Title,
    Section,
    Content,
    ContainerContent
} from './styled';

const settings_scroll_top_key_ls = 'settings-scroll-top';

const resetWidthContainerStyle = (resetWidthContainer: boolean): CSSProperties => {
    if (resetWidthContainer) {
        return {
            maxWidth: 'none',
            minWidth: 'unset'
        };
    }
    return {};
};

type Props = PropsWithChildren<{
    turnOffScrollBar?: boolean;
    resetWidthContainer?: boolean;
    sxSection?: SxProps<Theme>;
}>;

const SettingsLayout = ({
    children,
    turnOffScrollBar = false,
    resetWidthContainer = false,
    sxSection
}: Props) => {
    const { t } = useAppTranslation();
    const [isUpdateScroll, setIsUpdateScroll] = useState(false);
    const scrollBarRef = useRef<PerfectScrollbar | null>(null);
    const containerRef = useRef<HTMLElement>();

    const updateScroll = () => setIsUpdateScroll(true);
    const contextValue = useCallback(() => ({ updateScroll }), [updateScroll]);

    const setContainerRef = (el: HTMLElement) => {
        containerRef.current = el;
    };

    useEffect(() => {
        const nav_bar_el = containerRef.current;
        const nav_el = document.getElementById('settings-nav-selected');
        const scrollTop = window.localStorage.getItem(settings_scroll_top_key_ls);

        const setScrollTop = (e: Event) => {
            const scrollTop = (e.target as HTMLElement)?.scrollTop || 0;
            window.localStorage.setItem(settings_scroll_top_key_ls, scrollTop.toString());
        };

        containerRef.current?.addEventListener('scroll', debounce(setScrollTop, 300));

        if (nav_bar_el && nav_el) {
            const scroll_top_local = Number(scrollTop);
            const nav_bar = {
                top   : nav_bar_el.offsetTop,
                height: nav_bar_el.offsetHeight,
                bottom: nav_bar_el.offsetHeight
            };
            const nav_selected = {
                top   : nav_el.offsetTop,
                height: nav_el.offsetHeight,
                bottom: nav_el.offsetTop + nav_el.offsetHeight
            };

            if (
                nav_selected.top >= nav_bar.top + scroll_top_local &&
                nav_selected.bottom <= nav_bar.bottom + scroll_top_local &&
                nav_bar_el.scrollTop !== scroll_top_local
            ) {
                nav_bar_el.scrollTop = scroll_top_local;
            } else if (
                nav_selected.top >= nav_bar.top + nav_bar_el.scrollTop &&
                nav_selected.bottom <= nav_bar.bottom + nav_bar_el.scrollTop
            ) {
                window.localStorage.setItem(
                    settings_scroll_top_key_ls,
                    nav_bar_el.scrollTop.toString()
                );
            } else {
                nav_bar_el.scrollTop =
                    nav_selected.bottom + nav_selected.height * 2 - nav_bar.height;
            }
        }
        return () => {
            containerRef.current?.removeEventListener('scroll', setScrollTop);
        };
    }, [containerRef?.current]);

    useEffect(() => {
        if (isUpdateScroll) {
            if (scrollBarRef.current) {
                scrollBarRef.current?.updateScroll();
                setIsUpdateScroll(false);
            }
        }
    }, [isUpdateScroll]);

    return (
        <Container>
            <PerfectScrollbarNavigation
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                containerRef={setContainerRef}
            >
                <MenuList>
                    <div>
                        <Title>{t('settings:header.title')}</Title>
                        <Navigation />
                    </div>
                </MenuList>
            </PerfectScrollbarNavigation>
            {turnOffScrollBar ? (
                <Section sx={sxSection}>
                    <Content>
                        <ContainerContent sx={resetWidthContainerStyle(resetWidthContainer)}>
                            <MyContext.Provider value={contextValue()}>
                                {children}
                            </MyContext.Provider>
                        </ContainerContent>
                    </Content>
                </Section>
            ) : (
                <PerfectScrollbarSection
                    options={{
                        wheelSpeed      : 1,
                        wheelPropagation: false
                    }}
                    ref={scrollBarRef}
                >
                    <Section sx={sxSection}>
                        <Content>
                            <ContainerContent sx={resetWidthContainerStyle(resetWidthContainer)}>
                                <MyContext.Provider value={contextValue()}>
                                    {children}
                                </MyContext.Provider>
                            </ContainerContent>
                        </Content>
                    </Section>
                </PerfectScrollbarSection>
            )}
        </Container>
    );
};

export default memo(SettingsLayout);
