import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import { Box, styled } from '@mui/material';

const VerticalLayoutWrapper = styled('div')({
    height : '100%',
    display: 'flex'
});

const ReactHotToast = styled(Box)(({ theme }) => {
    // ** Hook & Var
    const { settings } = useLayoutSettings();
    const {
        layout,
        navHidden
    } = settings;

    return {
        '& > div': {
            left  : `${theme.spacing(6)} !important`,
            right : `${theme.spacing(6)} !important`,
            bottom: `${theme.spacing(6)} !important`,
            top   : layout === 'horizontal' && !navHidden ? '139px !important' : '75px !important'
        },
        '& .react-hot-toast': {
            fontWeight   : 400,
            fontSize     : '1rem',
            borderRadius : '5px',
            letterSpacing: '0.14px',
            zIndex       : theme.zIndex.snackbar,
            color        : theme.palette.semantic.text.primary,
            background   : theme.palette.semantic.background.white,
            boxShadow:
                theme.palette.mode === 'light'
                    ? '0px 4px 10px -4px rgb(58 53 65 / 60%)'
                    : '0px 8px 16px -4px rgb(19 17 32 / 65%)',
            '&>:first-of-type:not([role])>:first-of-type': {
                width : 14,
                height: 14
            }
        }
    };
});

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow                      : 1,
    minWidth                      : 0,
    display                       : 'flex',
    minHeight                     : '100vh',
    flexDirection                 : 'column',
    width                         : '100%',
    transition                    : 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft : theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));

const UserLayoutStyled = {
    VerticalLayoutWrapper,
    ReactHotToast,
    ContentWrapper
};

export default UserLayoutStyled;
