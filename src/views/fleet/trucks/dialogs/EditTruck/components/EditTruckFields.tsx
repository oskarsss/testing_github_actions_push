import { useAppTranslation } from '@/hooks/useAppTranslation';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import TagsSelect from '@/@core/fields/select/tags-select/TagsSelect';
import FullDialog from '@/@core/ui-kits/full-dialog';
import ColorSelect from '@/@core/fields/select/ColorSelect';
import VendorSelect from '@/@core/fields/select/VendorSelect';
import PlateSelect from '@/@core/fields/select/PlateSelect';
import { TestIDs } from '@/configs/tests';
import YearInput from '@/@core/fields/inputs/YearInput';
import BrandCheckbox from '@/@core/ui-kits/basic/brand-checkbox/BrandCheckbox';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import ControlledCheckboxInput from '@/@core/fields/checkbox/ControlledCheckbox';
import { useEditTruckForm } from '../EditTruckForm';
import { type_options } from '../edit_truck_options';
import { maxTruckYear, minTruckYear } from '../schema';

type Props = {
    insuredEndorsed: boolean;
    truckId: string;
};

export default function EditTruckFields({
    insuredEndorsed,
    truckId
}: Props) {
    const {
        control,
        formState: { errors }
    } = useEditTruckForm();
    const { t } = useAppTranslation();

    const [updateInsuredEndorsed] = TrucksGrpcService.useUpdateTruckInsuranceEndorsedMutation();
    const confirm = useConfirm();

    const updateHandler = (value: boolean) => {
        updateInsuredEndorsed({
            truckId,
            insuranceEndorsed: value
        });
    };

    const handleChangeInsuranceEndorsed = (value: boolean) => {
        confirm({
            title: value
                ? 'modals:trucks.edit.confirm.change_insurance.endorse.title'
                : 'modals:trucks.edit.confirm.change_insurance.remove.title',
            body: value
                ? 'modals:trucks.edit.confirm.change_insurance.endorse.body'
                : 'modals:trucks.edit.confirm.change_insurance.remove.body',
            onConfirm   : () => updateHandler(value),
            confirm_text: 'common:button.confirm'
        });
    };

    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="referenceId"
                    label="modals:trucks.edit.fields.reference_id.label"
                    testID={TestIDs.pages.editTruck.fields.truckNumber}
                    control={control}
                    errors={errors}
                    placeholder="modals:trucks.edit.fields.reference_id.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    width="100%"
                    name="vin"
                    label="fields:vin.label"
                    testID={TestIDs.pages.editTruck.fields.VIN}
                    control={control}
                    errors={errors}
                    placeholder="fields:vin.placeholder"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <YearInput
                    width="100%"
                    name="year"
                    label="fields:year.label"
                    testID={TestIDs.pages.editTruck.fields.year}
                    control={control}
                    errors={errors}
                    minDate={new Date(minTruckYear, 1)}
                    maxDate={new Date(maxTruckYear, 11)}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    width="100%"
                    name="make"
                    label="modals:trucks.edit.fields.make.label"
                    testID={TestIDs.pages.editTruck.fields.make}
                    control={control}
                    errors={errors}
                    placeholder="modals:trucks.edit.fields.make.placeholder"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    name="model"
                    label="modals:trucks.edit.fields.model.label"
                    testID={TestIDs.pages.editTruck.fields.model}
                    control={control}
                    errors={errors}
                    placeholder="modals:trucks.edit.fields.model.placeholder"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <PlateSelect
                    control={control}
                    testID={TestIDs.pages.editTruck.fields.plateCompany}
                    vehicle_type="truck"
                    width="100%"
                    truckId={truckId}
                    name="plateId"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <SelectInput
                    required
                    width="100%"
                    name="type"
                    label="fields:type.label"
                    testID={TestIDs.pages.editTruck.fields.type}
                    control={control}
                    errors={errors}
                    options={type_options(t)}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    width="100%"
                    name="tollTransponder"
                    testID={TestIDs.pages.editTruck.fields.tollTransponder}
                    label="modals:trucks.edit.fields.toll_transponder.label"
                    placeholder="modals:trucks.edit.fields.toll_transponder.placeholder"
                    type="text"
                    control={control}
                    errors={errors}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TagsSelect
                    inputTestID={TestIDs.pages.editTruck.fields.tags}
                    control={control}
                    errors={errors}
                    entityType="TRUCK"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <ColorSelect
                    control={control}
                    testID={TestIDs.pages.editTruck.fields.color}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <VendorSelect
                    control={control}
                    name="vendorId"
                    label="fields:vendor.label"
                    testOptions={{
                        inputTestID: TestIDs.pages.editTruck.fields.vendor,
                        addTestId  : TestIDs.pages.editTruck.buttons.addVendor
                    }}
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <ControlledCheckboxInput
                    control={control}
                    label="modals:trucks.edit.fields.fuel_discounts_enabled.label"
                    name="fuelDiscountsEnabled"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <BrandCheckbox
                    variant="fullWidth"
                    label="modals:trucks.edit.fields.insurance_endorsed.label"
                    setCheck={handleChangeInsuranceEndorsed}
                    checked={insuredEndorsed}
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
