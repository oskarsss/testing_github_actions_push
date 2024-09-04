/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { ReactElement } from 'react';
import { Control, Controller, ErrorOption, Path, FieldValues } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import { applyTestId } from '@/configs/tests';
import { SxProps, Theme } from '@mui/material';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface CheckboxInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    label: IntlMessageKey | ReactElement;
    name: Path<TFieldValues>;
    size?: 'small' | 'medium';
    formControlSx?: SxProps<Theme>;
    checkboxSx?: SxProps<Theme>;
    disabled?: boolean;
    testID?: string;
    required?: boolean;
    translateOptions?: IntlOptions;
}

export default function CheckboxInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    formControlSx,
    checkboxSx,
    size = 'medium',
    disabled = false,
    required = false,
    testID,
    translateOptions
}: CheckboxInputProps<TFieldValues>) {
    const { t } = useAppTranslation();

    const isFirstTextString = typeof label === 'string';

    return (
        <FormControl
            disabled={disabled}
            sx={{
                width: 'fit-content',
                ...formControlSx
            }}
        >
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
                            <Checkbox
                                size={size}
                                checked={value}
                                onChange={(e) => onChange(e.target.checked)}
                                sx={checkboxSx}

                                // @ts-ignore
                                inputProps={{
                                    ...applyTestId(testID)
                                }}
                            />
                        )}
                    />
                )}
                label={isFirstTextString ? t(label, translateOptions) : label}
                style={{ margin: 0, gap: '6px' }}
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
