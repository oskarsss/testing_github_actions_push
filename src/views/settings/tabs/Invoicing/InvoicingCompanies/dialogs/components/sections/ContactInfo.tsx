import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettingIcons from '@/views/settings/icons/icons';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import { Control, FieldErrors } from 'react-hook-form';
import { InvoicingCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import EmailsInput from '@/@core/fields/inputs/EmailsInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import SectionHeader from './SectionHeader';

type Props = {
    control: Control<InvoicingCompanyDefaultValue>;
    errors: FieldErrors<InvoicingCompanyDefaultValue>;
};

export default function ContactInfo({
    control,
    errors
}: Props) {
    return (
        <>
            <SectionHeader
                startIcon={(
                    <SettingIcons.ContactInfo
                        sx={{
                            svg: {
                                fill: (theme) => theme.palette.semantic.foreground.brand.primary
                            }
                        }}
                    />
                )}
                title="modals:settings.invoicing.invoicing_companies.sections.contact_info"
            />
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="email"
                    placeholder="fields:email.placeholder"
                    label="fields:email.label"
                    width="100%"
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="phone"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <EmailsInput
                    control={control}
                    errors={errors}
                    name="ccEmails"
                    placeholder="modals:settings.invoicing.invoicing_companies.fields.placeholders.cc_emails"
                    label="modals:settings.invoicing.invoicing_companies.fields.labels.cc_emails"
                    width="100%"
                    size="medium"
                />
            </DialogComponents.Field>
        </>
    );
}
