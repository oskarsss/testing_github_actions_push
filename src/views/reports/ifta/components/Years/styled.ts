import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import getScrollbarStyles from '@/utils/get-scrollbar-styles';

export const Container = styled(Stack)({
    flexDirection: 'row',
    flexWrap     : 'wrap',
    padding      : '16px',
    gap          : '16px',
    height       : '100%',
    width        : '100%',
    overflow     : 'hidden'
});

export const Wrapper = styled(Stack)(({ theme }) => ({
    width       : '100%',
    height      : '100%',
    flex        : 1,
    padding     : '10px',
    borderRadius: 6,
    background  : theme.palette.semantic.background.white,
    overflow    : 'auto',
    ...getScrollbarStyles(theme)
}));

export const YearBlock = styled(Box)(() => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '10px'
}));

export const List = styled('ul')(() => ({
    listStyle: 'none',
    display  : 'flex',
    flexWrap : 'wrap',
    gap      : 20,
    padding  : '32px 0 0 0',
    margin   : 0
}));

export const ListItem = styled('li')(({ theme }) => ({
    flex         : 1,
    display      : 'flex',
    flexDirection: 'column',
    gap          : 60,
    position     : 'relative',
    border       : `2px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius : 16,
    boxShadow    : '4px 4px 16px rgba(117, 135, 170, 0.2)'
}));

export const Tax = styled('div')({
    padding: '0 16px'
});

export const Indicator = styled('div')(({ theme }) => ({
    position    : 'absolute',
    left        : 0,
    top         : '50%',
    transform   : 'translate(0, -50%)',
    margin      : 'auto',
    width       : 8,
    height      : 300,
    borderRadius: '0px 8px 8px 0px',
    background  : theme.palette.semantic.background.brand
}));

export const DataBlock = styled('div')(({ theme }) => ({
    display               : 'flex',
    alignItems            : 'center',
    justifyContent        : 'flex-start',
    padding               : '32px 16px 0',
    gap                   : 16,
    '.MuiTypography-body1': {
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize   : 14,
            width      : 35,
            height     : 35,
            marginRight: 10
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            fontSize   : 16,
            width      : 45,
            height     : 45,
            marginRight: 12
        }
    },
    '.MuiTypography-h5': {
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: 14
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            fontSize: 16
        }
    }
}));

export const ButtonsBlock = styled('div')(({ theme }) => ({
    display              : 'flex',
    alignItems           : 'center',
    justifyContent       : 'space-between',
    gap                  : 10,
    padding              : '0 16px 32px',
    '.MuiButtonBase-root': {
        width                                  : '100%',
        minWidth                               : 110,
        padding                                : '8px 0',
        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: 10
        },
        [theme.breakpoints.between('lg', 'xl')]: {
            fontSize: 12
        },

        '.MuiButton-startIcon': {
            [theme.breakpoints.up('md')]: {
                marginRight: 4
            },
            svg: {
                [theme.breakpoints.between('md', 'lg')]: {
                    fontSize: 12
                },
                [theme.breakpoints.between('lg', 'xl')]: {
                    fontSize: 14
                }
            }
        }
    }
}));
