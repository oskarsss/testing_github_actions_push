import React, { CSSProperties } from 'react';
import moment from 'moment-timezone';
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
interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    rules?: Rules;
    placeholder?: IntlMessageKey;
    disableUnderline?: boolean;
    forcePopupIcon?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

export default function TimezoneSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    width = '50%',
    variant = 'filled',
    size = 'small',
    readOnly = false,
    rules,
    placeholder,
    disableUnderline = false,
    forcePopupIcon = true,
    required = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();

    const options = moment.tz.zonesForCountry('US', true).map((tz) => ({
        name : `(GMT+${tz.offset / 60}) ${tz.name}`,
        value: tz.name
    }));

    const getHelperText = () => (
        <FormHelperText
            sx={{ color: 'error.main' }}
            id={`select-input-${name}`}
        >
            <span>{errors[name]?.message}</span>
        </FormHelperText>
    );

    return (
        <FormControl
            style={{ width }}
            variant={variant}
        >
            <Controller
                name={name}
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
                        renderOption={(props, option) => (
                            <Box
                                component="li"
                                {...props}
                                key={props.key || option.value}
                            >
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size={size}
                                required={required}
                                variant={variant}
                                InputProps={{
                                    ...params.InputProps,
                                    disableUnderline
                                }}
                                label={t(label)}
                                placeholder={t(placeholder || '')}
                                error={Boolean(errors[name])}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        )}
                        onChange={(e, data) => onChange(data?.value || null)}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors[name] && getHelperText()}
        </FormControl>
    );
}
