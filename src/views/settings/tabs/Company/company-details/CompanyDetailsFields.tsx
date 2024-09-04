import { Form } from '@/views/settings/components/EditableInputsGroup/styled';
import { Control, FieldErrors } from 'react-hook-form';
import React from 'react';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import type { SettingsRetrieveReply_Company } from '@proto/settings';

type Props = {
    control: Control<SettingsRetrieveReply_Company>;
    errors: FieldErrors<SettingsRetrieveReply_Company>;
    isEdit: boolean;
};

export default function CompanyDetailsFields({
    control,
    errors,
    isEdit
}: Props) {
    return (
        <Form>
            <MapSectionsInputs.FileInput
                control={control}
                errors={errors}
                name="lightLogoUrl"
                label="settings:company.fields.labels.light_icon"
                placeholder=""
                isEdit={isEdit}
            />
            <MapSectionsInputs.FileInput
                control={control}
                errors={errors}
                name="darkLogoUrl"
                label="settings:company.fields.labels.dark_icon"
                placeholder=""
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="name"
                label="fields:company_name.label"
                placeholder="fields:company_name.placeholder"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.PhoneNumberInput
                control={control}
                errors={errors}
                name="phone"
                label="fields:phone_number.label"
                placeholder="fields:phone_number.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.PhoneNumberInput
                control={control}
                errors={errors}
                name="fax"
                label="fields:fax.label"
                placeholder="fields:fax.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="email"
                label="settings:company.fields.labels.general_email"
                placeholder="fields:email.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="billingEmail"
                label="fields:billing_email.label"
                placeholder="fields:billing_email.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressLine1"
                label="fields:address_line_1.label"
                placeholder="fields:address_line_1.placeholder"
                isEdit={isEdit}
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
            />
            <MapSectionsInputs.StateSelect
                control={control}
                errors={errors}
                name="addressState"
                label="fields:state.label"
                placeholder="fields:state.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="addressPostalCode"
                label="fields:postal_code.label"
                placeholder="fields:postal_code.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.TimezoneSelect
                control={control}
                errors={errors}
                name="timezone"
                label="settings:company.fields.labels.timezone"
                placeholder=""
                isEdit={isEdit}
            />
        </Form>
    );
}
