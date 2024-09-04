import type { ElementType, CSSProperties, ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import {
    Control,
    Controller,
    ErrorOption,
    Path,
    ValidationRule,
    FieldValues
} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import { InputProps } from '@mui/material/Input/Input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TestKey, applyTestId } from '@/configs/tests';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

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
    maxLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
};
interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>; // Path<TFieldValues>
    label: IntlMessageKey | string;
    width?: CSSProperties['width'];
    InputProps?: InputProps['inputProps'];
    options: OptionsType[];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    disabled?: boolean;
    rules?: Rules;
    disableUnderline?: boolean;
    IconComponent?: ElementType;
    multiple?: boolean;
    clearable?: boolean;
    required?: boolean;
    testID?: string;
    optionTestID?: string;
    clearButton?: boolean;
    readOnly?: boolean;
    InputLabelProps?: Omit<InputLabelProps, 'required' | 'id' | 'htmlFor'>;
}

export default function SelectInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
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
    clearButton = false,
    readOnly = false,
    InputLabelProps = {}
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();

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

    const getHelperText = () => (
        <FormHelperText
            error
            id={`select-input-${name}`}
        >
            <span>{errors[name]?.message}</span>
        </FormHelperText>
    );

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
            <Controller
                name={name as Path<TFieldValues>}
                control={control}
                rules={rules}
                render={({ field: {
                    value,
                    onChange,
                    onBlur
                } }) => (
                    <Select
                        {...applyTestId(testID)}
                        id={`select-input-${name}`}
                        variant={variant}
                        value={value || ''}
                        readOnly={readOnly}
                        label={t(label)}
                        onChange={(event) => onChange(event)}
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
                        error={Boolean(errors[name])}
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
                                <em>None</em>
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
                                <em>None</em>
                            </MenuItem>
                        )}
                    </Select>
                )}
            />
            {errors[name] && getHelperText()}
        </FormControl>
    );
}
