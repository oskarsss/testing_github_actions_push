import { Control, Controller, Path, FieldValues, useController } from 'react-hook-form';
import TextField, { TextFieldVariants } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { CSSProperties } from 'react';
import { InputProps } from '@mui/material/Input/Input';
import { TestKey } from '@/configs/tests';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { InputAdornment } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
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
    allowNegative?: boolean;
    allowLeadingZeros?: boolean;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
    isAllowed?: NumericFormatProps['isAllowed'];
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    customInput?: React.ComponentType<InputBaseComponentProps>;
}

export default function NumericInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    placeholder,
    size = 'small',
    width = '100%',
    inputProps = {},
    autoFocus,
    required = false,
    disabled = false,
    testID,
    readonly = false,
    variant = 'filled',
    step = 0.01,
    allowNegative = true,
    allowLeadingZeros = true,
    fixedDecimalScale = false,
    decimalScale = 2,
    isAllowed,
    startAdornment,
    endAdornment,
    customInput = TextField as NumericFormatProps<InputBaseComponentProps>['customInput']
}: TextInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        fieldState: { error }
    } = useController({ name, control });
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
                    <NumericFormat
                        allowNegative={allowNegative}
                        allowLeadingZeros={allowLeadingZeros}
                        fixedDecimalScale={fixedDecimalScale}
                        decimalScale={decimalScale}
                        isAllowed={isAllowed}
                        name={name}
                        variant={variant}
                        size={size}
                        width={width}
                        label={t(label)}
                        onBlur={onBlur}
                        value={value ? Number(value) : ''}
                        onChange={(e) => onChange(Number(e.target.value))}
                        disabled={disabled}
                        required={required}
                        autoFocus={autoFocus}
                        placeholder={t(placeholder)}
                        error={Boolean(error)}
                        readOnly={readonly}
                        aria-describedby={`stepper-linear-${name}`}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                            if (e.code === 'ArrowUp') {
                                const numberValue = +(Number(value) + step).toFixed(decimalScale);
                                onChange(numberValue);
                            }
                            if (e.code === 'ArrowDown') {
                                const numberValue = +(Number(value) - step).toFixed(decimalScale);
                                if (!allowNegative && numberValue < 0) {
                                    onChange(0);
                                    return;
                                }
                                onChange(numberValue);
                            }
                        }}
                        InputProps={{
                            startAdornment: startAdornment ? (
                                <InputAdornment position="start">{startAdornment}</InputAdornment>
                            ) : undefined,
                            endAdornment: endAdornment ? (
                                <InputAdornment position="end">{endAdornment}</InputAdornment>
                            ) : undefined,
                            ...inputProps,
                            inputProps: {
                                autoComplete: 'off',
                                ...inputProps?.inputProps,
                                [TestKey]   : testID
                            }
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        customInput={customInput}
                    />
                )}
            />
            {error && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
