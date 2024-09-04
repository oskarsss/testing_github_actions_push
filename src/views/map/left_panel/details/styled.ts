import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

export const Wrapper = styled('div')(() => ({
    width  : 500,
    padding: '30px 20px'
}));

export const HeadWrapper = styled('div')(({ theme }) => ({
    display       : 'flex',
    justifyContent: 'flex-start',
    alignItems    : 'flex-start',
    svg           : {
        fill       : theme.palette.semantic.foreground.brand.primary,
        marginRight: 15
    }
}));

export const IconBlock = styled('div')(({ theme }) => ({
    display       : 'flex',
    justifyContent: 'flex-start',
    alignItems    : 'center',
    fontWeight    : 500,
    marginBottom  : 5,
    svg           : {
        marginRight: 10
    },
    '.MuiTypography-root': {
        color: theme.palette.semantic.text.primary
    }
}));

export const DriversWrapper = styled('div')(({ theme }) => ({
    padding     : 10,
    marginTop   : 20,
    background  : theme.palette.semantic.background.white,
    borderRadius: 6
}));

export const DriversBlock = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center'
}));

export const Avatars = styled('div')(() => ({
    display       : 'flex',
    justifyContent: 'space-around'
}));

export const AvatarStyled = styled(Avatar)(() => ({
    width      : 44,
    height     : 44,
    marginRight: 10
}));

export const Btn = styled(LoadingButton)(({ theme }) => ({
    width                 : '100%',
    height                : 40,
    marginTop             : 40,
    border                : `1px solid ${theme.palette.semantic.border.secondary}`,
    fontSize              : 14,
    color                 : theme.palette.semantic.text.primary,
    textTransform         : 'none',
    '.MuiButton-startIcon': {
        svg: {
            fill: theme.palette.semantic.border.success.primary
        }
    }
}));

export const Back = styled(Button)(({ theme }) => ({
    width                 : 85,
    height                : 32,
    marginBottom          : 45,
    border                : `1px solid ${theme.palette.semantic.border.secondary}`,
    fontSize              : 14,
    color                 : theme.palette.semantic.text.primary,
    textTransform         : 'none',
    '.MuiButton-startIcon': {
        svg: {
            fontSize: 14
        }
    }
}));
