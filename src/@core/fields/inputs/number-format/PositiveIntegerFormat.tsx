import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';

const PositiveIntegerFormat = React.forwardRef<NumericFormatProps, InputBaseComponentProps>(
    (props, ref) => {
        const {
            defaultValue,
            ...other
        } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                valueIsNumericString
                allowNegative={false}
                allowLeadingZeros
                isAllowed={(values) => {
                    const { formattedValue } = values;
                    return /^[0-9]*$/.test(formattedValue);
                }}
                thousandSeparator={false}
                decimalScale={0}
            />
        );
    }
);

export default PositiveIntegerFormat;
