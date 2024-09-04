import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useRouter } from 'next/router';
import MenuComponents from '@/@core/ui-kits/menus';
import { LoadsIcon, SchedulingIcon } from '@/@core/icons/custom-nav-icons/icons';
import TripInformationStyled from '@/@core/ui-kits/profiles/components/trip-information/TripInformation.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { openNewWindowWithQueryParams } from '@/utils/open-new-window';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    reference_id: string;
    truckId: string;
};

export const useTruckLoadsMenu = menuHookFabric(TruckLoadsMenu);

export default function TruckLoadsMenu({
    reference_id,
    truckId
}: Props) {
    const { t } = useAppTranslation();
    const menu = useTruckLoadsMenu(true);

    const transitionToScheduling = () => {
        openNewWindowWithQueryParams('dispatch/scheduling', {
            search: reference_id
        });
        menu.close();
    };

    const transitionToLoads = () => {
        openNewWindowWithQueryParams(APP_ROUTES_CONFIG.dispatch.orders.path, {
            truck: [truckId]
        });
        menu.close();
    };

    return (
        <MenuComponents.List>
            <TripInformationStyled.MenuItem onClick={transitionToScheduling}>
                <SchedulingIcon /> {t('trucks:profile.left.menu.loads.list.schedule')}
            </TripInformationStyled.MenuItem>

            <TripInformationStyled.MenuItem onClick={transitionToLoads}>
                <LoadsIcon /> {t('trucks:profile.left.menu.loads.list.loads')}
            </TripInformationStyled.MenuItem>
        </MenuComponents.List>
    );
}
