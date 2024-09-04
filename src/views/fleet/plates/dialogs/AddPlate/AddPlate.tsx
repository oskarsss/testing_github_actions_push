import React, { useEffect } from 'react';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { useForm, useWatch } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import PlateCompanySelect from '@/@core/fields/select/PlateCompanySelect';
import PlatesTypes from '@/store/fleet/plates/types';
import { TestIDs } from '@/configs/tests';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CountrySelect from '@/@core/fields/select/CountrySelect';
import { Country } from '@/models/country/country';
import { Stack } from '@mui/material';
import PlatesGrpcService, {
    CountryCodeGrpc,
    VehicleTypeGrpc
} from '@/@grpcServices/services/plates.service';
import { useActivePlatesCompanies } from '@/store/fleet/plates/hooks';
import vehicle_type_options from '../vehicle_type_options';

export const useAddPlateDialog = hookFabric(AddPlateDialog, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        {...props}
    />
));

type FormValues = {
    plate_company_id: string;
    owner_name: string;
    number: string;
    state: string;
    country: Country;
    vehicle_type: string;
    annual_cost: number;
    owned: boolean;
};

const schema: ObjectSchema<FormValues> = yup.object().shape({
    plate_company_id: yup.string().defined(),
    owner_name      : yup.string().defined(),
    number          : yup.string().required('Number is a required field'),
    country         : yup.string<Country>().required('This field is required'),
    state           : yup.string().required('This field is required'),
    vehicle_type    : yup.string().required(),
    annual_cost     : yup.number().defined(),
    owned           : yup.boolean().required()
});

type Props = {
    vehicle_type?: PlatesTypes.VehicleType;
    onAdded?: (plate_id: PlatesTypes.Plate['plate_id']) => void;
    defaultValues?: Partial<FormValues>;
};

function AddPlateDialog({
    vehicle_type = 'truck',
    onAdded,
    defaultValues
}: Props) {
    const { t } = useAppTranslation();
    const addPlateDialog = useAddPlateDialog(true);
    const [createPlate, { isLoading }] = PlatesGrpcService.useCreatePlateMutation();

    const {
        reset,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            plate_company_id: '',
            owner_name      : '',
            number          : '',
            country         : 'US',
            state           : '',
            annual_cost     : 0,
            owned           : true,
            vehicle_type,
            ...defaultValues
        },
        resolver: yupResolver(schema)
    });

    const country = useWatch({ control, name: 'country' });

    useEffect(() => {
        setValue('state', '');
    }, [country, setValue]);

    const { companies } = useActivePlatesCompanies();

    useEffect(() => {
        if (companies.length === 1) {
            const selected = getValues('plate_company_id');
            if (selected === '') {
                setValue('plate_company_id', companies[0].plateCompanyId);
            }
        }
    }, [companies?.length]);

    const create = (data: FormValues) => {
        createPlate({
            annualCost    : data.annual_cost,
            countryCode   : CountryCodeGrpc[data.country],
            number        : data.number,
            owned         : data.owned,
            ownerName     : data.owner_name,
            plateCompanyId: data.plate_company_id,
            state         : data.state,
            vehicleType   : VehicleTypeGrpc[data.vehicle_type]
        })
            .unwrap()
            .then(({ plateId }) => {
                if (onAdded) {
                    onAdded(plateId);
                }
                addPlateDialog.close().then(() => {
                    reset();
                });
            });
    };

    return (
        <DialogComponents.Form
            testID={TestIDs.pages.fleetPlates.areas.addPlateModal}
            onSubmit={handleSubmit(create)}
        >
            <DialogComponents.Header title="common:actions.add_plate" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <PlateCompanySelect
                        control={control}
                        label="fields:company.label"
                        name="plate_company_id"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetPlates.fields.ownerName}
                        name="owner_name"
                        placeholder="modals:plates.fields.owner_name.placeholder"
                        label="modals:plates.fields.owner_name.label"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <CountrySelect
                        required
                        label="modals:plates.fields.country.label"
                        name="country"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <StateSelect
                        required
                        width="100%"
                        label={
                            country === 'CA'
                                ? 'modals:plates.fields.province.label'
                                : 'fields:state.label'
                        }
                        name="state"
                        country={country}
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetPlates.fields.state}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        required
                        width="100%"
                        control={control}
                        errors={errors}
                        name="number"
                        testID={TestIDs.pages.fleetPlates.fields.plateNumber}
                        placeholder="modals:plates.fields.number.placeholder"
                        label="modals:plates.fields.number.label"
                        inputProps={{
                            style: { textTransform: 'uppercase' }
                        }}
                        autoFocus
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <SelectInput
                        required
                        width="100%"
                        name="vehicle_type"
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetPlates.fields.type}
                        label="modals:plates.fields.vehicle_type.label"
                        options={vehicle_type_options(t)}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <AmountInput
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetPlates.fields.annualCost}
                        label="modals:plates.fields.annual_cost.label"
                        name="annual_cost"
                        placeholder="modals:plates.fields.annual_cost.placeholder"
                        width="100%"
                        step={1}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <Stack
                        height="100%"
                        justifyContent="center"
                    >
                        <CheckboxInput
                            testID={TestIDs.pages.fleetPlates.fields.ownerCheckbox}
                            name="owned"
                            control={control}
                            errors={errors}
                            label="modals:plates.fields.owned.label"
                        />
                    </Stack>
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                cancelTestId={TestIDs.pages.fleetPlates.buttons.cancelAddingPlate}
                confirmTestId={TestIDs.pages.fleetPlates.buttons.confirmAddingPlate}
                onCancel={addPlateDialog.close}
                submitLoading={isLoading}
                type="create"
            />
        </DialogComponents.Form>
    );
}
