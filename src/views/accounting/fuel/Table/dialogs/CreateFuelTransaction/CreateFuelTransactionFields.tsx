import DialogComponents from '@/@core/ui-kits/common-dialog';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import FuelReferenceIDField from '@/views/accounting/fuel/Table/dialogs/components/FuelReferenceIDField';
import TextInput from '@/@core/fields/inputs/TextInput';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { DefaultValues } from '@/views/accounting/fuel/Table/dialogs/CreateFuelTransaction/helpers';

type Props = {
    methods: UseFormReturn<DefaultValues>;
};

export default function CreateFuelTransactionFields({ methods }: Props) {
    const {
        control,
        formState: { errors }
    } = methods;

    return (
        <DialogComponents.Fields>
            <DialogComponents.Field xs={12}>
                <TruckSelect
                    name="truck_id"
                    control={control}
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <FuelReferenceIDField
                    name="reference_id"
                    control={control}
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.product.label"
                    name="product"
                    placeholder="modals:fuels.fields.product.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <AmountInput
                    control={control}
                    errors={errors}
                    width="100%"
                    label="fields:amount.label"
                    name="amount"
                    placeholder="fields:amount.placeholder"
                    step={1}
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <AmountInput
                    control={control}
                    errors={errors}
                    width="100%"
                    label="fields:discount_amount.label"
                    name="discount_amount"
                    placeholder="fields:discount_amount.placeholder"
                    step={1}
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.fuel_chain.label"
                    name="fuel_chain"
                    placeholder="modals:fuels.fields.fuel_chain.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <NumberInput
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.quantity.label"
                    name="quantity"
                    width="100%"
                    placeholder="modals:fuels.fields.quantity.placeholder"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={12}>
                <DateInput
                    control={control}
                    errors={errors}
                    width="100%"
                    label="modals:fuels.fields.date_time.label"
                    name="date_time"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <StateSelect
                    control={control}
                    errors={errors}
                    label="fields:state.label"
                    name="state"
                    width="100%"
                />
            </DialogComponents.Field>
            <DialogComponents.Field xs={6}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:city.label"
                    name="city"
                    width="100%"
                    placeholder="fields:city.placeholder"
                />
            </DialogComponents.Field>
        </DialogComponents.Fields>
    );
}
