import * as React from 'react';
import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CSSProperties } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface SwitchInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label: IntlMessageKey;
    name: Path<TFieldValues>;
    width?: CSSProperties['width'];
    disabled?: boolean;
    required?: boolean;
}

export default function SwitchInput({
    control,
    errors,
    label,
    name,
    width = '50%',
    disabled = false,
    required = false
}: SwitchInputProps) {
    const { t } = useAppTranslation();
    return (
        <FormControl style={{ width }}>
            <FormControlLabel
                required={required}
                control={(
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: {
                            value,
                            onChange
                        } }) => (
                            <Switch
                                size="small"
                                disabled={disabled}
                                /* eslint-disable-next-line no-nested-ternary */
                                checked={value === 1 ? true : value === 0 ? false : value}
                                onChange={(e) => {
                                    onChange(e.target.checked ? 1 : 0);
                                }}
                            />
                        )}
                    />
                )}
                label={t(label)}
                style={{ marginLeft: '10px' }}
            />
            {errors[name] && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    error
                    id={`checkbox-${name}`}
                >
                    {errors[name]?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}
