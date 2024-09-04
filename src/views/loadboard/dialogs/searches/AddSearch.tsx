import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import moment from 'moment-timezone';
import { useTruckLocation } from '@/store/streams/events/hooks';
import { useAppDispatch } from '@/store/hooks';
import { useGoogleServices } from '@/context/GoogleApiLoaderContext';
import geocoder from '@/@core/fields/inputs/LocationInput/utils/geocoder';
import { LoadboardActions } from '@/store/loadboard/slice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useStableArray } from '@/hooks/useStable';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import SearchFields from './SearchFields';

export type LoadboardSearchDefaultValues = {
    name: string;
    destination: {
        address: string;
        city: string;
        state: string;
        lat: number;
        lon: number;
    };
    origin: {
        address: string;
        city: string;
        state: string;
        lat: number;
        lon: number;
    };
    origin_radius: number;
    destination_radius: number;
    truck_id: string;
    pickup_start_date: string;
    pickup_end_date: string;
    max_weight: number;
    max_length: number;
    equipment_ids: string[];
};

export const loadboardSchema: yup.ObjectSchema<LoadboardSearchDefaultValues> = yup.object().shape({
    equipment_ids: yup.array().defined(),
    name         : yup.string().defined(),
    origin       : yup
        .object()
        .shape({
            address: yup.string().required(),
            city   : yup.string().defined(),
            state  : yup.string().required(),
            lat    : yup.number().required(),
            lon    : yup.number().required()
        })
        .required('Origin is required'),
    destination: yup
        .object()
        .shape({
            address: yup.string().required(),
            city   : yup.string().defined(),
            state  : yup.string().required(),
            lat    : yup.number().required(),
            lon    : yup.number().required()
        })
        .required('Destination is required'),
    truck_id          : yup.string().defined(),
    destination_radius: yup.number().required(),
    origin_radius     : yup.number().required(),
    pickup_end_date   : yup.string().defined(),
    pickup_start_date : yup.string().required(),
    max_weight        : yup.number().defined(),
    max_length        : yup.number().defined()
});

export const useAddSearchDialog = hookFabric(AddSearch, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="650px"
        {...props}
    />
));

function AddSearch() {
    const { Autocomplete: AutocompleteService } = useGoogleServices();
    const dispatch = useAppDispatch();
    const [create, { isLoading }] = LoadboardGrpcService.useCreateSearchesMutation({});
    const [refresh] = LoadboardGrpcService.useRefreshSearchResultMutation({});
    const trucksMap = useTrucksMap();
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();
    const equipments = LoadboardGrpcService.useGetEquipmentsQuery({});
    const equipmentsList = useStableArray(equipments.data?.equipments);
    const dialog = useAddSearchDialog(true);

    const {
        setValue,
        control,
        handleSubmit,
        watch,
        formState: {
            errors,
            dirtyFields
        }
    } = useForm<LoadboardSearchDefaultValues>({
        defaultValues: {
            name       : '',
            destination: {
                address: '',
                city   : '',
                state  : '',
                lat    : 0,
                lon    : 0
            },
            origin: {
                address: '',
                city   : '',
                state  : '',
                lat    : 0,
                lon    : 0
            },
            truck_id          : '',
            destination_radius: 150,
            origin_radius     : 150,
            pickup_end_date   : moment().add(1, 'day').format('YYYY-MM-DD'),
            pickup_start_date : moment().format('YYYY-MM-DD'),
            max_length        : 0,
            max_weight        : 0
        },

        resolver: yupResolver(loadboardSchema)
    });

    const truckId = watch('truck_id');
    const truckLocation = useTruckLocation(truckId);

    const equipment = useMemo(() => {
        const truck = trucksMap[truckId];
        const trailer = trailersMap[truck?.trailerId];
        const trailerType = trailerTypesMap[trailer?.trailerTypeId];
        const equipment = equipmentsList.find((equipment) => equipment.code === trailerType?.code);

        return equipment;
    }, [trucksMap, truckId, trailersMap, trailerTypesMap, equipmentsList]);

    useEffect(() => {
        if (truckLocation) {
            // TODO: FIXME: can be optimized
            AutocompleteService?.getPlacePredictions(
                { input: truckLocation?.address || '', language: 'en' },
                (results) => {
                    const result = results?.[0];
                    if (!result) return;
                    geocoder(result.place_id).then((geoValue) => {
                        setValue('origin.address', truckLocation.address);
                        setValue('origin.lat', truckLocation.lat);
                        setValue('origin.lon', truckLocation.lon);
                        setValue('origin.city', geoValue.location_id_city);
                        setValue('origin.state', geoValue.location_id_state);
                    });
                }
            );
        } else {
            setValue('origin.address', '');
            setValue('origin.lat', 0);
            setValue('origin.lon', 0);
        }
    }, [truckId]);

    useEffect(() => {
        if (equipment) {
            setValue('equipment_ids', [equipment.equipmentId]);
        } else {
            setValue('equipment_ids', []);
        }
    }, [equipment]);

    const submit = (data: LoadboardSearchDefaultValues) => {
        create({
            name       : data.name,
            truckId    : data.truck_id,
            destination: {
                city  : data.destination.city,
                state : data.destination.state,
                lat   : data.destination.lat,
                lon   : data.destination.lon,
                radius: data.destination_radius
            },
            origin: {
                city  : data.origin.city,
                state : data.origin.state,
                lat   : data.origin.lat,
                lon   : data.origin.lon,
                radius: data.origin_radius
            },
            pickupDateRange: {
                end  : data.pickup_end_date,
                start: data.pickup_start_date
            },
            filters: {
                equipmentIds : [],
                hasRate      : false,
                maxAgeMinutes: 0,
                maxLength    : data.max_length,

                maxRate: 0,
                maxRpm : 0,
                minRate: 0,
                minRpm : 0,

                minLength   : 0,
                requiresTeam: false,
                maxDistance : {
                    kilometers: 0,
                    miles     : 0
                },
                minDistance: {
                    kilometers: 0,
                    miles     : 0
                },
                minWeight: {
                    kilograms: 0,
                    pounds   : 0
                },
                maxWeight: {
                    kilograms: 0,
                    pounds   : 0
                }
            }
        })
            .unwrap()
            .then((res) => {
                if (res.search?.searchId) {
                    dispatch(LoadboardActions.setSelectedSearchId(res.search.searchId));
                    refresh({ searchId: res.search.searchId });
                }
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form
            onSubmit={handleSubmit(submit, (error) => {
                console.debug('error', error);
            })}
        >
            <DialogComponents.Header title="loadboard:dialogs.searches.titles.add" />
            <SearchFields
                control={control}
                errors={errors}
                setValue={setValue}
            />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.DefaultActions
                    onCancel={dialog.close}
                    submitDisabled={!Object.keys(dirtyFields).length}
                    submitLoading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

export default AddSearch;
