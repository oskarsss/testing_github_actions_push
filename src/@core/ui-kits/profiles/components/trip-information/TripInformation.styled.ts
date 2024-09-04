import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import MenuItemMui from '@mui/material/MenuItem';

const Grid = styled('div')(({ theme }) => ({
    display            : 'flex',
    flexDirection      : 'row',
    alignItems         : 'center',
    justifyContent     : 'space-between',
    width              : '100%',
    margin             : '15px auto 0',
    border             : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius       : 8,
    textAlign          : 'center',
    '.MuiTypography-h5': {
        color       : theme.palette.semantic.text.brand.primary,
        fontWeight  : 700,
        marginBottom: 2
    },
    '.MuiTypography-body1': {
        color     : theme.palette.semantic.text.secondary,
        fontSize  : 12,
        fontWeight: 600
    }
}));

const InformationWrapper = styled('div')(({ theme }) => ({
    width            : '50%',
    padding          : '8px 12px',
    position         : 'relative',
    '&:first-of-type': {
        borderRight: `1px solid ${theme.palette.semantic.border.secondary}`
    }
}));

const InformationWrapperButton = styled(MuiIconButton)<{ clickable: boolean }>(({ clickable }) => ({
    cursor        : clickable ? 'pointer' : 'default',
    border        : 'none',
    padding       : 0,
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    gap           : '8px',
    justifyContent: 'center',

    // color         : clickable ? '#285FF6' : 'rgba(40, 95, 246, 0.5)',
    '&:hover': {
        background: 'none'
    }
}));

const MenuItem = styled(MenuItemMui)(({ theme }) => ({
    fill      : theme.palette.semantic.foreground.brand.primary,
    gap       : '10px',
    width     : '180px',
    fontWeight: 500
}));

const TripInformationStyled = {
    Grid,
    InformationWrapper,
    InformationWrapperButton,
    MenuItem
};

export default TripInformationStyled;
