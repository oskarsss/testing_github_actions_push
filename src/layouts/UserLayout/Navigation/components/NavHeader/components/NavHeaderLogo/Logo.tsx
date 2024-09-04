import { CSSProperties } from 'react';
import { getPublicURL } from '@/configs/storage';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import SYSTEM from '@/@system';

const { SmallLightIcon } = SYSTEM.ASSETS;

type Props = {
    size: number;
    logo_url?: string;
    dark_logo_url?: string;
    style?: CSSProperties;
};

export default function Logo({
    size,
    logo_url,
    dark_logo_url,
    style
}: Props) {
    const theme = useTheme();
    const { mode } = theme.palette;
    const hasLogoUrl = theme.palette.mode === 'dark' ? Boolean(dark_logo_url) : Boolean(logo_url);

    return hasLogoUrl ? (
        <img
            src={getPublicURL(mode === 'dark' && dark_logo_url ? dark_logo_url : logo_url)}
            height={size}
            width={size}
            style={style}
            alt="logo"
        />
    ) : (
        <Box
            sx={{
                svg: {
                    width         : '32px',
                    height        : '32px',
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'center'
                }
            }}
        >
            <SmallLightIcon />
        </Box>
    );
}
