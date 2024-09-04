import { CSSProperties, ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { InputProps } from '@mui/material/Input/Input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { renderError } from '@/utils/render-error';
import { SerializedError } from '@reduxjs/toolkit';

type EntityType = 'load' | 'truck' | 'trailer' | 'plate' | 'invoice';

export type Option = {
    value: string;
    menuItemStyle?: {
        color: CSSProperties['color'];
        backgroundColor: CSSProperties['backgroundColor'];
    };
    label: () => ReactNode;
};

interface CustomStatusSelectProps<T> {
    status: T;
    isEdit?: boolean;
    options: Option[];
    entity_type: EntityType;
    width?: CSSProperties['width'];
    label?: string;
    onChange: (e: SelectChangeEvent<T>) => void;
    isError?: boolean;
    error?: FetchBaseQueryError | SerializedError;
    InputProps?: InputProps['inputProps'];
    variant?: 'standard' | 'filled' | 'outlined';
    size?: 'small' | 'medium';
    disabled?: boolean;
    required?: boolean;
}

export default function CustomStatusSelect<T>({
    status,
    isEdit = true,
    options,
    entity_type,
    label = 'Status',
    onChange,
    isError = false,
    error,
    width = '50%',
    InputProps = {},
    variant = 'outlined',
    size = 'small',
    disabled = false,
    required = false
}: CustomStatusSelectProps<T>) {
    const renderOptions = () =>
        options.map((option) => (
            <MenuItem
                value={option.value}
                key={option.value}
                sx={{
                    ...(option.menuItemStyle || {})
                }}
            >
                {option.label()}
            </MenuItem>
        ));

    const showError = () => (
        <FormHelperText
            error
            id="select-input-status"
        >
            <span>{renderError(error as FetchBaseQueryError)}</span>
        </FormHelperText>
    );

    return (
        <FormControl
            style={{ width }}
            size={size}
            variant={variant}
        >
            <InputLabel
                required={required}
                htmlFor={`select-input-${entity_type}_status`}
            >
                {label}
            </InputLabel>
            <Select
                id={`select-input-${entity_type}_status`}
                variant={variant}
                value={status}
                label={label}
                onChange={onChange}
                disabled={disabled || !isEdit}
                labelId={`select-input-${entity_type}-status`}
                inputProps={{
                    ...InputProps
                }}
                IconComponent={ArrowDropDownIcon}
                aria-describedby={`select-input-${entity_type}-status`}
                error={isError}
                size={size}
            >
                {renderOptions()}
            </Select>
            {isError && showError()}
        </FormControl>
    );
}
