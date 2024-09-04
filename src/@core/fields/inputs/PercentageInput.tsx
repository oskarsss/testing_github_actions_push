import { CSSProperties, useRef } from 'react';
import {
    Control,
    Controller,
    ErrorOption,
    Path,
    ValidationRule,
    FieldValues
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps } from '@mui/material/Input/Input';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { TestKey } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type Rules = {
    required: {
        value: boolean;
        message: string;
    };
    maxLength?: ValidationRule<number> | undefined;
    pattern?: ValidationRule<RegExp> | undefined;
};

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    inputProps?: InputProps;
    inputLabelProps?: InputLabelProps;
    placeholder?: IntlMessageKey;
    multiline?: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    disabled?: boolean;
    rules?: Rules;
    autoFocus?: boolean;
    required?: boolean;
    testID?: string;
}

export default function PercentageInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    width = '100%',
    inputProps = {},
    inputLabelProps = {},
    multiline = false,
    variant = 'filled',
    placeholder,
    size = 'small',
    disabled = false,
    required = false,
    rules,
    autoFocus = false,
    testID
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: {
                    value,
                    onChange
                } }) => (
                    <TextField
                        required={required}
                        type="number"
                        variant={variant}
                        value={value || null}
                        disabled={disabled}
                        placeholder={t(placeholder || '')}
                        label={t(label)}
                        multiline={multiline}
                        InputProps={{
                            ...inputProps,
                            inputProps: {
                                ...inputProps?.inputProps,
                                [TestKey]: testID
                            },
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            ref         : inputRef,
                            autoFocus   : true
                        }}
                        InputLabelProps={{
                            shrink: true,
                            ...inputLabelProps
                        }}
                        onChange={(e) =>
                            onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    value: (e.target.value && Number(e.target.value)) || 0
                                }
                            })}
                        size={size}
                        error={Boolean(errors[name])}
                        aria-describedby={`stepper-linear-${name}`}
                        onClickCapture={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        autoFocus={autoFocus}
                    />
                )}
            />
            {errors[name] && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
