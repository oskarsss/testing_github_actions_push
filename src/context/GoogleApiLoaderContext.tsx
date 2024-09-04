import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Loader } from '@googlemaps/js-api-loader';

type Props = PropsWithChildren;

const GooglePlacesApi = createContext<google.maps.PlacesLibrary | null>(null);

type GoogleServices = {
    Autocomplete: google.maps.places.AutocompleteService | null;
    Places: google.maps.places.PlacesService | null;
    Geocoder: google.maps.Geocoder | null;
};

const GoogleServicesContext = createContext<GoogleServices>({
    Autocomplete: null,
    Places      : null,
    Geocoder    : null
});

export const useGooglePlacesApi = () => useContext(GooglePlacesApi);

export const useGoogleServices = () => useContext(GoogleServicesContext);

const GoogleApiLoaderProvider = ({ children }: Props) => {
    const [googlePlacesApi, setGooglePlacesApi] = useState<google.maps.PlacesLibrary | null>(null);
    const emptyDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (googlePlacesApi) return;
        const loader = new Loader({
            apiKey : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            version: 'weekly'
        });

        loader.importLibrary('places').then((library) => {
            setGooglePlacesApi(library);
        });
    }, [googlePlacesApi]);

    const services = useMemo(
        () => ({
            Autocomplete: googlePlacesApi ? new google.maps.places.AutocompleteService() : null,
            Places:
                googlePlacesApi && emptyDivRef.current
                    ? new google.maps.places.PlacesService(emptyDivRef.current)
                    : null,
            Geocoder: googlePlacesApi ? new google.maps.Geocoder() : null
        }),
        [googlePlacesApi]
    );

    return (
        <GooglePlacesApi.Provider value={googlePlacesApi}>
            <GoogleServicesContext.Provider value={services}>
                {children}
            </GoogleServicesContext.Provider>
            <div ref={emptyDivRef} />
        </GooglePlacesApi.Provider>
    );
};

export default GoogleApiLoaderProvider;
