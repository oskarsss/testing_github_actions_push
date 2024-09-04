import type { Control, FieldErrors } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { COMMODITY_WEIGHT_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';
import { WeightUnit } from '@proto/models/weight_unit';
import SelectInput, { OptionsType } from '@/@core/fields/inputs/SelectInput';
import { memo } from 'react';
import type { DefaultValues } from '@/@core/ui-kits/loads/commodities-table/modals/Fields';

type Props = {
    control: Control<DefaultValues>;
    errors: FieldErrors<DefaultValues>;
};

function WeightUnitSelect({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();
    const options = Object.entries(COMMODITY_WEIGHT_UNIT)
        .filter(([key, value]) => Number(key) !== WeightUnit.UNSPECIFIED)
        .map(
            ([key, value]): OptionsType => ({
                label: t(value),
                value: key
            })
        );
    return (
        <SelectInput
            required
            control={control}
            errors={errors}
            name="weightUnit"
            width="100%"
            options={options}
            label="core:basic.load.commodities.dialogs.fields.weightUnit.label"
        />
    );
}

export default memo(WeightUnitSelect);
