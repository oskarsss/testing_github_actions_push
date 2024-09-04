import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type Values = {
    value: string;
};

export interface CustomProps {
    onChange: (event: { target: { name: string; value: string | number } }) => void;
    name: string;
}

const BrokerTotalRateFormat = React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const {
        onChange,
        ...other
    } = props;
    const handleValueChange = (values: Values) => {
        const { value } = values;
        const parsedValue = parseInt(value, 10);
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
            thousandSeparator
        />
    );
});

export default BrokerTotalRateFormat;
