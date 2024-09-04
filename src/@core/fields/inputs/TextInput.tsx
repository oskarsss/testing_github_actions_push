import FormControl from '@mui/material/FormControl';
import {
    Control,
    Controller,
    ErrorOption,
    Path,
    ValidationRule,
    FieldValues
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps } from '@mui/material/Input/Input';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { CSSProperties, HTMLInputTypeAttribute, useRef } from 'react';
import { TestKey } from '@/configs/tests';
import { styled } from '@mui/material';
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

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey | string;
    labelWithoutTranslate?: string;
    placeholder: IntlMessageKey | string;
    placeholderWithoutTranslate?: string;
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
    onClick?: () => void;
}

const StyledTextField = styled(TextField)`
    input[type='time']::-webkit-calendar-picker-indicator,
    input[type='date']::-webkit-calendar-picker-indicator,
    input[type='datetime-local']::-webkit-calendar-picker-indicator {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export default function TextInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    labelWithoutTranslate,
    name,
    placeholder,
    placeholderWithoutTranslate,
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
    testID,
    onClick
}: TextInputProps<TFieldValues>) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const { t } = useAppTranslation();

    return (
        <FormControl style={{ width }}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: {
                    value,
                    onChange,
                    onBlur
                } }) => (
                    <StyledTextField
                        required={required}
                        type={type}
                        variant={variant}
                        value={value}
                        disabled={disabled}
                        label={labelWithoutTranslate || t(label)}
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
                        onClick={onClick}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholderWithoutTranslate || t(placeholder)}
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
                    error={Boolean(errors[name])}
                    id={`stepper-linear-${name}`}
                >
                    {ErrorComponent || <span>{errors[name]?.message}</span>}
                </FormHelperText>
            )}
        </FormControl>
    );
}
