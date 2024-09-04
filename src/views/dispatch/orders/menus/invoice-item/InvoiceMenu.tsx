import TextInput from '@/@core/fields/inputs/TextInput';
import { PropsWithChildren } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { DefaultValuesInvoiceItem } from '@/views/dispatch/orders/menus/invoice-item/DefaultValuesInvoiceItem';
import InvoiceItemsSelect from '@/@core/fields/select/invoice-item-select/InvoiceItemsSelect';
import MenuComponents from '@/@core/ui-kits/menus';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import type { IntlMessageKey } from '@/@types/next-intl';
import Amount from './Amount';

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValuesInvoiceItem>;
    submit: (data: DefaultValuesInvoiceItem) => void;
    title: IntlMessageKey;
}>;

export default function InvoiceMenu({
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
                <MenuComponents.Field xs={12}>
                    <InvoiceItemsSelect
                        required
                        control={control}
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={6}>
                    <TextInput
                        required
                        label="fields:amount_per_unit.label"
                        name="amount_per_unit"
                        control={control}
                        errors={errors}
                        placeholder="fields:amount_per_unit.placeholder"
                        type="number"
                        width="100%"
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={6}>
                    <NumberInput
                        label="fields:units.label"
                        name="units"
                        required
                        control={control}
                        errors={errors}
                        placeholder="fields:units.placeholder"
                        width="100%"
                    />
                </MenuComponents.Field>
                <MenuComponents.Field xs={12}>
                    <Amount control={control} />
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
                    />
                </MenuComponents.Field>

                {children}
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
