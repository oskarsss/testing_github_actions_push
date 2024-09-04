import { FieldValues, Path } from 'react-hook-form';
import { useActiveRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import { TestIDs } from '@/configs/tests';
import { useMemo } from 'react';
import CustomAutocomplete from '@/@core/fields/select/components/CustomAutocomplete';
import { CustomInputProps } from '@/@core/fields/select/ColorSelect';
import createMap from '@/utils/create-map';

export default function SettlementRevenueTypeSelect<
    TFieldValues extends FieldValues = FieldValues
>({
    control,
    testID,
    required = false
}: CustomInputProps<TFieldValues>) {
    const { revenue_types } = useActiveRevenueTypes();

    const revenue_types_options = useMemo(
        () =>
            revenue_types.map((revenue_type) => ({
                id  : revenue_type.revenueTypeId,
                name: revenue_type.name
            })),
        [revenue_types]
    );

    const revenue_types_by_id = useMemo(
        () => createMap(revenue_types_options, 'id'),
        [revenue_types_options]
    );

    return (
        <CustomAutocomplete
            required={required}
            control={control}
            name={'settlementRevenueTypeId' as Path<TFieldValues>}
            label="entity:revenue_type"
            options={revenue_types_options}
            entities_by_id={revenue_types_by_id}
            testOptions={{
                inputTestID : testID,
                optionTestId: TestIDs.components.select.revenueType.optionPrefix
            }}
        />
    );
}
