import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { GrossLabel } from '@/@core/ui-kits/basic/gross-label/GrossLabel';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export type DefaultValues = {
    name: string;
    required: boolean;
    include_in_gross_amount: boolean;
};

type Props = {
    title: IntlMessageKey;
    methods: UseFormReturn<DefaultValues>;
    children: React.ReactNode;
    submit: (body: DefaultValues) => void;
    categoryId?: string;
};

export default function InvoiceItemCategoryForm({
    title,
    methods,
    submit,
    children,
    categoryId
}: Props) {
    const { t } = useAppTranslation('modals');
    const {
        control,
        formState: { errors },
        watch
    } = methods;

    const isGross = watch('include_in_gross_amount');

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title={title} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <Stack position="relative">
                        <TextInput
                            required
                            label="modals:settings.loads.invoice_item_categories.fields.name.label"
                            name="name"
                            control={control}
                            errors={errors}
                            width="100%"
                            placeholder="modals:settings.loads.invoice_item_categories.fields.name.placeholder"
                            autoFocus
                            inputProps={{
                                endAdornment: isGross ? <GrossLabel /> : null
                            }}
                        />
                    </Stack>
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="required"
                        label={(
                            <Typography
                                sx={{ fontSize: '12px' }}
                                variant="body1"
                            >
                                {t('settings.loads.invoice_item_categories.fields.required.label')}
                            </Typography>
                        )}
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="include_in_gross_amount"
                        label={(
                            <Typography
                                component="span"
                                sx={{ fontSize: '12px', display: 'inline-flex' }}
                                variant="body1"
                            >
                                {t(
                                    'settings.loads.invoice_item_categories.fields.include_in_gross_amount.label'
                                )}
                            </Typography>
                        )}
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
