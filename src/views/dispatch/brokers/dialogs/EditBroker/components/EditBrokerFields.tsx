import { useEditBrokerForm } from '@/views/dispatch/brokers/dialogs/EditBroker/EditBrokerForm';
import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import NumberInput from '@/@core/fields/inputs/NumberInput';

export default function EditBrokerFields() {
    const {
        control,
        formState: { errors }
    } = useEditBrokerForm();
    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={12}>
                <TextInput
                    required
                    name="name"
                    label="fields:broker_name.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:broker_name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={7}>
                <TextInput
                    name="shortName"
                    label="fields:short_name.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:short_name.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={5}>
                <NumberInput
                    name="dot"
                    label="fields:dot.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:dot.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={7}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="phoneNumber"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={5}>
                <NumberInput
                    name="mc"
                    label="fields:mc.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:mc.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    name="billingEmail"
                    label="modals:brokers.edit.fields.billing_email.label"
                    control={control}
                    errors={errors}
                    placeholder="modals:brokers.edit.fields.billing_email.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    name="email"
                    label="fields:email.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:email.placeholder"
                    width="100%"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    required
                    name="address"
                    label="fields:address.label"
                    control={control}
                    errors={errors}
                    placeholder="fields:address.placeholder"
                    width="100%"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
