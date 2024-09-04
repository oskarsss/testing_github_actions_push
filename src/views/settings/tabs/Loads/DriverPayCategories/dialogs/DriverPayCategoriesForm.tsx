import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { DefaultValues } from '@/views/settings/tabs/Loads/DriverPayCategories/dialogs/helpers';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    title: IntlMessageKey;
    methods: UseFormReturn<DefaultValues>;
    children: React.ReactNode;
    submit: (body: DefaultValues) => void;
};

export default function DriverPayCategoriesForm({
    title,
    methods,
    submit,
    children
}: Props) {
    const {
        control,
        formState: { errors }
    } = methods;

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title={title} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        label="modals:settings.loads.driver_pay_categories.fields.name.label"
                        name="name"
                        control={control}
                        errors={errors}
                        width="100%"
                        placeholder="modals:settings.loads.driver_pay_categories.fields.name.placeholder"
                        autoFocus
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
