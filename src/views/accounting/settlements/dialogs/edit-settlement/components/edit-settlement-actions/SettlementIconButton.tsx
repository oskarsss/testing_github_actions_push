import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';

export const SettlementButton = styled(MuiButton)({
    height      : '24px',
    minWidth    : 0,
    padding     : '0px 10px',
    borderRadius: '4px',
    fontSize    : '12px',
    fontWeight  : 500,

    '.MuiButton-icon.MuiButton-startIcon': {
        mr : '4px',
        svg: {
            width : '16px',
            height: '16px'
        }
    }
});

const SettlementIconButton = styled(MuiIconButton)(({
    theme,
    disabled
}) => ({
    width       : '24px',
    height      : '24px',
    padding     : 0,
    borderRadius: '4px',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    opacity     : disabled ? 0.5 : 1,

    svg: {
        width : '16px',
        height: '16px',
        fill  : theme.palette.semantic.foreground.primary,

        path: {
            fill: theme.palette.semantic.foreground.primary
        }
    }
}));

export default SettlementIconButton;
