/* eslint-disable max-len */

import { Control, FieldValues, Path, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { applyTestId, TestKey } from '@/configs/tests';
import { InputProps } from '@mui/material/Input/Input';
import MenuItem from '@mui/material/MenuItem';
import React, { CSSProperties } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { AppPalette } from '@/@core/theme/palette';
import { statuses_options } from '@/@core/components/documents/config';
import {
    DOCUMENT_STATUS_COLORS,
    DOCUMENT_STATUS_ICONS
} from '@/@core/theme/entities/document/status';
import { DocumentModel_Status } from '@proto/models/model_document';
import { Stack } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';

function getBgColor(palette: AppPalette, status: DocumentModel_Status) {
    return palette.utility.foreground[DOCUMENT_STATUS_COLORS[status]]?.tertiary;
}
function getSvgColor(palette: AppPalette, status: DocumentModel_Status) {
    return palette.utility.foreground[DOCUMENT_STATUS_COLORS[status]]?.primary;
}
function getTextColor(palette: AppPalette, status: DocumentModel_Status) {
    return palette.semantic.text[DOCUMENT_STATUS_COLORS[status]];
}

export interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    required?: boolean;
    testID?: string;
    optionTestID?: string;
    name?: Path<TFieldValues>;
    readOnly?: boolean;
    InputLabelProps?: Omit<InputLabelProps, 'required' | 'id' | 'htmlFor'>;
    disableUnderline?: boolean;
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    width?: CSSProperties['width'];
    label?: IntlMessageKey;
    disabled?: boolean;
    InputProps?: InputProps['inputProps'];
}

export default function DocumentStatusSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name = 'status' as Path<TFieldValues>,
    InputLabelProps = {},
    InputProps = {},
    variant = 'filled',
    size = 'small',
    width = '100%',
    label = 'fields:status.label',
    required = false,
    readOnly = false,
    disabled = false,
    disableUnderline = false,
    testID,
    optionTestID
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: {
            value,
            onChange,
            onBlur
        },
        fieldState: { error }
    } = useController({ name, control });

    return (
        <FormControl
            style={{ width }}
            size={size}
            variant={variant}
        >
            <InputLabel
                {...InputLabelProps}
                required={required}
                htmlFor={`select-input-${name}`}
                id={`select-input-${name}`}
            >
                {t(label)}
            </InputLabel>
            <Select
                {...applyTestId(testID)}
                id={`select-input-${name}`}
                variant={variant}
                value={value}
                readOnly={readOnly}
                label={t(label)}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                disableUnderline={disableUnderline}
                labelId={`select-input-${name}`}
                inputProps={{
                    ...InputProps,
                    [TestKey]: testID
                }}
                sx={{
                    backgroundColor: ({ palette }) =>
                        `${getBgColor(palette, value as DocumentModel_Status)} !important`,
                    color: ({ palette }) =>
                        `${getTextColor(palette, value as DocumentModel_Status)} !important`,
                    fontWeight: 500
                }}
                aria-describedby={`select-input-${name}`}
                error={Boolean(error)}
                size={size}
            >
                {statuses_options.map((option) => (
                    <MenuItem
                        value={option.value}
                        key={option.label}
                        {...applyTestId(optionTestID)}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap="4px"
                            sx={{
                                svg: {
                                    fontSize: '16px',
                                    color   : ({ palette }) => getSvgColor(palette, option.value)
                                }
                            }}
                        >
                            {DOCUMENT_STATUS_ICONS[option.value]}
                            {t(option.label)}
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    error
                    id={`select-input-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
