import React, { CSSProperties, ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import { Control, Path, ValidationRule, FieldValues, useController } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { InputProps } from '@mui/material/Input/Input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TestKey, applyTestId } from '@/configs/tests';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export type OptionsType =
    | {
          value?: string | number;
          id?: string | number;
          menuItemStyle?: CSSProperties;
          label: string | number | (() => ReactNode);
          name?: string | ReactNode;
          full_name?: string;
      }
    | {
          value?: string | number;
          id?: string | number;
          menuItemStyle?: CSSProperties;
          label?: string | number | (() => ReactNode);
          name: string | ReactNode;
          full_name?: string;
      };

type Rules = {
    required: {
        value: boolean;
        message: string;
    };
    maxLength: ValidationRule<number> | undefined;
    pattern: ValidationRule<RegExp> | undefined;
};
interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>; // Path<TFieldValues>
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    InputProps?: InputProps['inputProps'];
    options: OptionsType[];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    disabled?: boolean;
    rules?: Rules;
    disableUnderline?: boolean;
    IconComponent?: React.ElementType | undefined;
    multiple?: boolean;
    clearable?: boolean;
    required?: boolean;
    testID?: string;
    optionTestID?: string;
    clearButton?: boolean;
}

export default function ControlledSelectInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    label,
    name,
    width = '50%',
    options,
    InputProps = {},
    variant = 'filled',
    size = 'small',
    disabled = false,
    rules,
    disableUnderline = false,
    IconComponent = ArrowDropDownIcon,
    multiple = false,
    clearable = false,
    required = false,
    testID,
    optionTestID,
    clearButton = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: {
            value,
            onChange,
            onBlur
        },
        fieldState: { error }
    } = useController({ name, control, rules });

    const getMenuItemName = (option: OptionsType) => {
        if (typeof option.label === 'string' || typeof option.label === 'number') {
            return option.label;
        }
        if (option.name) {
            return option.name;
        }
        if (option.label) {
            return option.label();
        }
    };

    return (
        <FormControl
            style={{ width }}
            size={size}
            variant={variant}
        >
            <InputLabel
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
                value={value || ''}
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
                IconComponent={IconComponent}
                multiple={multiple}
                aria-describedby={`select-input-${name}`}
                error={Boolean(error)}
                size={size}
                endAdornment={
                    clearButton && value ? (
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                right   : '30px'
                            }}
                            onClick={() => onChange('')}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ) : undefined
                }
            >
                {clearable && (
                    <MenuItem value="">
                        <em>{t('fields:select.empty_list')}</em>
                    </MenuItem>
                )}
                {options?.length > 0 ? (
                    options.map((option) => (
                        <MenuItem
                            value={option.value || option.id}
                            key={option.value || option.id}
                            sx={option.menuItemStyle ? option.menuItemStyle : {}}
                            {...applyTestId(optionTestID)}
                        >
                            {getMenuItemName(option)}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="">
                        <em>{t('fields:select.empty_list')}</em>
                    </MenuItem>
                )}
            </Select>

            {error && (
                <FormHelperText
                    error
                    id={`select-input-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}
