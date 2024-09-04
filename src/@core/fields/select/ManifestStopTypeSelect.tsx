import { Control, FieldValues, Path, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { applyTestId, TestKey } from '@/configs/tests';
import { InputProps } from '@mui/material/Input/Input';
import MenuItem from '@mui/material/MenuItem';
import React, { CSSProperties, useMemo } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { AppPalette } from '@/@core/theme/palette';
import { IntlMessageKey } from '@/@types/next-intl';
import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import { ManifestStopTypesEnum } from '@/models/manifests/manifest-stop';
import { LOAD_STOP_TYPE_COLORS, LOAD_STOP_TYPE_ICONS } from '@/@core/theme/entities/load/stop_type';
import { IChipColors } from '@/@core/theme/chip';
import createMap from '@/utils/create-map';

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
    originType: ManifestsTypes.OriginType;
}

export default function ManifestStopTypeSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name = 'type' as Path<TFieldValues>,
    InputLabelProps = {},
    InputProps = {},
    variant = 'filled',
    size = 'small',
    width = '100%',
    label = 'fields:type.label',
    required = false,
    readOnly = false,
    disabled = false,
    disableUnderline = false,
    testID,
    optionTestID,
    originType
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

    const options = useMemo(() => {
        if (originType === ManifestsTypes.OriginType.LOAD) {
            return Object.values(LoadStopTypesEnum).map((option) => ({
                value: option,
                label: t(`state_info:stop.type.${option}`),
                icon : LOAD_STOP_TYPE_ICONS[option],
                color: LOAD_STOP_TYPE_COLORS[option]
            }));
        }
        return Object.values(ManifestStopTypesEnum).map((option) => ({
            value: option,
            label: t(`state_info:stop.type.${option}`),
            icon : MANIFEST_STOP_TYPE_ICONS[option],
            color: MANIFEST_STOP_TYPE_COLORS[option]
        }));
    }, [originType, t]);

    function getColor(palette: AppPalette, type: typeof value) {
        let color: IChipColors = 'warning';

        if (originType === ManifestsTypes.OriginType.LOAD) {
            color = LOAD_STOP_TYPE_COLORS[type];
        }
        if (originType === ManifestsTypes.OriginType.MANIFEST) {
            color = MANIFEST_STOP_TYPE_COLORS[type];
        }

        return {
            backgroundColor: `${palette.utility.foreground[color].tertiary} !important`,
            text           : `${palette.utility.text[color]} !important`,
            icon           : `${palette.utility.foreground[color].primary} !important`
        };
    }

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
                onChange={(e) => {
                    onChange(e.target.value);
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
                    backgroundColor: ({ palette }) => getColor(palette, value).backgroundColor,
                    color          : ({ palette }) => getColor(palette, value).text,
                    fontWeight     : 500,

                    '.MuiSelect-select': {
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : '2px',

                        svg: {
                            width : '16px',
                            height: '16px',
                            color : ({ palette }) => getColor(palette, value).icon
                        }
                    }
                }}
                aria-describedby={`select-input-${name}`}
                error={Boolean(error)}
                size={size}
            >
                {options.map((option) => (
                    <MenuItem
                        {...applyTestId(optionTestID)}
                        value={option.value}
                        key={option.value}
                        sx={{
                            gap: '4px',
                            svg: {
                                width : '16px',
                                height: '16px',
                                color : ({ palette }) =>
                                    `${palette.utility.foreground[option.color].primary} !important`
                            }
                        }}
                    >
                        {option.icon}
                        {option.label}
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
