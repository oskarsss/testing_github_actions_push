import FormControl from '@mui/material/FormControl';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps } from '@mui/material/Input/Input';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { CSSProperties, useRef } from 'react';
import { TestKey } from '@/configs/tests';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface NumberInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    inputProps?: InputProps;
    inputLabelProps?: InputLabelProps;
    placeholder: IntlMessageKey;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    rules?: Omit<
        RegisterOptions<TFieldValues, Path<TFieldValues>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    testID?: string;
}

export default function ControlledNumberInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    width = '50%',
    inputProps = {},
    inputLabelProps = {},
    variant = 'filled',
    placeholder,
    size = 'small',
    disabled = false,
    autoFocus = false,
    required = false,
    rules,
    testID
}: NumberInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const {
        field: {
            value,
            onChange,
            onBlur
        },
        fieldState: { error }
    } = useController({ name, control, rules });
    return (
        <FormControl style={{ width }}>
            <TextField
                required={required}
                type="number"
                variant={variant}
                value={value || null}
                disabled={disabled}
                placeholder={t(placeholder)}
                label={t(label)}
                InputProps={{
                    ...inputProps,
                    inputProps: {
                        ...inputProps?.inputProps,
                        [TestKey]: testID
                    },
                    ref: inputRef
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
                onBlur={onBlur}
                size={size}
                error={Boolean(error)}
                aria-describedby={`stepper-linear-${name}`}
                onKeyDown={(e) => e.stopPropagation()}
                autoFocus={autoFocus}
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
