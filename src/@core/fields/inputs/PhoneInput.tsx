import { CSSProperties } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css';
import MaskedPhoneInput from 'react-phone-number-input';
import { styled } from '@mui/material/styles';
import { Control, Controller, ErrorOption, FieldValues, Path } from 'react-hook-form';
import { applyTestId } from '@/configs/tests';
import InputLabel from '@mui/material/InputLabel';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const PhoneInputStyled = styled(MaskedPhoneInput)(({
    theme,
    countrySelectComponent
}) => ({
    '& input::selection': {
        backgroundColor: theme.palette.semantic.foreground.brand.secondary,
        color          : theme.palette.semantic.text.primary
    },
    '.PhoneInputCountry, .PhoneInputInput': {
        paddingLeft    : 14,
        marginRight    : 0,
        borderRadius   : '4px 0 0 0',
        backgroundColor: `${theme.palette.semantic.foreground.secondary}`,
        border         : 'none',
        borderBottom   : `1px solid ${theme.palette.semantic.foreground.secondary}`,
        '&:hover'      : {
            backgroundColor: theme.palette.semantic.foreground.secondary
        }
    },

    '.PhoneInputCountry': {
        paddingTop: 18,

        'select:focus + div': {
            boxShadow: `0 0 0 1px ${theme.palette.semantic.foreground.brand.primary}, inset 0 0 0 1px ${theme.palette.semantic.foreground.brand.primary}`,

            '& + .PhoneInputCountrySelectArrow': {
                color: theme.palette.semantic.foreground.brand.primary
            }
        }
    },

    '.PhoneInputInput': {
        height      : 48,
        fontSize    : 'inherit',
        color       : 'inherit',
        borderRadius: '0 4px 0 0',
        paddingTop  : 20,
        paddingLeft : countrySelectComponent ? 12 : 7,
        '&:focus'   : {
            outline: 'none'
        }
    },
    '.PhoneInputCountrySelectArrow': {
        margin: '0 10px'
    },

    '&.PhoneInput--focus + label': {
        color: theme.palette.semantic.text.brand.primary
    }
}));

interface PhoneInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label: string | IntlMessageKey;
    name: Path<TFieldValues>;
    placeholder: string | IntlMessageKey;
    required?: boolean;
    width?: CSSProperties['width'];
    hideCountrySelect?: boolean;
    testID?: string;
    disabled?: boolean;
}

export default function PhoneInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    testID = '',
    width = '50%',
    hideCountrySelect,
    disabled = false,
    required = false
}: PhoneInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                render={({ field: {
                    value,
                    onChange,
                    onBlur
                } }) => (
                    <>
                        <PhoneInputStyled
                            {...applyTestId(testID)}
                            name={name}
                            value={value}
                            onChange={(value) => onChange(value || '')}
                            onBlur={onBlur}
                            disabled={disabled}
                            countrySelectComponent={hideCountrySelect ? () => null : undefined}
                            defaultCountry="US"
                            numberInputProps={{
                                label      : t(label),
                                placeholder: t(placeholder)
                            }}
                        />

                        <InputLabel
                            shrink
                            required={required}
                            sx={{ top: 12, left: -1 }}
                        >
                            {t(label)}
                        </InputLabel>
                    </>
                )}
            />
            {errors[name] && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    {errors[name]?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}
