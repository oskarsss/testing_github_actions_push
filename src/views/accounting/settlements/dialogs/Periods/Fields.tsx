import DialogComponents from '@/@core/ui-kits/common-dialog';
import type { UseFormReturn } from 'react-hook-form';
import type { PropsWithChildren } from 'react';
import DateInput from '@/@core/fields/inputs/DateInput';
import type { IntlMessageKey } from '@/@types/next-intl';
import type { DefaultValues } from './form-config';

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    onSubmit: (data: DefaultValues) => void;
    formTitle: IntlMessageKey;
}>;

export default function PeriodDialogFields({
    methods,
    onSubmit,
    children,
    formTitle
}: Props) {
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DialogComponents.Header title={formTitle} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <DateInput
                        errors={errors}
                        control={control}
                        label="fields:start_date.label"
                        name="startDatetime"
                        width="100%"
                        variant="outlined"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <DateInput
                        errors={errors}
                        control={control}
                        label="fields:end_date.label"
                        name="endDatetime"
                        width="100%"
                        variant="outlined"
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
