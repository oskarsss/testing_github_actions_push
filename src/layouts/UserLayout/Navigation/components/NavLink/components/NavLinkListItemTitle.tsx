import NavLinkStyled from '@/layouts/UserLayout/Navigation/components/NavLink/styled';
import Translations from '@/layouts/UserLayout/components/Translations';
import NavigationStyled from '@/layouts/UserLayout/Navigation/styled';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    navCollapsed?: boolean;
    isNavLinkActive: boolean;
    title: IntlMessageKey;
};

export default function NavLinkListItemTitle({
    navCollapsed = false,
    isNavLinkActive,
    title
}: Props) {
    return (
        <NavigationStyled.MenuItemTextMetaWrapper isCollapsed={navCollapsed}>
            <NavLinkStyled.ItemTitle
                isBold={isNavLinkActive}
                isCollapsed={navCollapsed}
            >
                <Translations text={title} />
            </NavLinkStyled.ItemTitle>
        </NavigationStyled.MenuItemTextMetaWrapper>
    );
}
