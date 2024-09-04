import { Form } from '@/views/settings/components/EditableInputsGroup/styled';
import { Control, FieldErrors } from 'react-hook-form';

// import type { SettingsRetrieveReply_Invoicing } from '@proto/settings';
import React from 'react';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import { InvoicingCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';

type Props = {
    control: Control<InvoicingCompanyDefaultValue>;
    errors: FieldErrors<InvoicingCompanyDefaultValue>;
    isEdit: boolean;
};

export default function InvoicingCompaniesItemFields({
    control,
    errors,
    isEdit
}: Props) {
    return (
        <Form>
            <MapSectionsInputs.FileInput
                control={control}
                errors={errors}
                name="logoUrl"
                label="modals:settings.invoicing.invoicing_companies.fields.labels.logo"
                placeholder=""
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                label="fields:name.label"
                placeholder="fields:name.placeholder"
                name="name"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.DocumentsSelect
                control={control}
                errors={errors}
                name="documents"
                label="modals:settings.invoicing.invoicing_companies.fields.labels.attached_documents"
                placeholder=""
                isEdit={isEdit}
                multiple
            />
            <MapSectionsInputs.FactoringCompanySelect
                control={control}
                errors={errors}
                name="defaultFactoringCompanyId"
                label=""
                placeholder=""
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                label="modals:settings.invoicing.invoicing_companies.fields.labels.payment_instructions"
                placeholder="modals:settings.invoicing.invoicing_companies.fields.placeholders.payment_instructions"
                name="paymentInstructions"
                errors={errors}
                control={control}
                isEdit={isEdit}
            />
            <MapSectionsInputs.InvoicePaymentTermsSelect
                label="modals:settings.invoicing.invoicing_companies.fields.labels.payment_terms"
                name="paymentTerms"
                placeholder=""
                errors={errors}
                control={control}
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.PhoneNumberInput
                control={control}
                errors={errors}
                name="phone"
                placeholder="fields:phone_number.placeholder"
                label="fields:phone_number.label"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="email"
                placeholder="fields:email.label"
                label="fields:email.label"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.EmailsInput
                control={control}
                errors={errors}
                name="ccEmails"
                placeholder="modals:settings.invoicing.invoicing_companies.fields.placeholders.cc_emails"
                label="modals:settings.invoicing.invoicing_companies.fields.labels.cc_emails"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressLine1"
                label="fields:address_line_1.label"
                placeholder="fields:address_line_1.placeholder"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressLine2"
                label="fields:address_line_2.label"
                placeholder="fields:address_line_2.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressCity"
                label="fields:city.label"
                placeholder="fields:city.placeholder"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.StateSelect
                control={control}
                errors={errors}
                name="addressState"
                label="fields:state.label"
                placeholder="fields:state.placeholder"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressPostalCode"
                label="fields:postal_code.label"
                placeholder="fields:postal_code.placeholder"
                isEdit={isEdit}
                required
            />
        </Form>
    );
}
