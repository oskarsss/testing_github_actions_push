/*
 * This function is used to change the location values in the form.
 * It is used in the LocationInput component.
 *
 * PARAMS:
 * setValue - function from useForm hook
 * name - name of the field
 * value - object with location values, has to be in the format of OnChangeValue
 */

import { Path, PathValue, UseFormSetValue } from 'react-hook-form';

export type LocationInputChangeValue = {
    location_id: google.maps.places.AutocompletePrediction | null;
    location_id_address: string;
    location_name: string;
    location_id_lat: number;
    location_id_lon: number;
    location_id_line1: string;
    location_id_city: string;
    location_id_state: string;
    location_id_postal_code: string;
};

export function ChangeLocation<TFieldValues extends object = object>(
    setValue: UseFormSetValue<TFieldValues>,
    value: Partial<LocationInputChangeValue>,
    name?: string
) {
    const values_keys = Object.keys(value) as Array<keyof LocationInputChangeValue>;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < values_keys.length; i++) {
        const key = values_keys[i];
        const val = value[key] as PathValue<TFieldValues, Path<TFieldValues>>;
        const key_name = (name ? `${name}.${key}` : key) as Path<TFieldValues>;
        setValue(key_name, val);
    }
}
