import FormControl from '@mui/material/FormControl';
import { Control, Path, ValidationRule, FieldValues, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps } from '@mui/material/Input/Input';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { CSSProperties, HTMLInputTypeAttribute, useRef } from 'react';
import { TestKey } from '@/configs/tests';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Rules = {
    required: {
        value: boolean;
        message: string;
    };
    maxLength?: ValidationRule<number> | undefined;
    pattern?: ValidationRule<RegExp> | undefined;
};

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    placeholder: IntlMessageKey;
    type?: HTMLInputTypeAttribute;
    width?: CSSProperties['width'];
    inputProps?: InputProps;
    inputLabelProps?: InputLabelProps;
    multiline?: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    ErrorComponent?: React.ReactNode;
    disabled?: boolean;
    rules?: Rules;
    autoFocus?: boolean;
    testID?: string;
    required?: boolean;
}

export default function ControlledTextInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    placeholder,
    type = 'text',
    width = '50%',
    inputProps = {},
    inputLabelProps = {},
    multiline = false,
    variant = 'filled',
    size = 'small',
    disabled = false,
    required = false,
    rules,
    autoFocus = false,
    ErrorComponent,
    testID
}: TextInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const {
        field,
        fieldState: { error }
    } = useController({ name, control, rules });

    return (
        <FormControl style={{ width }}>
            <TextField
                required={required}
                type={type}
                variant={variant}
                disabled={disabled}
                label={t(label)}
                multiline={multiline}
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
                placeholder={t(placeholder)}
                size={size}
                error={Boolean(error)}
                aria-describedby={`stepper-linear-${name}`}
                onClickCapture={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                autoFocus={autoFocus}
                {...field}
            />

            {error && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    {ErrorComponent || <span>{error?.message}</span>}
                </FormHelperText>
            )}
        </FormControl>
    );
}
