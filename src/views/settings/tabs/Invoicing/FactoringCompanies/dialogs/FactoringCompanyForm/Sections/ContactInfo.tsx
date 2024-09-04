import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettingIcons from '@/views/settings/icons/icons';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import SectionHeader from './SectionHeader';

export default function ContactInfo() {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors }
    } = useFactoringCompanyFormContext();

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
                title="modals:settings.invoicing.factoring_companies.sections.contact_info"
            />

            <DialogComponents.Field xs={5}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="phone"
                    placeholder="fields:phone_number.placeholder"
                    label="fields:phone_number.label"
                    width="100%"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={4}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    name="fax"
                    placeholder="modals:settings.invoicing.factoring_companies.fields.fax.placeholder"
                    label="modals:settings.invoicing.factoring_companies.fields.fax.label"
                    width="100%"
                    hideCountrySelect
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={3}>
                <TextInput
                    control={control}
                    errors={errors}
                    name="ein"
                    placeholder="modals:settings.invoicing.factoring_companies.fields.ein.placeholder"
                    label="modals:settings.invoicing.factoring_companies.fields.ein.label"
                    width="100%"
                />
            </DialogComponents.Field>
        </>
    );
}
