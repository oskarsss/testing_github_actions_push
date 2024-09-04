/* eslint-disable react/jsx-props-no-multi-spaces */
// import DateRange from '@/@core/ui-kits/basic/date-range/DateRange';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import React from 'react';
import LocationInput from '@/@core/fields/inputs/LocationInput/LocationInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { LocationInputChangeValue } from '@/@core/fields/inputs/LocationInput/utils/onChange';
import { Control, UseFormSetValue } from 'react-hook-form';
import LoadboadSearchIcons from './icons';
import EquipmentsChipSelect from '../../components/fields/EquipmentsChipSelect';
import { LoadboardSearchDefaultValues } from './AddSearch';
import LoadboardDateRange from '../../components/fields/DateRange';

type Props = {
    errors: any;
    control: Control<LoadboardSearchDefaultValues>;
    setValue: UseFormSetValue<LoadboardSearchDefaultValues>;
};

export default function SearchFields({
    control,
    errors,
    setValue
}: Props) {
    const onChangeOrigin = (value: LocationInputChangeValue) => {
        setValue('origin.address', value.location_id_address);
        setValue('origin.city', value.location_id_city);
        setValue('origin.state', value.location_id_state);
        setValue('origin.lat', value.location_id_lat);
        setValue('origin.lon', value.location_id_lon);
    };

    const onChangeDestination = (value: LocationInputChangeValue) => {
        setValue('destination.address', value.location_id_address);
        setValue('destination.city', value.location_id_city);
        setValue('destination.state', value.location_id_state);
        setValue('destination.lat', value.location_id_lat);
        setValue('destination.lon', value.location_id_lon);
    };

    return (
        <DialogComponents.Fields
            columnSpacing={0}
            rowSpacing={3}
        >
            <DialogComponents.SectionTitle
                startIcon={<LoadboadSearchIcons.Truck color="primary" />}
                title="entity:truck"
            />
            <DialogComponents.Field xs={12}>
                <TruckSelect
                    control={control}
                    name="truck_id"
                    label="entity:truck"
                />
            </DialogComponents.Field>
            <DialogComponents.SectionTitle
                startIcon={<LoadboadSearchIcons.Trip color="primary" />}
                title="loadboard:dialogs.searches.sub_titles.trip"
            />
            <DialogComponents.Field xs={7}>
                <LocationInput
                    required
                    control={control}
                    name="origin.address"
                    label="fields:origin.label"
                    errors={errors}
                    width="100%"
                    onChange={onChangeOrigin}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={5}>
                <NumberInput
                    required
                    width="100%"
                    control={control}
                    errors={errors}
                    name="origin_radius"
                    label="loadboard:dialogs.searches.fields.labels.radius"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={7}>
                <LocationInput
                    control={control}
                    name="destination.address"
                    label="fields:destination.label"
                    errors={errors}
                    width="100%"
                    onChange={onChangeDestination}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={5}>
                <NumberInput
                    required
                    width="100%"
                    control={control}
                    errors={errors}
                    name="destination_radius"
                    label="loadboard:dialogs.searches.fields.labels.radius"
                />
            </DialogComponents.Field>

            <DialogComponents.SectionTitle
                startIcon={<LoadboadSearchIcons.Equipment color="primary" />}
                title="loadboard:dialogs.searches.sub_titles.equipment"
            />

            <DialogComponents.Field xs={12}>
                <EquipmentsChipSelect
                    maxTags={4}
                    control={control}
                    variant="filled"
                />
            </DialogComponents.Field>

            <DialogComponents.SectionTitle
                startIcon={<LoadboadSearchIcons.Details color="primary" />}
                title="loadboard:dialogs.searches.sub_titles.load_details"
            />
            <DialogComponents.Field xs={12}>
                <LoadboardDateRange
                    endName="pickup_end_date"
                    startName="pickup_start_date"
                    variant="filled"
                    control={control}
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <NumberInput
                    control={control}
                    errors={errors}
                    width="100%"
                    label="loadboard:dialogs.searches.fields.labels.max_weight"
                    name="max_weight"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <NumberInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="loadboard:dialogs.searches.fields.labels.max_length"
                    name="max_length"
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
