import { Button, Typography, styled } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
    fontSize  : '14px',
    fontWeight: 600
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize  : '12px',
    fontWeight: 500,
    color     : theme.palette.semantic.text.secondary
}));

const IconWrapper = styled('div')(({ theme }) => ({
    height: '36px',
    svg   : {
        width       : '40px',
        height      : '40px',
        borderRadius: '50%'
    }
}));

const SIZES_MAP: Record<string, React.CSSProperties['width']> = {
    normal: '35px',
    small : '25px'
} as const;

const ICONS_SIZES_MAP: Record<string, React.CSSProperties['width']> = {
    normal: '20px',
    small : '20px'
} as const;

const ActionButton = styled(Button)<{ size?: 'normal' | 'small'; kind: 'text' | 'common' }>(
    ({
        theme,
        size = 'normal',
        kind = 'common'
    }) => ({
        borderRadius: '6px',

        width: '100%',

        ...(kind !== 'text' && {
            maxWidth: `${SIZES_MAP[size]} !important`
        }),
        ...(kind === 'text' && {
            display              : 'flex',
            alignItems           : 'center',
            gap                  : '4px',
            '.MuiTypography-root': {
                [theme.breakpoints.down('xl')]: {
                    display : 'none',
                    maxWidth: `${SIZES_MAP[size]} !important`
                }
            }
        }),
        minWidth  : `${SIZES_MAP[size]} !important`,
        maxHeight : SIZES_MAP[size],
        minHeight : SIZES_MAP[size],
        transition: 'background-color 0.3s',

        padding: '4px 12px',

        svg: {
            width : ICONS_SIZES_MAP[size],
            height: ICONS_SIZES_MAP[size]
        },

        '&.primary': {
            background           : theme.palette.semantic.foreground.brand.secondary,
            '.MuiTypography-root': {
                color: theme.palette.semantic.foreground.brand.primary
            },
            svg: {
                fill: theme.palette.semantic.foreground.brand.primary
            },
            '&:hover': {
                background: theme.palette.semantic.foreground.brand.tertiary
            }
        },
        '&.error': {
            background           : theme.palette.utility.foreground.error.secondary,
            '.MuiTypography-root': {
                color: theme.palette.utility.foreground.error.primary
            },
            svg: {
                fill: theme.palette.utility.foreground.error.primary
            },
            '&:hover': {
                background: theme.palette.utility.foreground.error.tertiary
            }
        }
    })
);

const ManifestStyled = {
    Title,
    Subtitle,
    IconWrapper,
    ActionButton
};

export default ManifestStyled;
