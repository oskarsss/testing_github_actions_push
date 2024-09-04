import { styled } from '@mui/material';

export const Form = styled('form')(() => ({
    display       : 'flex',
    flexWrap      : 'wrap',
    columnGap     : '33px',
    rowGap        : '3.2vh',
    alignItems    : 'flex-end',
    justifyContent: 'space-between'
}));

export const PhoneInputWrapper = styled('div')<{ isEdit: boolean }>(({
    theme,
    isEdit
}) => ({
    position: 'relative',

    '.MuiFormLabel-root': {
        transform: 'translate(0, -1.5px) scale(0.75)',
        position : 'absolute',
        top      : 0,
        left     : 0
    },

    '.PhoneInputCountry': {
        paddingLeft: '0 !important'
    },

    '.MuiFormControl-root': {
        borderBottom     : '1px solid transparent',
        borderBottomColor: isEdit ? `${theme.palette.semantic.foreground.secondary}` : 'transparent'
    },

    '.PhoneInputCountry, .PhoneInputInput': {
        backgroundColor: 'transparent !important',
        border         : 'none !important',
        '&:hover'      : {
            backgroundColor: theme.palette.semantic.foreground.secondary
        }
    },
    '.PhoneInputCountrySelectArrow': {
        opacity: !isEdit ? 0 : 1
    }
}));
