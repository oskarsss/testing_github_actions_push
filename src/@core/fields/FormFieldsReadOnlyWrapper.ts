import { styled } from '@mui/material/styles';

const FormFieldsReadOnlyWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'enabled'
})<{ enabled: boolean }>(({ enabled }) => ({
    ...(enabled
        ? {
            '.MuiInputBase-root': {
                backgroundColor: 'transparent !important',

                '&:before': {
                    borderBottomColor: 'transparent !important'
                },
                '&:after': {
                    borderBottomColor: 'transparent !important'
                }
            },
            fieldset: {
                borderColor: 'transparent !important'
            },
            '.PhoneInputCountry, .PhoneInputInput': {
                backgroundColor: 'transparent !important',
                border         : 'none !important'
            },
            '.PhoneInputCountrySelectArrow': {
                opacity: 0
            }
        }
        : {})
}));

export default FormFieldsReadOnlyWrapper;
