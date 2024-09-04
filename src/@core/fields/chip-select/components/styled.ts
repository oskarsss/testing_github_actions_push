import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { IChipColors } from '@/@core/theme/chip';
import { ListItemIcon } from '@mui/material';
import ChipSelectTypes from '@/@core/fields/chip-select/components/types';

type ChipSelectButtonProps = {
    color_btn: IChipColors;
    custom_colors_without_theme?: ChipSelectTypes.CustomColors;
    size?: 'small' | 'medium';
};

export const ChipSelectButton = styled(Button)<ChipSelectButtonProps>(
    ({
        color_btn,
        theme,
        size = 'medium',
        custom_colors_without_theme
    }) => ({
        padding     : '4px 8px',
        height      : size === 'small' ? '20px' : '26px',
        borderRadius: '4px',
        width       : 'fit-content',

        backgroundColor:
            custom_colors_without_theme?.background ||

            // (theme.palette.isLight ? CHIP_COLORS[color_btn || 'gray']?.backgroundColor :
            theme.palette.utility.foreground[color_btn || 'gray']?.secondary,

        // ),

        ...(!custom_colors_without_theme?.background
            ? {
                '&:hover': {
                    backgroundColor:
                          theme.palette.utility.foreground[color_btn || 'gray']?.tertiary
                }
            }
            : {}),
        display   : 'flex',
        alignItems: 'center',
        gap       : 4,
        flexShrink: 0,

        span: {
            fontSize  : 12,
            fontWeight: 500,
            lineHeight: '10px',

            color:
                custom_colors_without_theme?.color ||

                // (theme.palette.isLight
                // ? CHIP_COLORS[color_btn || 'gray'].color
                // :
                theme.palette.utility.text[color_btn || 'gray'],

            // ),
            textTransform: 'none',
            display      : 'flex',
            alignItems   : 'center',
            textWrap     : 'nowrap'
        },

        svg: {
            marginRight: '0 !important',
            fontSize   : 16,
            width      : 16,
            height     : 16,
            color:
                custom_colors_without_theme?.color ||

                // (theme.palette.isLight
                // ? CHIP_COLORS[color_btn || 'gray'].color
                // :
                theme.palette.utility.foreground[color_btn || 'gray']?.primary

            // )
        }
    })
);

type ChipSelectWrapIconProps = {
    color_icon: IChipColors;
    custom_colors_without_theme?: ChipSelectTypes.CustomColors;
};

export const ChipSelectWrapIcon = styled(ListItemIcon)<ChipSelectWrapIconProps>(
    ({
        theme,
        color_icon,
        custom_colors_without_theme
    }) => ({
        minWidth: 'auto !important',
        svg     : {
            marginRight: '0 !important',
            width      : 16,
            height     : 16,

            color:
                custom_colors_without_theme?.color ||
                theme.palette.utility.foreground[color_icon || 'gray']?.primary,
            fill:
                custom_colors_without_theme?.color ||
                theme.palette.utility.foreground[color_icon || 'gray']?.primary
        }
    })
);

export const Container = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 'inherit'
});

export const Wrapper = styled('div')<{ fullWidth: boolean }>(({ fullWidth }) => ({
    ...(fullWidth
        ? {
            width     : '100%',
            height    : '100%',
            display   : 'flex',
            alignItems: 'center',
            padding   : '0 16px'
        }
        : {
            width: 'fit-content'
        })
}));
