import NavGroupItemStyled from '@/layouts/UserLayout/Navigation/components/NavGroupItem/styled';
import Translations from '@/layouts/UserLayout/components/Translations';
import NavigationStyled from '@/layouts/UserLayout/Navigation/styled';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    isSubToSub: boolean;
    isNavLinkActive: boolean;
    navCollapsed: boolean;
    title: IntlMessageKey;
};

export default function NavGroupItemTitle({
    isSubToSub,
    isNavLinkActive,
    navCollapsed,
    title
}: Props) {
    return (
        <NavigationStyled.MenuItemTextMetaWrapper isSubToSub={isSubToSub}>
            <NavGroupItemStyled.ItemTitle
                isBold={isNavLinkActive}
                isCollapsed={navCollapsed}
            >
                <Translations text={title} />
            </NavGroupItemStyled.ItemTitle>
        </NavigationStyled.MenuItemTextMetaWrapper>
    );
}
