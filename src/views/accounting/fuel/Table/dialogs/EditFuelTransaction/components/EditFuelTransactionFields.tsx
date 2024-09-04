import FullDialog from '@/@core/ui-kits/full-dialog';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import StateSelect from '@/@core/fields/select/StateSelect';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import FuelReferenceIDField from '@/views/accounting/fuel/Table/dialogs/components/FuelReferenceIDField';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import React from 'react';
import { useEditFuelTransactionForm } from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/helpers';

type Props = {
    fuelTransactionId: string;
};

export default function EditFuelTransactionFields({ fuelTransactionId }: Props) {
    const {
        control,
        formState: { errors }
    } = useEditFuelTransactionForm();
    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={12}>
                <TruckSelect
                    name="truck_id"
                    control={control}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:address.label"
                    name="address"
                    placeholder="fields:address.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.chain.label"
                    name="chain"
                    placeholder="modals:fuels.fields.chain.placeholder"
                />
            </FullDialog.Field>
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
                <TextInput
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.product.label"
                    name="product"
                    placeholder="modals:fuels.fields.product.placeholder"
                    width="100%"
                />
            </DialogComponents.Field>
            <FullDialog.Field xs={12}>
                <FuelReferenceIDField
                    name="referenceId"
                    placeholder="1234"
                    control={control}
                    fuelTransactionId={fuelTransactionId}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <AmountInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.total_amount.label"
                    name="totalAmount"
                    placeholder="modals:fuels.fields.total_amount.placeholder"
                    step={1}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <AmountInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:discount_amount.label"
                    name="discountAmount"
                    placeholder="fields:discount_amount.placeholder"
                    step={1}
                />
            </FullDialog.Field>
            <FullDialog.Field xs={4}>
                <AmountInput
                    width="100%"
                    control={control}
                    errors={errors}
                    readonly
                    label="modals:fuels.fields.total_discounted_amount.label"
                    name="totalDiscountedAmount"
                    placeholder="modals:fuels.fields.total_discounted_amount.placeholder"
                    showZero
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <DateInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.datetime.label"
                    name="datetime"
                    type="datetime"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="modals:fuels.fields.truck_stop.label"
                    name="truckStop"
                    placeholder="modals:fuels.fields.truck_stop.placeholder"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}
