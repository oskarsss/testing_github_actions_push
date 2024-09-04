import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { Components, Theme } from '@mui/material';

const SvgIcon = (
    theme: Theme,
    skin: LayoutSettingsType['skin']
): Components<Omit<Theme, 'components'>> => ({
    MuiSvgIcon: {
        variants: [
            {
                props: { color: 'primary' },
                style: {
                    fill : theme.palette.semantic.foreground.brand.primary,
                    color: theme.palette.semantic.foreground.brand.primary
                }
            }
        ],
        styleOverrides: {
            colorPrimary: {
                fill : theme.palette.semantic.foreground.brand.primary,
                color: theme.palette.semantic.foreground.brand.primary
            },
            colorSecondary: {
                fill: theme.palette.semantic.foreground.primary
            }
        }
    },
    MuiCircularProgress: {
        styleOverrides: {
            colorPrimary: {
                color: theme.palette.semantic.foreground.brand.primary
            },
            colorSecondary: {
                color: theme.palette.semantic.foreground.primary
            }
        }
    }
});

export default SvgIcon;
