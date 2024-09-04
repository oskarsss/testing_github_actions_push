import FormControl from '@mui/material/FormControl';
import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps } from '@mui/material/Input/Input';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui';
import { TestKey } from '@/configs/tests';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface TextInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey | string;
    placeholder: IntlMessageKey | string;
    inputProps?: InputProps;
    inputLabelProps?: InputLabelProps;
    required?: boolean;
    testID?: string;
    size?: 'small' | 'medium';
}

export default function PasswordInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    inputProps = {},
    inputLabelProps = {},
    required = false,
    testID,
    size = 'medium'
}: TextInputProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <FormControl
            sx={{ width: '100%' }}
            size={size}
        >
            <Controller
                name={name}
                control={control}
                render={({ field: {
                    value,
                    onChange,
                    onBlur
                } }) => (
                    <TextField
                        size={size}
                        required={required}
                        type={showPassword ? 'text' : 'password'}
                        variant="filled"
                        value={value}
                        label={t(label)}
                        InputProps={{
                            ...inputProps,
                            sx: {
                                '& input[type=password]::-ms-reveal': {
                                    display: 'none'
                                }
                            },
                            inputProps: {
                                ...inputProps?.inputProps,
                                [TestKey]: testID
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={toggleShowPassword}
                                    >
                                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{
                            shrink: true,
                            ...inputLabelProps
                        }}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={t(placeholder)}
                        error={Boolean(errors[name])}
                        aria-describedby={`stepper-linear-${name}`}
                        onClickCapture={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
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
