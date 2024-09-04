import { Form } from '@/views/settings/components/EditableInputsGroup/styled';
import { Control, FieldErrors } from 'react-hook-form';
import React from 'react';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import type { SettlementsLetterheadDefaultValues } from '@/views/settings/tabs/Settlements/SettlementsGeneral/settlements-letterhead/SettlementsLetterhead';

type Props = {
    control: Control<SettlementsLetterheadDefaultValues>;
    errors: FieldErrors<SettlementsLetterheadDefaultValues>;
    isEdit: boolean;
};

export default function SettlementsLetterheadFields({
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
                label="settings:settlements.general.fields.labels.logo"
                placeholder=""
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
                name="companyName"
                label="fields:company_name.label"
                placeholder="fields:company_name.placeholder"
                isEdit={isEdit}
                required
            />
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="email"
                label="fields:email.label"
                placeholder="fields:email.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.PhoneNumberInput
                control={control}
                errors={errors}
                name="phone"
                label="fields:phone_number.label"
                placeholder="fields:phone_number.placeholder"
                isEdit={isEdit}
            />
            <MapSectionsInputs.NumberInput
                control={control}
                errors={errors}
                label="settings:settlements.general.fields.labels.id_start_number"
                placeholder="settings:settlements.general.fields.placeholders.id_start_number"
                name="friendlyIdStartNumber"
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
        </Form>
    );
}
