import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { InputAdornment } from '@mui/material';
import { CSSProperties } from 'react';
import { InputProps } from '@mui/material/Input/Input';
import { TestKey } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    placeholder: IntlMessageKey;
    size?: 'small' | 'medium';
    width?: CSSProperties['width'];
    inputProps?: InputProps;
    autoFocus?: boolean;
    required?: boolean;
    disabled?: boolean;
    testID?: string;
    readonly?: boolean;
    variant?: TextFieldVariants;
    step?: number;
    showZero?: boolean;
}

export default function AmountInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    size = 'small',
    width = '50%',
    inputProps = {},
    autoFocus,
    required = false,
    disabled = false,
    testID,
    readonly = false,
    variant = 'filled',
    step = 0.01,
    showZero = false
}: TextInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const returnTwoSymbolAfterDot = (value: string) => {
        if (value === '') {
            return +value;
        }

        const [integer, decimal] = value.split('.');

        return +(decimal ? +`${integer}.${decimal.slice(0, 2)}` : value);
    };

    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                render={({ field: {
                    value,
                    onChange
                } }) => (
                    <TextField
                        required={required}
                        type="number"
                        variant={variant}
                        value={showZero ? value : value || null}
                        label={t(label)}
                        size={size}
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            readOnly      : readonly,
                            ...inputProps,
                            inputProps    : {
                                step,

                                ...inputProps?.inputProps,
                                [TestKey]: testID
                            }
                        }}
                        onChange={(e) => onChange(returnTwoSymbolAfterDot(e.target.value))}
                        placeholder={t(placeholder)}
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
                    <span>{errors[name]?.message as string}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
