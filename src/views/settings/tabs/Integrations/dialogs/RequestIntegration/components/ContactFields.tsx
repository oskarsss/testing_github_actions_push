import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { FieldsProps } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/helpers';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';

export default function ContactFields({
    control,
    errors
}: FieldsProps) {
    return (
        <DialogComponents.Fields sx={{ mb: '32px' }}>
            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="contact_name"
                    label="modals:settings.integrations.request_integration.fields.contact_name.label"
                    placeholder="modals:settings.integrations.request_integration.fields.contact_name.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="contact_email"
                    label="fields:email.label"
                    placeholder="fields:email.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="contact_phone"
                    label="modals:settings.integrations.request_integration.fields.contact_phone.label"
                    placeholder="modals:settings.integrations.request_integration.fields.contact_phone.placeholder"
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
