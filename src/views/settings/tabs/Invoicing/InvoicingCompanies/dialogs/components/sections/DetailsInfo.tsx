import { Control, FieldErrors } from 'react-hook-form';
import { InvoicingCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import SectionHeader from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/SectionHeader';
import SettingIcons from '@/views/settings/icons/icons';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import FactoringCompanySelect from '@/@core/fields/select/FactoringCompanySelect';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useMemo } from 'react';
import { invoicePaymentTermsOptions } from '@/views/settings/components/EditableInputsGroup/constants';
import LogoInput from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/components/LogoInput';

type Props = {
    control: Control<InvoicingCompanyDefaultValue>;
    errors: FieldErrors<InvoicingCompanyDefaultValue>;
};

export default function DetailsInfo({
    control,
    errors
}: Props) {
    const { documentTypes } = useActiveDocumentTypes();

    const documentsOptions = useMemo(
        () =>
            documentTypes
                .filter((d) => d.entityType === DocumentModel_DocumentEntityType.LOAD)
                .map((item) => ({
                    value: item.documentTypeId,
                    name : item.title
                })),
        [documentTypes]
    );

    return (
        <>
            <SectionHeader
                startIcon={(
                    <SettingIcons.Invoicing
                        sx={{
                            svg: {
                                fill: (theme) => theme.palette.semantic.foreground.brand.primary
                            }
                        }}
                    />
                )}
                title="modals:settings.invoicing.invoicing_companies.sections.details"
            />

            <DialogComponents.Field xs={12}>
                <TextInput
                    label="fields:name.label"
                    placeholder="fields:name.placeholder"
                    name="name"
                    width="100%"
                    errors={errors}
                    control={control}
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={5}>
                <LogoInput
                    control={control}
                    errors={errors}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={7}>
                <FactoringCompanySelect
                    control={control}
                    errors={errors}
                    name="defaultFactoringCompanyId"
                    width="100%"
                    variant="filled"
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <TextInput
                    label="modals:settings.invoicing.invoicing_companies.fields.labels.payment_instructions"
                    placeholder="modals:settings.invoicing.invoicing_companies.fields.placeholders.payment_instructions"
                    name="paymentInstructions"
                    width="100%"
                    errors={errors}
                    control={control}
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={6}>
                <SelectInput
                    label="modals:settings.invoicing.invoicing_companies.fields.labels.payment_terms"
                    name="paymentTerms"
                    width="100%"
                    errors={errors}
                    control={control}
                    options={invoicePaymentTermsOptions}
                    required
                />
            </DialogComponents.Field>

            <DialogComponents.Field xs={12}>
                <SelectInput
                    multiple
                    label="modals:settings.invoicing.invoicing_companies.fields.labels.attached_documents"
                    name="documents"
                    width="100%"
                    errors={errors}
                    control={control}
                    options={documentsOptions}
                />
            </DialogComponents.Field>
        </>
    );
}
