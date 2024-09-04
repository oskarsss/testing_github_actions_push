import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useFormContext } from 'react-hook-form';
import VectorIcons from '@/@core/icons/vector_icons';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import type { DefaultValues } from '@/views/dispatch/customers/dialogs/EditCustomer/edit-customer-utils';

export default function EditCustomerPersonalFields() {
    const {
        control,
        formState: { errors }
    } = useFormContext<DefaultValues>();

    return (
        <>
            <FullDialog.FieldsGroupTitle
                startIcon={<VectorIcons.FullDialogIcons.PersonalInfo />}
                title="modals:customers.edit.fields.group_title.personal_info"
            />
            <FullDialog.Field xs={7}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="name"
                    placeholder="fields:name.placeholder"
                    label="fields:name.label"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={5}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="shortName"
                    placeholder="fields:short_name.placeholder"
                    label="fields:short_name.label"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="contactName"
                    placeholder="modals:customers.edit.fields.placeholders.contact_name"
                    label="modals:customers.edit.fields.labels.contact_name"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={6}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="contactPhone"
                    placeholder="modals:customers.edit.fields.placeholders.contact_phone"
                    label="modals:customers.edit.fields.labels.contact_phone"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="contactEmail"
                    placeholder="modals:customers.edit.fields.placeholders.contact_email"
                    label="modals:customers.edit.fields.labels.contact_email"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="contactFax"
                    placeholder="modals:customers.edit.fields.placeholders.contact_fax"
                    label="modals:customers.edit.fields.labels.contact_fax"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="billingEmail"
                    placeholder="modals:customers.edit.fields.placeholders.billing_email"
                    label="modals:customers.edit.fields.labels.billing_email"
                    width="100%"
                />
            </FullDialog.Field>
        </>
    );
}
