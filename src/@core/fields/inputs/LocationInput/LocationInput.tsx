import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { Control, FieldValues, ErrorOption, useController, Path } from 'react-hook-form';

// eslint-disable-next-line import/no-unresolved
import FormHelperText from '@mui/material/FormHelperText';
import { useGooglePlacesApi, useGoogleServices } from '@/context/GoogleApiLoaderContext';
import { applyTestId } from '@/configs/tests';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Option from './Option';
import geocoder from './utils/geocoder';
import { LocationInputChangeValue } from './utils/onChange';

type MatchOption = {
    offset: number;
    length: number;
};

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

type PlacePredictionCallback = (
    a: AutocompletePrediction[] | null,
    b: google.maps.places.PlacesServiceStatus
) => void;

type Props<TFieldValues extends FieldValues = FieldValues> = {
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    width?: CSSProperties['width'];
    control: Control<TFieldValues>;
    onChange: (value: LocationInputChangeValue) => void;
    required?: boolean;
    testID?: string;
    label?: IntlMessageKey;
    size?: 'small' | 'medium';
    variant?: TextFieldProps['variant'];
    customError?: string;
    onFocus?: () => void;
    onBlur?: () => void;
};

function LocationInput<TFieldValues extends FieldValues = FieldValues>({
    errors,
    name,
    width = '50%',
    control,
    onChange,
    required = false,
    testID = '',
    label = 'fields:location.placeholder',
    size = 'small',
    variant = 'filled',
    customError,
    onFocus,
    onBlur
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const {
        field: {
            value,
            onChange: onFieldChange
        },
        fieldState: { error }
    } = useController({ control, name });
    const gPlacesApi = useGooglePlacesApi();

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<AutocompletePrediction[]>([]);

    const { Autocomplete: AutocompleteService } = useGoogleServices();
    const fetch = useMemo(
        () =>
            debounce(
                (
                    request: { input: string; language: string },
                    callback: PlacePredictionCallback
                ) => {
                    AutocompleteService?.getPlacePredictions(request, callback);
                },
                400
            ),
        [AutocompleteService]
    );

    useEffect(() => {
        let active = true;
        if (!AutocompleteService) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue, language: 'en' }, (results) => {
            if (active) {
                let newOptions: AutocompletePrediction[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <FormControl style={{ width }}>
            <Autocomplete
                isOptionEqualToValue={(option, value) => option.place_id === value.place_id}
                getOptionLabel={(option) =>
                    // eslint-disable-next-line no-nested-ternary
                    typeof option === 'string'
                        ? option
                        : option.description
                            ? option.description.replace(', USA', '')
                            : ''}
                filterOptions={(x) => x}
                options={options}
                size="small"
                autoComplete
                includeInputInList
                filterSelectedOptions
                onFocus={onFocus}
                onBlur={onBlur}
                value={value || null}
                noOptionsText={t('fields:location.no_locations')}
                onChange={async (_, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);

                    const onChangeValue: LocationInputChangeValue = {
                        location_id            : newValue,
                        location_id_address    : '',
                        location_name          : newValue?.structured_formatting?.main_text || '',
                        location_id_lat        : 0,
                        location_id_lon        : 0,
                        location_id_line1      : '',
                        location_id_city       : '',
                        location_id_state      : '',
                        location_id_postal_code: ''
                    };

                    if (!(newValue && newValue.place_id)) {
                        onChange?.(onChangeValue);
                        onFieldChange('');
                        return;
                    }

                    if (!gPlacesApi) return;

                    const geoValue = await geocoder(newValue.place_id);

                    onChangeValue.location_id_address = geoValue.location_id_address;
                    onChangeValue.location_id_lat = geoValue.location_id_lat;
                    onChangeValue.location_id_lon = geoValue.location_id_lon;
                    onChangeValue.location_id_line1 = geoValue.location_id_line1;
                    onChangeValue.location_id_city = geoValue.location_id_city;
                    onChangeValue.location_id_state = geoValue.location_id_state;
                    onChangeValue.location_id_postal_code = geoValue.location_id_postal_code;

                    onFieldChange(onChangeValue.location_id_address);
                    onChange(onChangeValue);
                }}
                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required={required}
                        label={t(label)}
                        placeholder={t('fields:location.placeholder')}
                        fullWidth
                        variant={variant}
                        size="small"
                        error={!!errors[name] || !!customError}
                        inputProps={{
                            ...params.inputProps,
                            ...applyTestId(testID)
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    if (!option || !option.structured_formatting) {
                        return '';
                    }

                    const matches = option.structured_formatting.main_text_matched_substrings || [];
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match: MatchOption) => [
                            match.offset,
                            match.offset + match.length
                        ])
                    );

                    const updProps = { ...props, key: props.id };

                    return (
                        <li {...updProps}>
                            <Option
                                parts={parts}
                                secondary_text={option.structured_formatting.secondary_text}
                            />
                        </li>
                    );
                }}
            />

            {(error || customError) && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    <span>{error?.message || customError}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}

export default LocationInput;
