/* eslint-disable react/jsx-no-duplicate-props */
import React, { CSSProperties, useMemo } from 'react';
import {
    Control,
    Controller,
    ErrorOption,
    Path,
    ValidationRule,
    FieldValues
} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { TestIDs, TestKey, applyTestId } from '@/configs/tests';
import { Countries, Country } from '@/models/country/country';
import {
    MEXICAN_STATES,
    OPTIONS_STATES,
    PROVINCES_AND_TERRITORIES_CANADA,
    USA_STATES
} from '@/configs/states';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Rules = {
    required: {
        value: boolean;
        message: string;
    };
    maxLength: ValidationRule<number> | undefined;
    pattern: ValidationRule<RegExp> | undefined;
};
interface TextSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: string; // Path<TFieldValues>
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    rules?: Rules;
    placeholder?: IntlMessageKey;
    disableUnderline?: boolean;
    forcePopupIcon?: boolean;
    readOnly?: boolean;
    testID?: string;
    required?: boolean;
    country?: Country;
}

export default function StateSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    country = 'US',
    width = '50%',
    variant = 'filled',
    size = 'small',
    readOnly = false,
    rules,
    placeholder,
    disableUnderline = false,
    forcePopupIcon = true,
    required = false,
    testID
}: TextSelectProps<TFieldValues>) {
    const { t } = useAppTranslation();

    const getHelperText = () => (
        <FormHelperText
            sx={{ color: 'error.main' }}
            id={`select-input-${name}`}
            error
        >
            <span>{errors[name]?.message}</span>
        </FormHelperText>
    );

    const options: { name: string; value: string }[] = useMemo(() => {
        if (country === Countries.MEXICO) {
            return MEXICAN_STATES.map((state) => ({
                name : t(`common:states.MX.${state.value}`),
                value: state.value
            }));
        }

        if (country === Countries.CANADA) {
            return PROVINCES_AND_TERRITORIES_CANADA.map((state) => ({
                name : t(`common:states.CA.${state.value}`),
                value: state.value
            }));
        }

        if (country === Countries.US) {
            return USA_STATES.map((state) => ({
                name : t(`common:states.US.${state.value}`),
                value: state.value
            }));
        }

        return [];
    }, [country, t]);

    return (
        <FormControl
            style={{ width }}
            variant={variant}
        >
            <Controller
                name={name as Path<TFieldValues>}
                control={control}
                rules={rules}
                render={({ field: {
                    onChange,
                    onBlur,
                    value
                } }) => (
                    <Autocomplete
                        options={options}
                        isOptionEqualToValue={(option, val) => option.value === val.value}
                        getOptionLabel={(option) => option.name}
                        value={options.find((option) => option.value === value) || null}
                        openOnFocus
                        readOnly={readOnly}
                        forcePopupIcon={forcePopupIcon}
                        renderOption={(props, option) => {
                            const updatedProps = {
                                ...props,
                                key: option.value
                            };
                            return (
                                <Box
                                    {...applyTestId(
                                        `${TestIDs.components.select.state.optionPrefix}`
                                    )}
                                    component="li"
                                    {...updatedProps}
                                >
                                    {option.name}
                                </Box>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={size}
                                variant={variant}
                                required={required}
                                label={t(label)}
                                placeholder={t(placeholder || '')}
                                error={Boolean(errors[name])}
                                onKeyDown={(e) => e.stopPropagation()}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline
                                }}
                                inputProps={{
                                    ...params.inputProps,
                                    [TestKey]: testID
                                }}
                            />
                        )}
                        onChange={(e, data) => onChange(data?.value || '')}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors[name] && getHelperText()}
        </FormControl>
    );
}
