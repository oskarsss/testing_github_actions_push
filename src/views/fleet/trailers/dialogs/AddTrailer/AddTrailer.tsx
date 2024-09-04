import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import PlateSelect from '@/@core/fields/select/PlateSelect';
import TrailerCompanySelect from '@/@core/fields/select/TrailerCompanySelect';
import TrailerTypesSelect from '@/@core/fields/select/TrailerTypesSelect';
import { TestIDs } from '@/configs/tests';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TrailerOwnershipTypeSelect from '@/@core/fields/select/TrailerOwnershipTypeSelect';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { TRAILER_OWNERSHIP_TYPE_GRPC_REVERSE } from '@/models/fleet/trailers/trailers-mappings';
import { useAppDispatch } from '@/store/hooks';
import { TrailersDataActions } from '@/store/storage/trailers/slice';

export const useAddTrailerDialog = hookFabric(AddTrailer, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="600px"
    />
));

type DefaultValues = {
    trailer_company_id: string;
    trailer_type_id: string;
    ownership_type: TrailerOwnershipType;
    reference_id: string;
    vin: string;
    plate_id: string;
    company_rent_amount: number;
    company_deposit_amount: number;
    driver_rent_amount: number;
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    trailer_company_id: yup.string().defined(),
    trailer_type_id   : yup.string().required('Type is required'),
    ownership_type    : yup.string<TrailerOwnershipType>().required('Ownership is required'),
    reference_id      : yup.string().required('Trailer number is required'),
    vin               : yup.string().trim().length(17, 'VIN must be exactly 17 characters')
        .required(),
    plate_id              : yup.string().defined(),
    company_deposit_amount: yup.number().defined(),
    company_rent_amount   : yup.number().defined(),
    driver_rent_amount    : yup.number().defined()
});

const default_values: DefaultValues = {
    ownership_type        : '' as TrailerOwnershipType,
    trailer_company_id    : '',
    reference_id          : '',
    vin                   : '',
    trailer_type_id       : '',
    company_rent_amount   : 0,
    company_deposit_amount: 0,
    driver_rent_amount    : 0,
    plate_id              : ''
};

type Props = {
    onSuccessfulCreate?: (trailerId: string) => void;
};

function AddTrailer({ onSuccessfulCreate }: Props) {
    const dispatch = useAppDispatch();
    const addTrailerDialog = useAddTrailerDialog(true);
    const [createTrailer, { isLoading }] = TrailersGrpcService.useCreateTrailerMutation();

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        createTrailer({
            trailerTypeId       : data.trailer_type_id,
            companyRentAmount   : data.company_rent_amount,
            companyDepositAmount: data.company_deposit_amount,
            driverRentAmount    : data.driver_rent_amount,
            ownershipType       : TRAILER_OWNERSHIP_TYPE_GRPC_REVERSE[data.ownership_type],
            plateId             : data.plate_id,
            referenceId         : data.reference_id,
            trailerCompanyId    : data.trailer_company_id,
            vin                 : data.vin
        })
            .unwrap()
            .then((response) => {
                addTrailerDialog.close().then(() => {
                    const { trailer } = response;
                    if (trailer) {
                        dispatch(
                            TrailersDataActions.UpdateTrailer({
                                isCacheUpdate: false,
                                trailer
                            })
                        );
                        onSuccessfulCreate?.(trailer.trailerId);
                    }
                    reset();
                });
            });
    };

    return (
        <DialogComponents.Form
            testID={TestIDs.pages.fleetTrailers.areas.addTrailerModal}
            onSubmit={handleSubmit(submit)}
        >
            <DialogComponents.Header
                justifyContent="center"
                title="common:actions.add_trailer"
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TrailerCompanySelect
                        control={control}
                        name="trailer_company_id"
                        label="fields:company_id.label"
                        testOptions={{
                            inputTestID: TestIDs.pages.fleetTrailers.fields.company,
                            addTestId  : TestIDs.pages.fleetTrailers.buttons.addCompany
                        }}
                        width="50%"
                    />
                    <TrailerOwnershipTypeSelect
                        required
                        control={control}
                        errors={errors}
                        name="ownership_type"
                        width="50%"
                        optionTestID={TestIDs.components.select.trailerOwnership.optionPrefix}
                        testID={TestIDs.pages.fleetTrailers.fields.ownership}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <PlateSelect
                        control={control}
                        testID={TestIDs.pages.fleetTrailers.fields.plateCompany}
                        vehicle_type="trailer"
                        width="50%"
                        name="plate_id"
                    />
                    <TrailerTypesSelect
                        control={control}
                        testID={TestIDs.pages.fleetTrailers.fields.type}
                        width="50%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        name="reference_id"
                        label="fields:trailer_reference_id.label"
                        testID={TestIDs.pages.fleetTrailers.fields.number}
                        placeholder="fields:trailer_reference_id.placeholder"
                        required
                        width="50%"
                    />
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:vin.label"
                        testID={TestIDs.pages.fleetTrailers.fields.VIN}
                        name="vin"
                        placeholder="fields:vin.placeholder"
                        required
                        width="50%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <NumberInput
                        control={control}
                        errors={errors}
                        name="company_rent_amount"
                        label="modals:trailers.add.fields.company_rent_amount.label"
                        testID={TestIDs.pages.fleetTrailers.fields.rentMonthly}
                        placeholder="modals:trailers.add.fields.company_rent_amount.placeholder"
                        width="33.333%"
                    />
                    <NumberInput
                        control={control}
                        errors={errors}
                        name="company_deposit_amount"
                        label="modals:trailers.add.fields.company_deposit_amount.label"
                        testID={TestIDs.pages.fleetTrailers.fields.deposit}
                        placeholder="modals:trailers.add.fields.company_deposit_amount.placeholder"
                        width="33.333%"
                    />
                    <NumberInput
                        control={control}
                        errors={errors}
                        name="driver_rent_amount"
                        label="modals:trailers.add.fields.driver_rent_amount.label"
                        testID={TestIDs.pages.fleetTrailers.fields.driverRent}
                        placeholder="modals:trailers.add.fields.driver_rent_amount.placeholder"
                        width="33.333%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={addTrailerDialog.close}
                submitLoading={isLoading}
                type="create"
                cancelTestId={TestIDs.pages.fleetTrailers.buttons.cancelAddingTrailer}
                confirmTestId={TestIDs.pages.fleetTrailers.buttons.confirmAddingTrailer}
            />
        </DialogComponents.Form>
    );
}
