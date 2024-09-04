import NavigationStyled from '@/layouts/UserLayout/Navigation/styled';
import NavHeaderStyled from '@/layouts/UserLayout/Navigation/components/NavHeader/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    name: string;
    dot?: number | string;
    navCollapsed: boolean;
};

export default function NavHeaderDescription({
    name,
    dot,
    navCollapsed
}: Props) {
    const menuCollapsedStyles = navCollapsed ? { opacity: 0, display: 'none' } : { opacity: 1 };
    const { t } = useAppTranslation('navigation');
    return (
        <NavHeaderStyled.Wrap sx={menuCollapsedStyles}>
            <NavigationStyled.Text>{name}</NavigationStyled.Text>

            {dot !== 0 && (
                <NavHeaderStyled.DotText>
                    {t('dot')} <span>{dot}</span>
                </NavHeaderStyled.DotText>
            )}
        </NavHeaderStyled.Wrap>
    );
}
