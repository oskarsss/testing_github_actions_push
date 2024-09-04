import FullDialog from '@/@core/ui-kits/full-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TestIDs } from '@/configs/tests';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import SYSTEM from '@/@system';
import { DefaultValues } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/defaultValues';

type Props = {
    method: UseFormReturn<DefaultValues>;
};

export default function EditTrailerCompanyFields({ method }: Props) {
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
                    testID={TestIDs.pages.trailersCompanies.fields.companyName}
                    placeholder="fields:company_name.placeholder"
                    width="100%"
                    autoFocus
                    required
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <PhoneInput
                    control={control}
                    errors={errors}
                    label="fields:phone_number.label"
                    name="phoneNumber"
                    testID={TestIDs.pages.trailersCompanies.fields.companyPhone}
                    placeholder="fields:phone_number.placeholder"
                    width="100%"
                    required
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:email.label"
                    name="email"
                    testID={TestIDs.pages.trailersCompanies.fields.companyEmail}
                    placeholder=""
                    placeholderWithoutTranslate={SYSTEM.SUPPORT_EMAIL}
                    width="100%"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
