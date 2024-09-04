import { MouseEvent } from 'react';
import NavHeaderStyled from '@/layouts/UserLayout/Navigation/components/NavHeader/styled';
import Logo from '@/layouts/UserLayout/Navigation/components/NavHeader/components/NavHeaderLogo/Logo';
import { Box, useTheme } from '@mui/material';
import SYSTEM from '@/@system';

const { SmallLightIcon } = SYSTEM.ASSETS;

type Props = {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    logo_url?: string;
    dark_logo_url?: string;
};

export default function NavHeaderLogo({
    onClick,
    logo_url,
    dark_logo_url
}: Props) {
    const theme = useTheme();
    const hasLogoUrl = theme.palette.mode === 'dark' ? Boolean(dark_logo_url) : Boolean(logo_url);

    return (
        <NavHeaderStyled.ButtonLogo onClick={onClick}>
            {hasLogoUrl ? (
                <Logo
                    size={34}
                    logo_url={logo_url}
                    dark_logo_url={dark_logo_url}
                />
            ) : (
                <Box
                    sx={{
                        svg: {
                            width : '34px',
                            height: '34px'
                        }
                    }}
                >
                    <SmallLightIcon />
                </Box>
            )}
        </NavHeaderStyled.ButtonLogo>
    );
}
