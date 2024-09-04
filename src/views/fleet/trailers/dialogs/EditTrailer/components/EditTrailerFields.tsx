import { useFormContext } from 'react-hook-form';
import TagsSelect from '@/@core/fields/select/tags-select/TagsSelect';
import TextInput from '@/@core/fields/inputs/TextInput';
import PlateSelect from '@/@core/fields/select/PlateSelect';
import TrailerCompanySelect from '@/@core/fields/select/TrailerCompanySelect';
import TrailerTypesSelect from '@/@core/fields/select/TrailerTypesSelect';
import FullDialog from '@/@core/ui-kits/full-dialog';
import YearInput from '@/@core/fields/inputs/YearInput';
import { EditTrailerDefaultValues } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailerForm';
import { TestIDs } from '@/configs/tests';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import VendorSelect from '@/@core/fields/select/VendorSelect';
import TrailerOwnershipTypeSelect from '@/@core/fields/select/TrailerOwnershipTypeSelect';
import { maxTrailerYear, minTrailerYear } from '../edit_trailer_schema';

type Props = {
    trailerId: string;
};

export default function EditTrailerForm({ trailerId }: Props) {
    const {
        control,
        formState: { errors }
    } = useFormContext<EditTrailerDefaultValues>();

    return (
        <FullDialog.Fields rowSpacing={5}>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="reference_id"
                    label="fields:trailer_reference_id.label"
                    testID={TestIDs.pages.editTrailer.fields.number}
                    control={control}
                    errors={errors}
                    placeholder="fields:trailer_reference_id.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    name="vin"
                    label="fields:vin.label"
                    testID={TestIDs.pages.editTrailer.fields.VIN}
                    control={control}
                    errors={errors}
                    placeholder="fields:vin.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <YearInput
                    width="100%"
                    name="year"
                    label="fields:year.label"
                    testID={TestIDs.pages.editTrailer.fields.year}
                    control={control}
                    errors={errors}
                    minDate={new Date(minTrailerYear, 1)}
                    maxDate={new Date(maxTrailerYear, 11)}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    name="make"
                    label="modals:trailers.edit.fields.make.label"
                    testID={TestIDs.pages.editTrailer.fields.make}
                    control={control}
                    errors={errors}
                    placeholder="modals:trailers.edit.fields.make.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    name="model"
                    label="modals:trailers.edit.fields.model.label"
                    testID={TestIDs.pages.editTrailer.fields.model}
                    control={control}
                    errors={errors}
                    placeholder="modals:trailers.edit.fields.model.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <PlateSelect
                    control={control}
                    testID={TestIDs.pages.editTrailer.fields.plateCompany}
                    vehicle_type="trailer"
                    trailerId={trailerId}
                    name="plate_id"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TrailerCompanySelect
                    control={control}
                    label="fields:company_id.label"
                    name="trailer_company_id"
                    testOptions={{
                        inputTestID: TestIDs.pages.editTrailer.fields.company,
                        addTestId  : TestIDs.pages.editTrailer.buttons.addCompany
                    }}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TrailerOwnershipTypeSelect
                    errors={errors}
                    control={control}
                    optionTestID={TestIDs.components.select.trailerOwnership.optionPrefix}
                    testID={TestIDs.pages.editTrailer.fields.ownership}
                    name="ownership_type"
                    required
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TrailerTypesSelect
                    control={control}
                    testID={TestIDs.pages.editTrailer.fields.type}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TagsSelect
                    control={control}
                    errors={errors}
                    inputTestID={TestIDs.pages.editTrailer.fields.tags}
                    entityType="TRAILER"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <VendorSelect
                    control={control}
                    name="vendor_id"
                    label="entity:vendor"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={4}>
                <NumberInput
                    name="company_rent_amount"
                    label="modals:trailers.edit.fields.company_rent_amount.label"
                    testID={TestIDs.pages.editTrailer.fields.rentMonthly}
                    control={control}
                    errors={errors}
                    placeholder="modals:trailers.edit.fields.company_rent_amount.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <NumberInput
                    name="company_deposit_amount"
                    label="modals:trailers.edit.fields.company_deposit_amount.label"
                    testID={TestIDs.pages.editTrailer.fields.deposit}
                    control={control}
                    errors={errors}
                    placeholder="modals:trailers.edit.fields.company_deposit_amount.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <NumberInput
                    name="driver_rent_amount"
                    label="modals:trailers.edit.fields.driver_rent_amount.label"
                    testID={TestIDs.pages.editTrailer.fields.driverRent}
                    control={control}
                    errors={errors}
                    placeholder="modals:trailers.edit.fields.driver_rent_amount.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
