/* eslint-disable react/jsx-props-no-multi-spaces */
import { useDriversTypes } from '@/store/fleet/drivers/hooks';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { HTMLAttributes, SyntheticEvent, useMemo, CSSProperties } from 'react';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Box,
    FormControl,
    FormHelperText,
    Stack,
    TextField
} from '@mui/material';
import { applyTestId, TestKey } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Option, OptionObjects } from './components/CustomAutocomplete';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    required?: boolean;
    testID?: string;
    optionTestId?: string;
    size?: 'small' | 'medium';
    width?: CSSProperties['width'];
};

export default function DriverTypesSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    required,
    testID,
    optionTestId,
    size = 'small',
    width = '100%'
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const { driverTypes } = useDriversTypes();

    const {
        field: {
            onChange,
            onBlur,
            value
        },
        fieldState: { error }
    } = useController({
        name,
        control
    });

    const driver_types_options = useMemo(
        () =>
            driverTypes.map((driverType) => ({
                name  : driverType.name,
                id    : driverType.driverTypeId,
                label : driverType.name,
                marker: DRIVER_TYPE_ICONS[driverType.icon]
            })),
        [driverTypes]
    );

    const driver_types_by_id = useMemo(() => {
        const driver_types_object: OptionObjects = {};

        driver_types_options.forEach((driverType) => {
            driver_types_object[driverType.id] = driverType;
        });

        return driver_types_object;
    }, [driverTypes]);

    const selectedValue = useMemo(() => {
        if (value === '') {
            return null;
        }

        return driver_types_by_id[value];
    }, [value]);

    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: Option) => {
        const updatedProps = { ...props, key: option.id };
        return (
            <Box
                component="li"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                {...updatedProps}
                {...applyTestId(optionTestId)}
            >
                <span
                    style={{
                        display   : 'flex',
                        alignItems: 'center',

                        marginRight: '8px'
                    }}
                >
                    {option.marker}
                </span>
                {option.name}
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
                startAdornment: selectedValue && (
                    <Stack direction="row">{selectedValue?.marker}</Stack>
                ),
                inputProps: {
                    ...params.inputProps,
                    [TestKey]: testID
                }
            }}
            InputLabelProps={{
                shrink: true
            }}
            label={t('core:selects.driver_type.label')}
            error={Boolean(error)}
            onKeyDown={(e) => e.stopPropagation()}
        />
    );

    const getOptionLabel = (option: Option) => {
        if (typeof option === 'string') {
            if (option === '') {
                return '';
            }

            if (driver_types_by_id[option]) {
                return `${driver_types_by_id[option].name}`;
            }
        }
        return option.name;
    };

    const renderError = () => (
        <FormHelperText
            error
            id={`select-input-${name}`}
        >
            <span>{error?.message as string}</span>
        </FormHelperText>
    );

    const handleChange = (e: SyntheticEvent<Element>, data: Option | Option[] | null) => {
        if (!Array.isArray(data)) {
            onChange(data ? data.id : '');
        }
    };

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                options={driver_types_options}
                isOptionEqualToValue={(option, val) => String(option.name) === String(val)}
                getOptionLabel={(option) => getOptionLabel(option)}
                value={value}
                openOnFocus
                renderOption={renderOption}
                renderInput={renderInput}
                onChange={handleChange}
                onBlur={onBlur}
            />
            {error && renderError()}
        </FormControl>
    );
}
