import type { Control, FieldErrors } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { COMMODITY_MEASUREMENT_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';
import { MeasurementUnit } from '@proto/models/measurement_unit';
import SelectInput, { OptionsType } from '@/@core/fields/inputs/SelectInput';
import { memo } from 'react';
import type { DefaultValues } from '@/@core/ui-kits/loads/commodities-table/modals/Fields';

type Props = {
    control: Control<DefaultValues>;
    errors: FieldErrors<DefaultValues>;
};

function MeasurementSelect({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();
    const options = Object.entries(COMMODITY_MEASUREMENT_UNIT)
        .filter(([key, value]) => Number(key) !== MeasurementUnit.UNSPECIFIED)
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
            name="measurementUnit"
            width="100%"
            options={options}
            label="core:basic.load.commodities.dialogs.fields.measurementUnit.label"
        />
    );
}

export default memo(MeasurementSelect);
