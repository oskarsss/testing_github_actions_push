// ** React Imports
import { useEffect, useState } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

import type { NavItemsProps } from '@/layouts/UserLayout/Navigation/components/NavItems/NavItems';
import type { Children, Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';
import { hasActiveChild, removeChildren } from '@/layouts/utils';
import { applyTestId } from '@/configs/tests';
import NavGroupItemButton from '@/layouts/UserLayout/Navigation/components/NavGroup/components/NavGroupItemButton';
import NavGroupCollapse from '@/layouts/UserLayout/Navigation/components/NavGroup/components/NavGroupCollapse';
import type { GroupName } from '@/layouts/UserLayout/Navigation/components/NavItems/permissions';
import NavGroupSubMenu from '@/layouts/UserLayout/Navigation/components/NavGroup/components/NavGroupSubMenu';
import NavGroupStyled from './styled';

interface Props extends NavItemsProps {
    item: Item;
    hasGroupName: (group_name: GroupName) => boolean;
    hasListItem: (children: Children) => number | boolean;
    parent?: Item;
}

export default function NavGroup({
    item,
    settings,
    navCollapsed,
    groupActive,
    setGroupActive,
    currentActiveGroup,
    parent,
    setCurrentActiveGroup,
    hasGroupName,
    hasListItem
}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const router = useRouter();
    const currentURL = router.pathname;
    const { verticalNavToggleType } = settings;

    const toggleActiveGroup = (item: Item, parent?: Item) => {
        let openGroup = groupActive;

        if (openGroup.includes(item.title)) {
            openGroup.splice(openGroup.indexOf(item.title), 1);

            if (item.children) {
                removeChildren(item.children, openGroup, currentActiveGroup);
            }
        } else if (parent) {
            if (parent.children) {
                removeChildren(parent.children, openGroup, currentActiveGroup);
            }

            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title);
            }
        } else {
            openGroup = [];

            if (currentActiveGroup.every((elem) => groupActive.includes(elem))) {
                openGroup.push(...currentActiveGroup);
            }

            if (!openGroup.includes(item.title)) {
                openGroup.push(item.title);
            }
        }
        setGroupActive([...openGroup]);
    };

    const handleGroupClick = () => {
        if (navCollapsed) {
            return;
        }
        const openGroup = groupActive;
        if (verticalNavToggleType === 'collapse') {
            if (openGroup.includes(item.title)) {
                openGroup.splice(openGroup.indexOf(item.title), 1);
            } else {
                openGroup.push(item.title);
            }
            setGroupActive([...openGroup]);
        } else {
            toggleActiveGroup(item, parent);
        }
    };

    useEffect(() => {
        if (hasActiveChild(item, currentURL)) {
            if (!groupActive.includes(item.title)) groupActive.push(item.title);
        } else {
            const index = groupActive.indexOf(item.title);
            if (index > -1) groupActive.splice(index, 1);
        }
        setGroupActive([...groupActive]);
        setCurrentActiveGroup([...groupActive]);
    }, [router.asPath]);

    const isGroupActive = groupActive.includes(item.title);

    if (item.permission_map_name) {
        if (!hasGroupName(item.permission_map_name)) {
            return null;
        }
    }

    const handleOpen = () => {
        if (!navCollapsed || !item.children?.length) return;
        setIsMenuOpen(true);
    };

    const handleClose = () => setIsMenuOpen(false);

    return (
        <NavGroupStyled.ListItem
            disablePadding
            nav_collapsed={navCollapsed}
            onClick={handleGroupClick}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            {...applyTestId(item.testId)}
        >
            {isMenuOpen && (
                <NavGroupSubMenu
                    item={item}
                    parent={parent}
                    navCollapsed={navCollapsed}
                    hasListItem={hasListItem}
                    isMenuOpen={isMenuOpen}
                />
            )}

            <NavGroupItemButton
                item={item}
                parent={parent}
                navCollapsed={navCollapsed}
                currentActiveGroup={currentActiveGroup}
                isGroupActive={isGroupActive}
            />
            <NavGroupCollapse
                item={item}
                parent={parent}
                isGroupActive={isGroupActive}
                navCollapsed={navCollapsed}
                hasListItem={hasListItem}
            />
        </NavGroupStyled.ListItem>
    );
}
