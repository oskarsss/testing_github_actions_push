import { styled, IconButton } from '@mui/material';

const Button = styled(IconButton)(({
    theme,
    color
}) => ({
    padding     : '6px',
    boxSizing   : 'border-box',
    height      : '33px !important',
    width       : '33px !important',
    borderRadius: '12px',
    backgroundColor:
        color === 'error'
            ? theme.palette.utility.foreground.error.secondary
            : theme.palette.semantic.foreground.brand.secondary,

    '& svg': {
        fontSize: '18px',
        width   : '18px',
        height  : '18px',

        fill:
            color === 'error'
                ? theme.palette.utility.foreground.error.primary
                : theme.palette.semantic.foreground.brand.primary
    }
}));

const TrackingOverviewButtonsStyled = {
    Button
};

export default TrackingOverviewButtonsStyled;
