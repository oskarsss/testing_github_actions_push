import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import VectorIcons from '@/@core/icons/vector_icons';
import { TestIDs } from '@/configs/tests';
import { useEditVendorForm } from '../../EditVendorForm';

export default function EditVendorContactDetails() {
    const {
        control,
        formState: { errors }
    } = useEditVendorForm();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.PersonalInfo />}
                title="modals:vendors.edit.block_title.contact_details"
            />

            <FullDialog.Field xs={6}>
                <TextInput
                    name="contactName"
                    label="modals:vendors.edit.fields.contact_name.label"
                    testID={TestIDs.pages.editVendor.fields.contactName}
                    control={control}
                    errors={errors}
                    placeholder="modals:vendors.edit.fields.contact_name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <TextInput
                    name="contactEmail"
                    label="modals:vendors.edit.fields.contact_email.label"
                    testID={TestIDs.pages.editVendor.fields.contactEmail}
                    control={control}
                    errors={errors}
                    placeholder="modals:vendors.edit.fields.contact_email.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <PhoneInput
                    name="contactPhoneNumber"
                    label="modals:vendors.edit.fields.contact_phone_number.label"
                    testID={TestIDs.pages.editVendor.fields.contactPhone}
                    control={control}
                    errors={errors}
                    placeholder="modals:vendors.edit.fields.contact_phone_number.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
