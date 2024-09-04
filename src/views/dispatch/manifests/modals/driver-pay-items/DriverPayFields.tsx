import NumberInput from '@/@core/fields/inputs/NumberInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React, { PropsWithChildren } from 'react';
import { Control, UseFormReturn, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import DriverPayItemsSelect from '@/@core/fields/select/driver-pay-items-select/DriverPayItemsSelect';
import { IntlMessageKey } from '@/@types/next-intl';

export type DriverPayFieldsType = {
    category_id: string;
    amount_per_unit: string;
    units: number;
    description: string;
};

export const schema: yup.ObjectSchema<DriverPayFieldsType> = yup.object().shape({
    category_id    : yup.string().min(1, 'Select a category').required(),
    amount_per_unit: yup.string().typeError('required field').required('required field'),
    units          : yup.number().required('required field'),
    description    : yup.string().defined()
});

export const DriverPayFieldsDefaultValues: DriverPayFieldsType = {
    category_id    : '',
    amount_per_unit: '',
    units          : 0,
    description    : ''
};

type Props = PropsWithChildren<{
    submit: (data: DriverPayFieldsType) => void;
    title: IntlMessageKey;
    methods: UseFormReturn<DriverPayFieldsType>;
}>;

function Amount({ control }: { control: Control<DriverPayFieldsType> }) {
    const amount_per_unit = useWatch({ control, name: 'amount_per_unit' });
    const units = useWatch({ control, name: 'units' });

    const units_value = Number(units);
    const amount_per_unit_value = Number(amount_per_unit);

    return (
        <div
            style={{
                width         : '30%',
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'center',
                alignItems    : 'center'
            }}
        >
            {units_value && amount_per_unit_value ? (
                <span>${(amount_per_unit_value * units_value).toFixed(2)}</span>
            ) : (
                '$0.00'
            )}
        </div>
    );
}

export default function DriverPayFields({
    children,
    methods,
    submit,
    title
}: Props) {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title={title} />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <DriverPayItemsSelect
                        required
                        control={control}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        required
                        label="fields:amount_per_unit.label"
                        name="amount_per_unit"
                        control={control}
                        errors={errors}
                        placeholder="fields:amount_per_unit.placeholder"
                        type="number"
                        width="100%"
                        inputProps={{
                            inputProps: {
                                step: '0.01'
                            }
                        }}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <NumberInput
                        required
                        label="fields:units.label"
                        name="units"
                        control={control}
                        errors={errors}
                        placeholder="fields:units.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <Amount control={control} />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        label="fields:description.label"
                        name="description"
                        control={control}
                        errors={errors}
                        placeholder="fields:description.placeholder"
                        type="text"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>{children}</DialogComponents.Field>
            </DialogComponents.Fields>
        </DialogComponents.Form>
    );
}
