import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import { useEditVendorForm } from '../../EditVendorForm';

export default function EditVendorAddress() {
    const {
        control,
        formState: { errors }
    } = useEditVendorForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.AddressInfo />}
                title="modals:vendors.edit.block_title.address"
            />

            <FullDialog.Field xs={12}>
                <StateSelect
                    name="addressState"
                    label="fields:state.label"
                    control={control}
                    errors={errors}
                    testID={TestIDs.pages.editVendor.fields.addressState}
                    placeholder="modals:vendors.edit.fields.state.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="addressLine1"
                    label="fields:address_line_1.label"
                    testID={TestIDs.pages.editVendor.fields.addressLine1}
                    control={control}
                    errors={errors}
                    placeholder="fields:address_line_1.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="addressLine2"
                    label="fields:address_line_2.label"
                    testID={TestIDs.pages.editVendor.fields.addressLine2}
                    control={control}
                    errors={errors}
                    placeholder="fields:address_line_2.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="addressCity"
                    label="fields:city.label"
                    testID={TestIDs.pages.editVendor.fields.city}
                    control={control}
                    errors={errors}
                    placeholder="fields:city.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <NumberInput
                    control={control}
                    errors={errors}
                    name="addressPostalCode"
                    label="fields:postal_code.label"
                    testID={TestIDs.pages.editVendor.fields.postalCode}
                    placeholder="fields:postal_code.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
