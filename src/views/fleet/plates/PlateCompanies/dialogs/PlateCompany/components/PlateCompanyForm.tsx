import DialogComponents from '@/@core/ui-kits/common-dialog';
import { UseFormReturn } from 'react-hook-form';
import React from 'react';
import TextInput from '@/@core/fields/inputs/TextInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import type { PlateCompanyCreateRequest } from '@proto/plate.company';

type Props = {
    title: IntlMessageKey;
    translateOptions?: IntlOptions;
    method: UseFormReturn<PlateCompanyCreateRequest>;
    children: React.ReactNode;
    submit: (body: PlateCompanyCreateRequest) => void;
};

export default function PlateCompanyForm({
    title,
    translateOptions,
    method,
    children,
    submit
}: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title={title}
                translationOptions={translateOptions}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
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
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:reference_id.label"
                        name="referenceId"
                        placeholder="fields:reference_id.placeholder"
                        type="text"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <StateSelect
                        name="state"
                        label="fields:state.label"
                        control={control}
                        errors={errors}
                        width="100%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>{children}</DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
