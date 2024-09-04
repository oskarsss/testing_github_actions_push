import { styled } from '@mui/material/styles';

const status_chip_options = (mode: string) => ({
    green: {
        color   : mode === 'light' ? '#587051' : '#0D8F5F',
        bg_color: mode === 'light' ? '#F2FBEB' : '#0D8F5F1A'
    },
    blue: {
        color   : mode === 'light' ? '#285FF6' : '#6085f1',
        bg_color: mode === 'light' ? '#E3EFFE' : '#6085f11A'
    }
});

type Color = 'green' | 'blue';

export const Chip = styled('div')<{ color: Color }>(({
    theme,
    color
}) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    transition    : 'box-shadow 150ms',
    padding       : '0 7px 0 12px',
    minWidth      : '60px',
    width         : 'max-content',
    height        : '24px',
    maxHeight     : '32px',
    marginLeft    : '4px',
    borderRadius  : '50px',
    overflow      : 'hidden',

    span: {
        color: status_chip_options(theme.palette.mode)[color].color
    },

    '.MuiSvgIcon-root': {
        color: status_chip_options(theme.palette.mode)[color].color
    },

    backgroundColor: status_chip_options(theme.palette.mode)[color].bg_color
}));

export const Text = styled('span')({
    paddingLeft : '4px',
    paddingRight: '9px',
    fontSize    : '12px',
    fontWeight  : 600,

    // dont allow user to select
    WebkitUserSelect: 'none' /* Safari */,
    MozUserSelect   : 'none' /* Firefox */,
    msUserSelect    : 'none' /* IE10+/Edge */,
    userSelect      : 'none' /* Standard */
});
