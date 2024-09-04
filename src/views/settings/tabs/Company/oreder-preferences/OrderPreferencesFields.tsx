import { Form } from '@/views/settings/components/EditableInputsGroup/styled';
import { Control, FieldErrors } from 'react-hook-form';
import React from 'react';
import MapSectionsInputs from '@/views/settings/components/EditableInputsGroup/MapSectionsInputs';
import type { SettingsRetrieveReply_Orders } from '@proto/settings';

type Props = {
    control: Control<SettingsRetrieveReply_Orders>;
    errors: FieldErrors<SettingsRetrieveReply_Orders>;
    isEdit: boolean;
};

export default function OrderPreferencesFields({
    control,
    errors,
    isEdit
}: Props) {
    return (
        <Form>
            <MapSectionsInputs.TextInput
                control={control}
                errors={errors}
                name="friendlyIdPrefix"
                label="settings:company.fields.labels.order_friendly_id_prefix"
                placeholder="settings:company.fields.placeholders.order_friendly_id_prefix"
                isEdit={isEdit}
            />
            <MapSectionsInputs.NumberInput
                control={control}
                errors={errors}
                label="settings:company.fields.labels.order_id_start_number"
                placeholder="settings:company.fields.placeholders.order_id_start_number"
                name="friendlyIdStartNumber"
                isEdit={isEdit}
            />
        </Form>
    );
}
