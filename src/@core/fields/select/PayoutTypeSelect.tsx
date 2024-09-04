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
import { PayoutModel_Type } from '@proto/models/model_payout';
import { PayoutType, PayoutTypes } from '@/models/payouts/payout-type';
import {
    PAYOUT_TYPE_GRPC_MODEL_COLORS,
    PAYOUT_TYPE_ICONS
} from '@/@core/theme/entities/payout/type';
import { AppPalette } from '@/@core/theme/palette';
import { PAYOUT_TYPE_GRPC_ENUM, PAYOUT_TYPE_TO_GRPC_ENUM } from '@/models/payouts/payout-mappings';
import { IntlMessageKey } from '@/@types/next-intl';

function getGrpcModelStatusColor(palette: AppPalette, status: PayoutModel_Type) {
    return palette.utility.foreground[PAYOUT_TYPE_GRPC_MODEL_COLORS[status]];
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

export default function PayoutTypeSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name = 'type' as Path<TFieldValues>,
    InputLabelProps = {},
    InputProps = {},
    variant = 'filled',
    size = 'small',
    width = '100%',
    label = 'core:selects.payout_type.label',
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
                value={PAYOUT_TYPE_GRPC_ENUM[value]}
                readOnly={readOnly}
                label={t(label)}
                onChange={(e) => {
                    onChange(PAYOUT_TYPE_TO_GRPC_ENUM[e.target.value as PayoutType]);
                }}
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
                        `${
                            getGrpcModelStatusColor(palette, value as PayoutModel_Type)?.tertiary
                        } !important`,
                    color: ({ palette }) =>
                        `${
                            getGrpcModelStatusColor(palette, value as PayoutModel_Type)?.primary
                        } !important`,
                    fontWeight: 500,

                    '.MuiSelect-select': {
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : '2px',

                        svg: {
                            width : '16px',
                            height: '16px'
                        }
                    }
                }}
                aria-describedby={`select-input-${name}`}
                error={Boolean(error)}
                size={size}
            >
                {Object.values(PayoutTypes).map((option) => (
                    <MenuItem
                        value={option}
                        key={option}
                        sx={{
                            gap: '4px'
                        }}
                        {...applyTestId(optionTestID)}
                    >
                        {PAYOUT_TYPE_ICONS[option]}
                        {t(`state_info:payouts.type.${option}`)}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <FormHelperText
                    sx={{ color: 'error.main' }}
                    id={`select-input-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
