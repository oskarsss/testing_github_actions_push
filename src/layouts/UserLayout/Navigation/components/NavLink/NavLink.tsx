// ** React Imports
import { type ReactNode, memo, useMemo, type MouseEventHandler } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

import Tooltip from '@/layouts/UserLayout/Navigation/components/Tooltip/Tooltip';
import { GroupName } from '@/layouts/UserLayout/Navigation/components/NavItems/permissions';
import NavLinkListItemIcon from '@/layouts/UserLayout/Navigation/components/NavLink/components/NavLinkListItemIcon';
import NavLinkListItemTitle from '@/layouts/UserLayout/Navigation/components/NavLink/components/NavLinkListItemTitle';

// ** Import Styled Components

// import { useLinkQueryFilters } from '@/@core/components/table/hooks/helpers';
import { handleURLQueries } from '@/layouts/utils';
import navigateToPage from '@/utils/navigateToPage';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NavLinkStyled from './styled';
import { CommonLink } from '../NavGroupItem/NavGroupItem';
import type { LinkComponentType } from '../../navigation_config';

export type Children = {
    id: string;
    icon: ({ isActive }: { isActive: boolean }) => ReactNode;
    children?: Children[];
    path: string;
    permission_name?: string;
    title: IntlMessageKey;
    testId: string;
    filtersOptions?: () => any;
    LinkComponent?: LinkComponentType;
};

export type Item = {
    id: string;
    children?: Children[];
    title: IntlMessageKey;
    icon: ({ isActive }: { isActive: boolean }) => ReactNode;
    path?: string;
    disabled?: boolean;
    permission_name?: string;
    permission_map_name?: GroupName;
    openInNewTab?: boolean;
    testId: string;
    filtersOptions?: () => any;
    LinkComponent?: LinkComponentType;
    countComponent?: ReactNode;
};

type Props = {
    item: Item;
    parent?: Item;
    navCollapsed: boolean;
    hasListItem?: (item: Item) => number | boolean;
};

function NavLink({
    item,
    parent,
    navCollapsed,
    hasListItem
}: Props) {
    const router = useRouter();
    const { t } = useAppTranslation();

    const isNavLinkActive = useMemo(
        () => router.pathname.includes(item.path as string) || handleURLQueries(router, item.path),
        [router, item.path]
    );

    const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        navigateToPage(item.path === undefined ? '/' : `${item.path}`, e);
    };

    const { LinkComponent } = item;

    if (item.permission_name) {
        if (hasListItem && !hasListItem(item)) {
            return null;
        }
    }

    return (
        <NavLinkStyled.ListItem
            disablePadding
            className="nav-link"
        >
            {!LinkComponent ? (
                <CommonLink
                    item={item}
                    onClick={onClick}
                >
                    <Tooltip
                        disableHoverListener={!navCollapsed}
                        title={t(item.title)}
                    >
                        <NavLinkStyled.MenuNavLink
                            className={isNavLinkActive ? 'active' : ''}
                            onClick={(e) => {
                                if (isNavLinkActive) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            isDisabled={item.disabled}
                        >
                            <NavLinkListItemIcon
                                parent={!!parent}
                                icon={item.icon}
                                isNavLinkActive={isNavLinkActive}
                            />

                            <NavLinkListItemTitle
                                navCollapsed={navCollapsed}
                                isNavLinkActive={isNavLinkActive}
                                title={item.title}
                            />

                            {item.countComponent}
                        </NavLinkStyled.MenuNavLink>
                    </Tooltip>
                </CommonLink>
            ) : (
                <LinkComponent
                    item={item}
                    onClick={onClick}
                >
                    <Tooltip
                        disableHoverListener={!navCollapsed}
                        title={t(item.title)}
                    >
                        <NavLinkStyled.MenuNavLink
                            className={isNavLinkActive ? 'active' : ''}
                            onClick={(e) => {
                                if (isNavLinkActive) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }}
                            isDisabled={item.disabled}
                        >
                            <NavLinkListItemIcon
                                parent={!!parent}
                                icon={item.icon}
                                isNavLinkActive={isNavLinkActive}
                            />

                            <NavLinkListItemTitle
                                navCollapsed={navCollapsed}
                                isNavLinkActive={isNavLinkActive}
                                title={item.title}
                            />
                        </NavLinkStyled.MenuNavLink>
                    </Tooltip>
                </LinkComponent>
            )}
        </NavLinkStyled.ListItem>
    );
}

export default memo(NavLink);
