import MuiDivider from '@mui/material/Divider';
import { styled, Theme } from '@mui/material/styles';

export type PaperProps = {
    theme?: Theme;
    isFullVisible: boolean;
};

const Wrapper = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    flexGrow     : 0,
    overflow     : 'hidden',
    flexShrink   : 0
});

const Divider = styled(MuiDivider)(({ theme }) => ({
    width      : '100%',
    height     : 0,
    flexGrow   : 0,
    margin     : '8px auto',
    borderColor: theme.palette.semantic.border.primary
}));

const NavBottomStyled = {
    Wrapper,
    Divider
};

export default NavBottomStyled;
