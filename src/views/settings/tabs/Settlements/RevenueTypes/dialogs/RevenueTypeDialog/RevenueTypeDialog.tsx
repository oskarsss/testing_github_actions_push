import React, { PropsWithChildren } from 'react';
import { UseFormReturn } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import ChipsSelect from '@/@core/fields/select/ChipSelect';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { DefaultValues } from './helpers';

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    chips_options: { id: string; title: string }[];
}>;

export default function RevenueTypeDialog({
    methods,
    submit,
    title,
    translationOptions,
    chips_options,
    children
}: Props) {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                Icon={<TimelapseIcon color="primary" />}
                textVariant="h6"
                title={title}
                translationOptions={translationOptions}
            />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        label="fields:name.label"
                        placeholder="fields:name.placeholder"
                        name="name"
                        width="100%"
                        errors={errors}
                        control={control}
                        autoFocus
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label="modals:settings.settlements.revenue_types.fields.deduct_fuel.label"
                        name="deduct_fuel"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label="modals:settings.settlements.revenue_types.fields.deduct_tolls.label"
                        name="deduct_tolls"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label="modals:settings.settlements.revenue_types.fields.default.label"
                        name="default"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <ChipsSelect
                        label="modals:settings.settlements.revenue_types.fields.documents.label"
                        options={chips_options}
                        name="attach_document_type_ids"
                        control={control}
                        errors={errors}
                        width="100%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
