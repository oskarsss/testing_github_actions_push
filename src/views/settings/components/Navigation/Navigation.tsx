import { Fragment, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { usePermissions } from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { NAV_ITEMS, createSettingsRoute } from '../../nav_config';
import { Description } from './styled';

export default function Navigation() {
    const { t } = useAppTranslation();
    const { pathname } = useRouter();
    const { hasPermission } = usePermissions();

    const filteredNavItems = useMemo(() => {
        const items = NAV_ITEMS.map((item) => ({
            ...item,
            children: item.children.filter((child) => hasPermission(PERMISSIONS[child.permission]))
        }));

        return items.filter(({ children }) => children.length > 0);
    }, [hasPermission]);

    const checkSelectedRoute = (route: string) => {
        const routePath = createSettingsRoute(route);
        if (!route) {
            return pathname === routePath;
        }
        return (
            pathname === routePath || (pathname.includes(routePath) && pathname.includes('[id]'))
        );
    };

    return filteredNavItems.map(({
        title,
        children
    }, index) => {
        const lastItem = NAV_ITEMS.length === index + 1;
        return (
            <Fragment key={title}>
                <Description>{t(title)}</Description>
                {children.map(({
                    icon,
                    title,
                    id,
                    route
                }) => {
                    const routePath = createSettingsRoute(route);
                    const selected = checkSelectedRoute(route);
                    return (
                        <Link
                            key={id}
                            href={routePath}
                            id={selected ? 'settings-nav-selected' : ''}
                        >
                            <MenuItem selected={selected}>
                                <ListItemIcon
                                    sx={{
                                        svg: {
                                            fill: (theme) =>
                                                selected
                                                    ? undefined
                                                    : theme.palette.semantic.foreground.primary

                                            // : 'rgb(189, 199, 210)'
                                        }
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText>{t(title)}</ListItemText>
                            </MenuItem>
                        </Link>
                    );
                })}
                {!lastItem && (
                    <Divider
                        sx={{
                            margin     : '20px 0 !important',
                            borderColor: ({ palette }) => palette.semantic.border.primary
                        }}
                    />
                )}
            </Fragment>
        );
    });
}
