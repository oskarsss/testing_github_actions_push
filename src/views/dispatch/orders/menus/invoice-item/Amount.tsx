import { Control, useWatch } from 'react-hook-form';

type Props = {
    control: Control<any>;
};
export default function Amount({ control }: Props) {
    const amount_per_unit: number = useWatch({ control, name: 'amount_per_unit' });
    const units: number = useWatch({ control, name: 'units' });

    const units_value = Number(units);
    const amount_per_unit_value = Number(amount_per_unit);

    return (
        <div
            style={{
                width         : '30%',
                display       : 'flex',
                flexDirection : 'row',
                justifyContent: 'center',
                alignItems    : 'center'
            }}
        >
            {units_value && amount_per_unit_value ? (
                <span>${(amount_per_unit_value * units_value).toFixed(2)}</span>
            ) : (
                '$0.00'
            )}
        </div>
    );
}
