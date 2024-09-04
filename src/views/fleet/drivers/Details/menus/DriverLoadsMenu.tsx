import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useRouter } from 'next/router';
import MenuItemMui from '@mui/material/MenuItem';
import MenuComponents from '@/@core/ui-kits/menus';
import { LoadsIcon, SchedulingIcon } from '@/@core/icons/custom-nav-icons/icons';
import { styled } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { openNewWindowWithQueryParams } from '@/utils/open-new-window';
import { FilterIdMap } from '@/@core/components/filters/types';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

const MenuItem = styled(MenuItemMui)(({ theme }) => ({
    fill      : theme.palette.semantic.foreground.brand.primary,
    gap       : '10px',
    width     : '180px',
    fontWeight: 500
}));

type MenuProps = {
    driverId: string;
    driverName: string;
};

export const useDriverLoadsMenu = menuHookFabric(DriverLoadsMenu);

export default function DriverLoadsMenu({
    driverId,
    driverName
}: MenuProps) {
    const { t } = useAppTranslation();
    const menu = useDriverLoadsMenu(true);

    const transitionToScheduling = () => {
        openNewWindowWithQueryParams('dispatch/scheduling', {
            search: driverName
        });
        menu.close();
    };

    const transitionToLoads = () => {
        openNewWindowWithQueryParams(APP_ROUTES_CONFIG.dispatch.orders.path, {
            driver: [driverId]
        });
        menu.close();
    };

    return (
        <MenuComponents.List>
            <MenuItem onClick={transitionToLoads}>
                <LoadsIcon />{' '}
                {t('drivers:profile.left.header.trip_information.menu.loads.list.loads')}
            </MenuItem>

            <MenuItem onClick={transitionToScheduling}>
                <SchedulingIcon />{' '}
                {t('drivers:profile.left.header.trip_information.menu.loads.list.schedule')}
            </MenuItem>
        </MenuComponents.List>
    );
}
