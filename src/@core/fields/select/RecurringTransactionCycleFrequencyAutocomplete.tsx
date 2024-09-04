/* eslint-disable max-len */
import { Control, FieldValues, Path } from 'react-hook-form';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import createMap from '@/utils/create-map';
import type { IntlMessageKey } from '@/@types/next-intl';
import { RECURRING_TRANSACTION_CYCLE_PERIOD_FREQUENCY } from '@/models/settlements/settlements-mappings';
import { SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency } from '@proto/models/model_settlement.transaction_category';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    name?: Path<TFieldValues>;
    label: IntlMessageKey;
    disabled?: boolean;
    required?: boolean;
};

const cycle_frequency_options: SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency[] =
    [
        SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.EVERY_PERIOD,
        SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency.MONTHLY
    ];

export default function RecurringTransactionCycleFrequencyAutocomplete<
    TFieldValues extends FieldValues = FieldValues
>({
    name = 'recurringTransactionCyclePeriodFrequency' as Path<TFieldValues>,
    control,
    label,
    disabled = false,
    required = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();

    const Options: Option[] = cycle_frequency_options.map((option) => ({
        id  : option,
        name: t(
            `state_info:settlements.recurring_transaction_cycle_period_frequency.${RECURRING_TRANSACTION_CYCLE_PERIOD_FREQUENCY[option]}`
        )
    }));
    const optionsById = createMap(Options, 'id');

    return (
        <CustomAutocomplete
            control={control}
            name={name}
            label={label}
            options={Options}
            disabled={disabled}
            entities_by_id={optionsById}
            required={required}
        />
    );
}
