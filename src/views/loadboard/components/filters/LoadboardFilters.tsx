import { Box, Stack } from '@mui/material';
import { LoadboardSearch } from '@proto/models/model_loadboard_search';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import EquipmentsChipSelect from '../fields/EquipmentsChipSelect';
import SwapButton from './SwapButton';
import SearchButton from './SearchButton';
import LoadboardDateRange from '../fields/DateRange';

type Props = {
    search: LoadboardSearch;
};

export type UpdateSearchDefaultValues = {
    origin: {
        city: string;
        state: string;
        address: string;
        lat: number;
        lon: number;
    };
    destination: {
        city: string;
        state: string;
        address: string;
        lat: number;
        lon: number;
    };
    origin_radius: number;
    destination_radius: number;
    pickup_start_date: string;
    pickup_end_date: string;
    equipment_ids: string[];
    maxRate: number;
    maxLength: number;
    minRate: number;
    minLength: number;
};

export default function LoadboardFilters({ search }: Props) {
    const [update] = LoadboardGrpcService.useUpdateSearchMutation();

    const searchValues: UpdateSearchDefaultValues = useMemo(
        () => ({
            origin: {
                city   : search.origin?.city ?? '',
                state  : search.origin?.state ?? '',
                address: `${search.origin?.city ?? ''} ${search.origin?.state ?? ''}`,
                lat    : search.origin?.lat ?? 0,
                lon    : search.origin?.lon ?? 0
            },
            destination: {
                city   : search.destination?.city ?? '',
                state  : search.destination?.state ?? '',
                address: `${search.destination?.city ?? ''} ${search.destination?.state ?? ''}`,
                lat    : search.destination?.lat ?? 0,
                lon    : search.destination?.lon ?? 0
            },
            origin_radius     : search.origin?.radius ?? 0,
            destination_radius: search.destination?.radius ?? 0,
            pickup_start_date : search.pickupDateRange?.start ?? '',
            pickup_end_date   : search.pickupDateRange?.end ?? '',
            equipment_ids     : search.filters?.equipmentIds.filter((el) => el) ?? [],
            maxRate           : search.filters?.maxRate ?? 0,
            maxLength         : search.filters?.maxLength ?? 0,
            minRate           : search.filters?.minRate ?? 0,
            minLength         : search.filters?.minLength ?? 0
        }),
        [search]
    );

    const {
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: {
            errors,
            isDirty,
            dirtyFields
        }
    } = useForm<UpdateSearchDefaultValues>({
        values: searchValues
    });

    const changeOrigin = (newValue: LocationInputChangeValue) => {
        setValue('origin.address', newValue.location_id_address);
        setValue('origin.city', newValue.location_id_city);
        setValue('origin.state', newValue.location_id_state);
        setValue('origin.lat', newValue.location_id_lat);
        setValue('origin.lon', newValue.location_id_lon);
    };

    const changeDestination = (newValue: LocationInputChangeValue) => {
        setValue('destination.address', newValue.location_id_address);
        setValue('destination.city', newValue.location_id_city);
        setValue('destination.state', newValue.location_id_state);
        setValue('destination.lat', newValue.location_id_lat);
        setValue('destination.lon', newValue.location_id_lon);
    };

    const save = handleSubmit((formData: UpdateSearchDefaultValues) => {
        const data = { ...searchValues, ...formData };

        update({
            name               : search.name,
            searchId           : search.searchId,
            sortResultBy       : search.sortResultBy,
            sortResultDirection: search.sortResultDirection,
            truckId            : search.truckId,
            destination        : {
                city  : data.destination.city,
                state : data.destination.state,
                lat   : data.destination.lat,
                lon   : data.destination.lon,
                radius: data.destination_radius
            },
            filters: {
                equipmentIds: data.equipment_ids,
                maxRate     : data.maxRate,
                maxLength   : data.maxLength,

                minRate  : data.minRate,
                minLength: data.minLength,

                hasRate      : data.maxRate > 0 || data.minRate > 0,
                maxAgeMinutes: 0,

                maxRpm   : 0,
                minRpm   : 0,
                minWeight: {
                    kilograms: 0,
                    pounds   : 0
                },
                maxDistance: {
                    kilometers: 0,
                    miles     : 0
                },
                maxWeight: {
                    kilograms: 0,
                    pounds   : 0
                },
                minDistance: {
                    kilometers: 0,
                    miles     : 0
                },

                requiresTeam: false
            },
            origin: {
                city  : data.origin.city,
                state : data.origin.state,
                lat   : data.origin.lat,
                lon   : data.origin.lon,
                radius: data.origin_radius
            },
            pickupDateRange: {
                start: data.pickup_start_date,
                end  : data.pickup_end_date
            }
        });
    });

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={3}
            padding="12px 16px 16px 16px"
        >
            <Box
                display="flex"
                gap="10px"
                flex={4}
                flexWrap="wrap"
            >
                <Box flex={1}>
                    <LocationInput
                        control={control}
                        errors={errors}
                        variant="outlined"
                        label="fields:origin.label"
                        width="100%"
                        name="origin.address"
                        onChange={changeOrigin}
                    />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        inputProps={{ inputProps: { min: 0 }, autoComplete: 'off' }}
                        label="loadboard:fields.origin_radius.label"
                        width="100%"
                        variant="outlined"
                        name="origin_radius"
                    />
                </Box>
                <Box flex={0}>
                    <SwapButton
                        getValues={getValues}
                        control={control}
                    />
                </Box>
                <Box flex={1}>
                    <LocationInput
                        control={control}
                        errors={errors}
                        width="100%"
                        variant="outlined"
                        label="fields:destination.label"
                        name="destination.address"
                        onChange={changeDestination}
                    />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        label="loadboard:fields.destination_radius.label"
                        inputProps={{ inputProps: { min: 0 }, autoComplete: 'off' }}
                        width="100%"
                        variant="outlined"
                        name="destination_radius"
                    />
                </Box>
                <Box flex={1}>
                    <LoadboardDateRange
                        control={control}
                        variant="outlined"
                        endName="pickup_end_date"
                        startName="pickup_start_date"
                    />
                </Box>
                <Box flex={1.5}>
                    <EquipmentsChipSelect control={control} />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        variant="outlined"
                        label="loadboard:fields.min_rate.label"
                        name="minRate"
                        width="100%"
                    />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        variant="outlined"
                        label="loadboard:fields.max_rate.label"
                        name="maxRate"
                        width="100%"
                    />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        label="loadboard:fields.min_length.label"
                        variant="outlined"
                        name="minLength"
                        width="100%"
                    />
                </Box>
                <Box flex={0.5}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        label="loadboard:fields.max_length.label"
                        variant="outlined"
                        name="maxLength"
                        width="100%"
                    />
                </Box>
            </Box>
            <Box
                flex={0.5}
                justifyContent="flex-end"
                display="flex"
            >
                <SearchButton
                    disabled={!isDirty}
                    onClick={save}
                />
            </Box>
        </Stack>
    );
}
