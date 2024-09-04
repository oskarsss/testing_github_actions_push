import NavGroupStyled from '@/layouts/UserLayout/Navigation/components/NavGroup/styled';
import UserIcon from '@/layouts/UserLayout/components/UserIcon';
import Translations from '@/layouts/UserLayout/components/Translations';
import { Item } from '@/layouts/UserLayout/Navigation/components/NavLink/NavLink';
import clsx from 'clsx';

type Props = {
    item: Item;
    parent?: Item;
    navCollapsed: boolean;
    currentActiveGroup: string[];
    isGroupActive: boolean;
};

export default function NavGroupItemButton({
    item,
    parent,
    navCollapsed,
    currentActiveGroup,
    isGroupActive
}: Props) {
    const isActive = currentActiveGroup.includes(item.title);

    return (
        <NavGroupStyled.ListItemButton
            className={clsx({ 'Mui-selected': isActive, ListItemBtn: true })}
        >
            <NavGroupStyled.ListItemIcon
                isParent={!!parent}
                isCollapsed={navCollapsed}
                isChildren={!!item.children}
            >
                <UserIcon
                    icon={item.icon}
                    iconProps={{
                        sx: { ...(parent ? { fontSize: '0.875rem' } : {}) },
                        isActive
                    }}
                />
            </NavGroupStyled.ListItemIcon>
            <NavGroupStyled.MenuItemTextWrapper isCollapsed={navCollapsed}>
                <NavGroupStyled.TypographyTitle
                    is_active={isActive}
                    isCollapsed={navCollapsed}
                >
                    <Translations text={item.title} />
                </NavGroupStyled.TypographyTitle>
                {!navCollapsed && (
                    <NavGroupStyled.Box>
                        <NavGroupStyled.MenuGroupToggleRightIcon isGroupActive={isGroupActive} />
                    </NavGroupStyled.Box>
                )}
            </NavGroupStyled.MenuItemTextWrapper>
        </NavGroupStyled.ListItemButton>
    );
}
