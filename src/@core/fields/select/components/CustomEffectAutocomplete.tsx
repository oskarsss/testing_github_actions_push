/* eslint-disable react/jsx-no-duplicate-props */
import { CSSProperties, HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Box from '@mui/material/Box';
import { Autocomplete, FilledInputProps } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { applyTestId, TestKey } from '@/configs/tests';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export type Option = {
    name: string;
    id: string;
    label: string;
    menuItemStyle?: {
        color: CSSProperties['color'];
        backgroundColor: CSSProperties['backgroundColor'];
    };
    marker?: () => ReactNode;
};

export type OptionObjects = Record<string, Option>;

interface TruckStatusSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    width?: CSSProperties['width'];
    options: Option[];
    size?: 'small' | 'medium';
    entities_by_id: Record<number | string, Option>;
    inputProps?: FilledInputProps;
    inputTestID?: string;
    optionTestId?: string;
    required?: boolean;
}
export default function CustomEffectAutocomplete<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    label,
    options,
    width = '100%',
    size = 'small',
    entities_by_id,
    inputProps,
    inputTestID,
    optionTestId,
    required = false
}: TruckStatusSelectProps<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: {
            onChange,
            onBlur,
            value
        },
        formState: { errors }
    } = useController({
        name,
        control
    });

    const getOptionLabel = (option: Option) => {
        if (typeof option === 'string') {
            if (option === '') {
                return '';
            }
            if (entities_by_id[option]) {
                return entities_by_id[option].label;
            }
        }
        return option.label;
    };

    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
        const updatedProps = { ...props, key: option.id };
        return (
            <Box
                component="li"
                {...updatedProps}
                {...applyTestId(optionTestId)}
                sx={option.menuItemStyle ? option.menuItemStyle : {}}
            >
                {option.marker && option.marker()}
                {option.label}
            </Box>
        );
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField
            {...params}
            size={size}
            required={required}
            variant="filled"
            InputProps={{
                ...params.InputProps,
                ...inputProps
            }}
            inputProps={{
                ...params.inputProps,
                [TestKey]: inputTestID
            }}
            InputLabelProps={{
                shrink: true
            }}
            label={t(label)}
            error={Boolean(errors[name])}
            onKeyDown={(e) => e.stopPropagation()}
        />
    );

    const renderError = () => (
        <FormHelperText
            error
            id={`select-input-${name}`}
        >
            <span>{errors[name]?.message as string}</span>
        </FormHelperText>
    );

    const handleChange = (e: SyntheticEvent<Element>, data: Option | Option[] | null) => {
        if (!Array.isArray(data)) {
            onChange(data ? data.name : '');
        }
    };

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                options={options}
                isOptionEqualToValue={(option, val) => String(option.name) === String(val)}
                getOptionLabel={(option) => getOptionLabel(option)}
                value={value}
                openOnFocus
                renderOption={renderOption}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
            />
            {errors.status && renderError()}
        </FormControl>
    );
}
