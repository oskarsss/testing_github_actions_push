// ** React Imports
import { MouseEvent } from 'react';

import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import NavHeaderStyled from '@/layouts/UserLayout/Navigation/components/NavHeader/styled';
import NavHeaderContent from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderContent';
import NavHeaderButton from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderButton';
import { useAccountCompanies } from '@/store/app/hooks';
import { useHeaderMenu } from '../../menus/HeaderMenu';

type Props = {
    navCollapsed: LayoutSettingsType['navCollapsed'];
};

const NavHeader = ({ navCollapsed }: Props) => {
    const menu = useHeaderMenu();
    const { company } = useAccountCompanies();

    const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
        if (!company) return;
        menu.open({})(event);
    };

    return (
        <NavHeaderStyled.HeaderWrapper>
            <NavHeaderContent
                navCollapsed={navCollapsed}
                onClick={openMenu}
                company={company}
            />

            <NavHeaderButton
                navCollapsed={navCollapsed}
                onClick={openMenu}
            />
        </NavHeaderStyled.HeaderWrapper>
    );
};

export default NavHeader;
