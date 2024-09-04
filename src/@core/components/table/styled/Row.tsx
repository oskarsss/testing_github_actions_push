import { styled } from '@mui/material/styles';

export const Row = styled('div')<{
    index: number;
    customRowHeight?: React.CSSProperties['height'];
    setCustomRowStyle?: React.CSSProperties;
}>(({
    theme,
    index,
    customRowHeight = '32px',
    setCustomRowStyle
}) => ({
    backgroundColor:
        // eslint-disable-next-line no-nested-ternary
        index % 2 === 0
            ? theme.palette.semantic.foreground.white.primary
            : theme.palette.semantic.foreground.secondary,

    // theme.palette.isLight
    //     ? 'rgb(233, 238, 250)'
    //     : theme.palette.semantic.foreground.six,
    borderBottom: `1px solid ${theme?.palette.semantic.border.primary}`,
    display     : 'flex',
    alignItems  : 'center',
    height      : customRowHeight,
    cursor      : 'pointer',

    overflow : 'hidden',
    '&:hover': {
        td: {
            filter: 'saturate(1.5)'
        }
    },
    ...setCustomRowStyle
}));

export const CellStyled = styled('div')<{ isSticky: boolean }>(({
    theme,
    isSticky
}) => ({
    ...(isSticky && {
        '&:last-child': {
            borderRight: `4px solid ${theme.palette.semantic.border.secondary} !important`
        }
    }),
    fontSize  : '0.875rem',
    textAlign : 'left',
    padding   : '6px 16px',
    height    : '100%',
    color     : theme.palette.semantic.text.secondary,
    whiteSpace: 'nowrap',
    overflow  : 'clip'
}));
