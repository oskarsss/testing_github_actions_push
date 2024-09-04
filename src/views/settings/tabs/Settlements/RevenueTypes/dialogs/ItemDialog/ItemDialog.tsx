import React, { PropsWithChildren } from 'react';
import { UseFormReturn } from 'react-hook-form';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import InputDependsOnType from './InputDependsOnType';
import { DefaultValues } from './helpers';
import CONSTS from '../../../constants';

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
    title: IntlMessageKey;
}>;

export default function ItemDialog({
    methods,
    submit,
    title,
    children
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;

    const types_options = Object.entries(CONSTS.TYPE_ITEMS).map(([value, label]) => ({
        value,
        label: t(`settings:settlements.revenue_types.item.types.${label}`)
    }));

    const type = methods.watch('type');

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                Icon={<TimelapseIcon color="primary" />}
                textVariant="h6"
                title={title}
            />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <SelectInput
                        required
                        label="fields:type.label"
                        name="type"
                        options={types_options}
                        width="100%"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <InputDependsOnType
                        type={type}
                        required
                        control={control}
                        errors={errors}
                        name="amount"
                        width="100%"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
