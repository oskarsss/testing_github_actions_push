import { usePermissions } from '@/store/app/hooks';
import type { SaveLayoutSettingsType, LayoutSettingsType } from '@/context/LayoutSettingsContext';
import NavGroup from '@/layouts/UserLayout/Navigation/components/NavGroup/NavGroup';
import {
    GroupName,
    NAVIGATION_MAP
} from '@/layouts/UserLayout/Navigation/components/NavItems/permissions';
import NavLink, { type Item } from '../NavLink/NavLink';

export interface NavItemsProps {
    currentActiveGroup: string[];
    groupActive: string[];
    settings: LayoutSettingsType;
    saveSettings: SaveLayoutSettingsType;
    setCurrentActiveGroup: (group: string[]) => void;
    setGroupActive: (group: string[]) => void;
    navCollapsed: LayoutSettingsType['navCollapsed'];
    navItems: Item[];
}

export default function NavItems({
    currentActiveGroup,
    groupActive,
    settings,
    saveSettings,
    setCurrentActiveGroup,
    setGroupActive,
    navCollapsed,
    navItems
}: NavItemsProps) {
    const { permissions } = usePermissions();

    if (!permissions) {
        return null;
    }

    const hasListItem = (item: Item) =>
        item ? permissions[item?.permission_name || ''] || false : true;

    const hasGroupName = (group_name: GroupName) => {
        const group = NAVIGATION_MAP[group_name];

        return group ? group.some((permission) => permissions[permission || '']) || false : true;
    };

    return navItems?.map((item) => {
        if (item.children) {
            return (
                <NavGroup
                    key={item.id}
                    item={item}
                    hasGroupName={hasGroupName}
                    hasListItem={hasListItem}
                    currentActiveGroup={currentActiveGroup}
                    groupActive={groupActive}
                    settings={settings}
                    saveSettings={saveSettings}
                    setCurrentActiveGroup={setCurrentActiveGroup}
                    setGroupActive={setGroupActive}
                    navCollapsed={navCollapsed}
                    navItems={navItems}
                />
            );
        }

        return (
            <NavLink
                key={item.id}
                item={item}
                navCollapsed={navCollapsed}
                hasListItem={hasListItem}
            />
        );
    });
}
