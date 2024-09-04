// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';

// ** MUI Imports
import ListItem from '@mui/material/ListItem';

// ** Type Imports
import { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';

import { applyTestId } from '@/configs/tests';
import { type MouseEventHandler, type PropsWithChildren, useMemo } from 'react';
import NavGroupItemTitle from '@/layouts/UserLayout/Navigation/components/NavGroupItem/components/NavGroupItemTitle';
import { NavGroupItemIcon } from '@/layouts/UserLayout/Navigation/components/NavGroupItem/components/NavGroupItemIcon';
import navigateToPage from '@/utils/navigateToPage';
import { handleURLQueries } from '@/layouts/utils';
import NavGroupItemStyled from './styled';

type Props = {
    item: Children;
    parent: Item;
    navCollapsed: boolean;
    isSubToSub: Item | undefined;
};

export function CommonLink({
    item,
    onClick,
    children
}: PropsWithChildren<{
    item: Children | Item;
    onClick: MouseEventHandler<HTMLAnchorElement>;
}>) {
    return (
        <Link
            passHref
            style={{ flexGrow: 1 }}
            onClick={onClick}
            shallow
            href={{
                pathname: item.path === undefined ? '/' : `${item.path}`
            }}
            {...applyTestId(item.testId)}
        >
            {children}
        </Link>
    );
}

export default function NavGroupItem({
    item,
    parent,
    navCollapsed,
    isSubToSub
}: Props) {
    const router = useRouter();

    const isNavLinkActive = useMemo(() => {
        if (router.pathname === '/trailers/companies' && item.path === '/trailers') {
            return true;
        }
        if (router.pathname === '/plates/companies' && item.path === '/plates') {
            return true;
        }
        return router.pathname === item.path || handleURLQueries(router, item.path);
    }, [router, item.path]);

    const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        navigateToPage(item.path === undefined ? '/' : `${item.path}`, e);
    };

    return (
        <ListItem
            disablePadding
            className="nav-link"
            sx={{ px: '0 !important' }}
        >
            <Link
                passHref
                style={{ flexGrow: 1 }}
                onClick={onClick}
                href={{
                    pathname: item.path === undefined ? '/' : `${item.path}`
                }}
                {...applyTestId(item.testId)}
            >
                <NavGroupItemStyled.MenuGroupLink
                    className={isNavLinkActive ? 'active' : ''}
                    onClick={(e) => {
                        if (isNavLinkActive && !('id' in router.query)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                >
                    {isSubToSub ? null : (
                        <NavGroupItemIcon
                            isParent={!!parent}
                            icon={item.icon}
                            isNavLinkActive={isNavLinkActive}
                        />
                    )}

                    <NavGroupItemTitle
                        isSubToSub={!!isSubToSub}
                        isNavLinkActive={isNavLinkActive}
                        navCollapsed={navCollapsed}
                        title={item.title}
                    />
                </NavGroupItemStyled.MenuGroupLink>
            </Link>
        </ListItem>
    );
}
