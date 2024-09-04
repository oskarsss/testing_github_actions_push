/*
 * This function is used to get the location values from the placeId
 * and return them in the format of GeoValue.
 * It is used in the LocationInput component in the onChange function.
 *
 * PARAMS:
 * placeId - placeId of the location
 */

let Geocoder: google.maps.Geocoder;

type GeoValue = {
    location_id_address: string;
    location_id_line1: string;
    location_id_city: string;
    location_id_state: string;
    location_id_postal_code: string;
    location_id_lat: number;
    location_id_lon: number;
    location_id_name: string;
};

export const reverseGeocoder = async (lat: number, lon: number): Promise<GeoValue> => {
    const value = {
        location_id_address    : '',
        location_id_line1      : '',
        location_id_city       : '',
        location_id_state      : '',
        location_id_postal_code: '',
        location_id_lat        : 0,
        location_id_lon        : 0,
        location_id_name       : ''
    };

    if (!window.google) return value;

    if (!Geocoder) {
        Geocoder = new window.google.maps.Geocoder();
    }

    try {
        const { results } = await Geocoder.geocode({ location: { lat, lng: lon }, language: 'en' });
        const place = results && results[0];
        if (!place) return value;

        value.location_id_address = place.formatted_address?.replace(', USA', '');

        value.location_id_lat = place.geometry?.location?.lat();

        value.location_id_lon = place.geometry?.location?.lng();

        place.address_components?.forEach((component) => {
            if (component.types.includes('locality')) {
                value.location_id_name = component.long_name;
            }
            if (component.types.includes('street_number')) {
                value.location_id_line1 = component.long_name;
            }
            if (component.types.includes('route')) {
                value.location_id_line1 = `${value.location_id_line1} ${component.long_name}`;
            }
            if (
                component.types.includes('locality') ||
                component.types.includes('sublocality') ||
                component.types.includes('sublocality_level_1')
            ) {
                value.location_id_city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                value.location_id_state = component.short_name;
            }
            if (component.types.includes('postal_code')) {
                value.location_id_postal_code = component.long_name;
            }
        });
        return value;
    } catch (error) {
        return value;
    }
};

const geocoder = async (placeId: string): Promise<GeoValue> => {
    const value = {
        location_id_address    : '',
        location_id_line1      : '',
        location_id_city       : '',
        location_id_state      : '',
        location_id_postal_code: '',
        location_id_lat        : 0,
        location_id_lon        : 0,
        location_id_name       : ''
    };

    if (!window.google) return value;

    if (!Geocoder) {
        Geocoder = new window.google.maps.Geocoder();
    }

    try {
        const { results } = await Geocoder.geocode({ placeId, language: 'en' });
        const place = results && results[0];
        if (!place) return value;

        value.location_id_address = place.formatted_address?.replace(', USA', '');

        value.location_id_lat = place.geometry?.location?.lat();

        value.location_id_lon = place.geometry?.location?.lng();
        place.address_components?.forEach((component) => {
            if (component.types.includes('locality')) {
                value.location_id_city = component.long_name;
            }
            if (component.types.includes('street_number')) {
                value.location_id_line1 = component.long_name;
            }
            if (component.types.includes('route')) {
                value.location_id_line1 = `${value.location_id_line1} ${component.long_name}`;
            }
            if (
                component.types.includes('locality') ||
                component.types.includes('sublocality') ||
                component.types.includes('sublocality_level_1')
            ) {
                value.location_id_city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_1')) {
                value.location_id_state = component.short_name;
            }
            if (component.types.includes('postal_code')) {
                value.location_id_postal_code = component.long_name;
            }
        });
        return value;
    } catch (error) {
        return value;
    }
};

export default geocoder;
