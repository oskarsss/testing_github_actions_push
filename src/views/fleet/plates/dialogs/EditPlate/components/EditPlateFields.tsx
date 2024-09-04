import React, { useEffect } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import PlateCompanySelect from '@/@core/fields/select/PlateCompanySelect';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import { useWatch } from 'react-hook-form';
import CountrySelect from '@/@core/fields/select/CountrySelect';
import { Stack } from '@mui/material';
import { useEditPlateForm } from '../EditPlateForm';
import vehicle_type_options from '../../vehicle_type_options';

export default function EditPlateFields() {
    const {
        control,
        setValue,
        formState: {
            errors,
            dirtyFields
        }
    } = useEditPlateForm();

    const { t } = useAppTranslation();
    const country = useWatch({ control, name: 'country' });

    useEffect(() => {
        if (!dirtyFields.country) return;
        setValue('state', '');
    }, [dirtyFields.country, country]);

    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={12}>
                <PlateCompanySelect
                    control={control}
                    label="fields:company.label"
                    name="plate_company_id"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    name="owner_name"
                    placeholder="modals:plates.fields.owner_name.placeholder"
                    label="modals:plates.fields.owner_name.label"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <CountrySelect
                    required
                    width="100%"
                    label="modals:plates.fields.country.label"
                    name="country"
                    control={control}
                    errors={errors}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <StateSelect
                    required
                    width="100%"
                    label={
                        country === 'CA'
                            ? 'modals:plates.fields.province.label'
                            : 'fields:state.label'
                    }
                    name="state"
                    control={control}
                    errors={errors}
                    country={country}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    required
                    width="100%"
                    control={control}
                    errors={errors}
                    name="number"
                    placeholder="modals:plates.fields.number.placeholder"
                    label="modals:plates.fields.number.label"
                    inputProps={{
                        style: { textTransform: 'uppercase' }
                    }}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <SelectInput
                    required
                    width="100%"
                    name="vehicle_type"
                    control={control}
                    errors={errors}
                    label="modals:plates.fields.vehicle_type.label"
                    options={vehicle_type_options(t)}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <AmountInput
                    control={control}
                    errors={errors}
                    label="modals:plates.fields.annual_cost.label"
                    name="annual_cost"
                    placeholder="modals:plates.fields.annual_cost.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <Stack
                    height="100%"
                    justifyContent="center"
                    paddingLeft="20px"
                >
                    <CheckboxInput
                        name="owned"
                        control={control}
                        errors={errors}
                        label="modals:plates.fields.owned.label"
                    />
                </Stack>
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
