import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { FieldsProps } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/helpers';

export default function IntegrationInfoFields({
    control,
    errors
}: FieldsProps) {
    return (
        <DialogComponents.Fields>
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="integration_name"
                    label="modals:settings.integrations.request_integration.fields.integration_name.label"
                    placeholder="modals:settings.integrations.request_integration.fields.integration_name.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="integration_website"
                    label="modals:settings.integrations.request_integration.fields.integration_website.label"
                    placeholder="modals:settings.integrations.request_integration.fields.integration_website.placeholder"
                    required
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    width="100%"
                    name="integration_purpose"
                    label="modals:settings.integrations.request_integration.fields.integration_purpose.label"
                    placeholder="modals:settings.integrations.request_integration.fields.integration_purpose.placeholder"
                    inputProps={{
                        minRows: 3,
                        maxRows: 3
                    }}
                    multiline
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
