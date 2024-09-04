import { NumericFormat, NumericFormatProps } from 'react-number-format';
import React from 'react';
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase';

const CurrencyFormat = React.forwardRef<NumericFormatProps, InputBaseComponentProps>(
    (props, ref) => {
        const {
            defaultValue,
            ...other
        } = props;

        return (
            <NumericFormat
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...other}
                getInputRef={ref}
                min={0}
                thousandSeparator
                valueIsNumericString
                allowNegative={false}
                decimalScale={2}
                prefix="$"
            />
        );
    }
);

export default CurrencyFormat;
