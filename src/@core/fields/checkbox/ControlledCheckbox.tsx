import React, { ReactElement } from 'react';
import { Control, Path, FieldValues, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps, Theme } from '@mui/material';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import { IntlMessageKey } from '@/@types/next-intl';

interface CheckboxInputProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    label: IntlMessageKey | ReactElement | string;
    name: Path<TFieldValues>;
    size?: 'small' | 'medium';
    formControlSx?: SxProps<Theme>;
    checkboxSx?: SxProps<Theme>;
    disabled?: boolean;
    testID?: string;
    required?: boolean;
}

export default function ControlledCheckboxInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    formControlSx,
    checkboxSx,
    size = 'medium',
    disabled = false,
    required = false,
    testID
}: CheckboxInputProps<TFieldValues>) {
    const {
        field,
        fieldState
    } = useController({ name, control });

    return (
        <FormControl
            disabled={disabled}
            required={required}

            // sx={{
            //     width: '100%',
            //     ...formControlSx
            // }}
        >
            <BrandCheckbox
                variant="fullWidth"
                label={label}
                setCheck={field.onChange}
                checked={field.value}
            />
            {fieldState.error && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    error
                    id={`checkbox-${name}`}
                >
                    {fieldState.error?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}
