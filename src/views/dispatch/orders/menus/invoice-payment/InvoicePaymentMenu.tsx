import { PropsWithChildren } from 'react';

import { UseFormReturn } from 'react-hook-form';

import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import MenuComponents from '@/@core/ui-kits/menus';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import type { IntlMessageKey } from '@/@types/next-intl';
import { DefaultValues } from './DefaultValues';

const receiver_entity_types_options = [
    { value: 'company', label: 'Company' },
    { value: 'driver', label: 'Driver' }
];

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
    title: IntlMessageKey;
}>;

export default function InvoicePaymentMenu({
    methods,
    submit,
    title,
    children
}: Props) {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;

    return (
        <MenuComponents.Form
            width="425px"
            onSubmit={handleSubmit(submit)}
        >
            <MenuComponents.FormHeader text={title} />

            <MenuComponents.Fields>
                <MenuComponents.Field xs={6}>
                    <NumberInput
                        required
                        label="fields:amount.label"
                        name="amount"
                        control={control}
                        errors={errors}
                        placeholder="fields:amount.placeholder"
                        width="100%"
                    />
                </MenuComponents.Field>

                <MenuComponents.Field xs={6}>
                    <SelectInput
                        required
                        label="modals:loads.invoice_payment.labels.receiver_type"
                        name="receiver_entity_type"
                        control={control}
                        errors={errors}
                        options={receiver_entity_types_options}
                        width="100%"
                    />
                </MenuComponents.Field>

                <MenuComponents.Field xs={12}>
                    <DateInput
                        label="modals:loads.invoice_payment.labels.paid_on"
                        type="date"
                        name="paid_on"
                        control={control}
                        errors={errors}
                        width="100%"
                        AMPMTime={false}
                    />
                </MenuComponents.Field>

                <MenuComponents.Field xs={12}>
                    <TextInput
                        label="fields:description.label"
                        name="description"
                        control={control}
                        errors={errors}
                        placeholder="fields:description.placeholder"
                        type="text"
                        width="100%"
                        multiline
                    />
                </MenuComponents.Field>
                {children}
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
