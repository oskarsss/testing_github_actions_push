import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';
import MuiKeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Divider = styled(MuiDivider)(({ theme }) => ({
    margin      : 0,
    width       : 'calc(100% + 32px)',
    marginLeft  : -16,
    height      : 1,
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

const ContainerSecondStep = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    gap           : 16,
    width         : '100%',
    minHeight     : 200,
    alignItems    : 'center',
    justifyContent: 'center',

    p: {
        textAlign : 'center',
        lineHeight: 1.4,
        margin    : 0,
        maxWidth  : 350,
        span      : {
            cursor    : 'pointer',
            color     : theme.palette.semantic.foreground.brand.primary,
            transition: 'color 0.2s ease-in-out',

            '&:hover': {
                color: theme.palette.semantic.foreground.brand.secondary
            }
        }
    },

    svg: {
        color: theme.palette.semantic.text.secondary
    }
}));

const ContainerDateRange = styled('div')(({ theme }) => ({
    width        : '100%',
    display      : 'flex',
    flexDirection: 'column',
    gap          : 8,
    padding      : '4px 0px',

    '.MuiFormGroup-root': {
        flexDirection: 'row',
        rowGap       : 9,
        columnGap    : 16,

        '.MuiFormControlLabel-root': {
            width      : 'calc(50% - 8px)',
            marginRight: 0,
            marginLeft : -2,

            '.MuiButtonBase-root': {
                padding    : 0,
                marginRight: 8
            },

            '.MuiTypography-root': {
                fontSize     : 14,
                fontWeight   : 400,
                lineHeight   : '166%',
                letterSpacing: 0.4,
                color        : theme.palette.semantic.text.primary,

                display       : 'flex',
                gap           : 8,
                alignItems    : 'center',
                justifyContent: 'space-between',

                width: '100%',

                p: { margin: 0 },

                span: {
                    color: theme.palette.semantic.text.secondary
                }
            }
        }
    },

    h5: {
        fontSize  : 18,
        fontWeight: 600,
        lineHeight: '150%',
        margin    : 0
    }
}));

const ContainerParameters = styled('div')({
    width        : '100%',
    paddingLeft  : '20px',
    paddingTop   : '20px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : 12
});

const KeyboardArrowDownIcon = styled(MuiKeyboardArrowDownIcon)(({ theme }) => ({
    color: `${theme.palette.semantic.border.secondary} !important`
}));

export const ExportDialogStyled = {
    Divider,
    KeyboardArrowDownIcon,
    Container: {
        SecondStep: ContainerSecondStep,
        DateRange : ContainerDateRange,
        Parameters: ContainerParameters
    }
};
