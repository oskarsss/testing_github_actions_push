import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { UseFormReturn } from 'react-hook-form';
import { PropsWithChildren, useMemo } from 'react';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriverTypeTagsSelect from '@/@core/fields/select/DriverTypeTagsSelect';
import RecurringTransactionCycleFrequencyAutocomplete from '@/@core/fields/select/RecurringTransactionCycleFrequencyAutocomplete';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SettlementTransactionCategoryModel_EntityType } from '@proto/models/model_settlement.transaction_category';
import { DefaultValues } from './helpers';

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
    title: IntlMessageKey;
}>;

export default function CategoryDialogForm({
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

    const entity_types = useMemo(
        () => [
            {
                value: SettlementTransactionCategoryModel_EntityType.DRIVER,
                label: t('entity:driver')
            },
            {
                value: SettlementTransactionCategoryModel_EntityType.TRUCK,
                label: t('entity:truck')
            },
            {
                value: SettlementTransactionCategoryModel_EntityType.TRAILER,
                label: t('entity:trailer')
            }
        ],
        [t]
    );

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                textVariant="h5"
                title={title}
            />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        name="name"
                        label="modals:settings.settlements.debit_categories.fields.labels.name"
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="modals:settings.settlements.debit_categories.fields.labels.name"
                        width="100%"
                        autoFocus
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <SelectInput
                        required
                        name="entityType"
                        label="modals:settings.settlements.debit_categories.fields.labels.entity_type"
                        control={control}
                        errors={errors}
                        options={entity_types}
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <DriverTypeTagsSelect
                        showAddDriverTypeButton
                        control={control}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field
                    xs={12}
                    sx={{
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : '20px'
                    }}
                >
                    <CheckboxInput
                        name="required"
                        label="common:required"
                        control={control}
                        errors={errors}
                    />
                    <CheckboxInput
                        name="recurring"
                        label="modals:settings.settlements.debit_categories.fields.labels.recurring"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <RecurringTransactionCycleFrequencyAutocomplete
                        label="modals:settings.settlements.debit_categories.fields.labels.cycle_frequency"
                        control={control}
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            {children}
        </DialogComponents.Form>
    );
}
