import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { CustomProps } from '@/views/new-loads/views/Draft/draft-form/load-fields/BrokerTotalRateFormat';

type Values = {
    value: string;
};

const MilesFormat = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const {
        onChange,
        ...other
    } = props;
    const handleValueChange = (values: Values) => {
        const { value } = values;
        const parsedValue = Number(value) ?? '';
        onChange({
            target: {
                name : props.name,
                value: parsedValue
            }
        });
    };

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={handleValueChange}
            allowNegative={false}
            decimalScale={2}
            valueIsNumericString
            thousandSeparator=","
            decimalSeparator="."
        />
    );
});

export default MilesFormat;
