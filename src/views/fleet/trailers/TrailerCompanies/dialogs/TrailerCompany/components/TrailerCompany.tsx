import TextInput from '@/@core/fields/inputs/TextInput';
import { TestIDs } from '@/configs/tests';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SYSTEM from '@/@system';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { DefaultValues } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/defaultValues';

type Props = {
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    method: UseFormReturn<DefaultValues>;
    children: React.ReactNode;
    submit: (body: DefaultValues) => void;
};

export default function TrailerCompany({
    title,
    translationOptions,
    method,
    submit,
    children
}: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;
    return (
        <DialogComponents.Form
            testID={TestIDs.pages.trailersCompanies.areas.addCompanyModal}
            onSubmit={handleSubmit(submit)}
        >
            <DialogComponents.Header
                title={title}
                translationOptions={translationOptions}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
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
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
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
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:email.label"
                        name="email"
                        testID={TestIDs.pages.trailersCompanies.fields.companyEmail}
                        placeholder=""
                        placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                        width="100%"

                        // required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
