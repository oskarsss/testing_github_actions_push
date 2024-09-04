import { MouseEvent } from 'react';
import Tooltip from '@/layouts/UserLayout/Navigation/components/Tooltip/Tooltip';
import NavHeaderLogo from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderLogo/NavHeaderLogo';
import NavHeaderDescription from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderDescription';
import App from '@/store/app/types';
import NavHeaderStyled from '../styled';

export type HeaderComponentProps = {
    navCollapsed: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    company?: App.Company;
};

export default function NavHeaderContent({
    navCollapsed,
    onClick,
    company
}: HeaderComponentProps) {
    return (
        <NavHeaderStyled.Section>
            <Tooltip
                disableHoverListener={!navCollapsed}
                title={company?.name}
            >
                <span>
                    <NavHeaderLogo
                        onClick={onClick}
                        logo_url={company?.lightLogoUrl}
                        dark_logo_url={company?.darkLogoUrl}
                    />
                </span>
            </Tooltip>

            <NavHeaderDescription
                name={company?.name || '-'}
                dot={company?.dot}
                navCollapsed={navCollapsed}
            />
        </NavHeaderStyled.Section>
    );
}
