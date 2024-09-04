import { CSSProperties } from 'react';
import { Control, ErrorOption, Path, FieldValues } from 'react-hook-form';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import PercentageInput from '@/@core/fields/inputs/PercentageInput';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    type: string;
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    width: CSSProperties['width'];
    required: boolean;
}

export default function InputDependsOnType<TFieldValues extends FieldValues = FieldValues>({
    type,
    ...props
}: Props<TFieldValues>) {
    const isPercentageType =
        type === 'percentage_from_load' || type === 'percentage_from_company_net';

    return isPercentageType ? (
        <PercentageInput
            {...props}
            label="settings:settlements.revenue_types.item.dialog.fields.percentage.label"
            placeholder="settings:settlements.revenue_types.item.dialog.fields.percentage.placeholder"
        />
    ) : (
        <AmountInput
            {...props}
            label="fields:amount.label"
            placeholder="fields:amount.placeholder"
        />
    );
}
