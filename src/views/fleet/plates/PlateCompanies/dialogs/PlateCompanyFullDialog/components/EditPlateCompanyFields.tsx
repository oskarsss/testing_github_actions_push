import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import React from 'react';
import StateSelect from '@/@core/fields/select/StateSelect';
import { UseFormReturn } from 'react-hook-form';
import { EditPlateCompanyDefaultValue } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompanyFullDialog/helpers';

type Props = {
    method: UseFormReturn<EditPlateCompanyDefaultValue>;
};

export default function EditPlateCompanyFields({ method }: Props) {
    const {
        control,
        formState: { errors }
    } = method;
    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:company_name.label"
                    name="name"
                    placeholder="fields:company_name.placeholder"
                    type="text"
                    width="100%"
                    required
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:reference_id.label"
                    name="referenceId"
                    placeholder="fields:reference_id.placeholder"
                    type="text"
                    width="100%"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <StateSelect
                    name="state"
                    label="fields:state.label"
                    control={control}
                    errors={errors}
                    width="100%"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
