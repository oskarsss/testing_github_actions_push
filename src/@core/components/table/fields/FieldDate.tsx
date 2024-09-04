/* eslint-disable jsx-a11y/no-autofocus */
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

type Props = {
    value: string;
    onChange: (value: string) => void;
    type: HTMLInputTypeAttribute;
};

export default function FieldDate({
    value,
    onChange,
    type
}: Props) {
    const [inputValue, setValue] = useState(value);

    useEffect(() => {
        const debounceUpdate = debounce(onChange, 500);
        if (inputValue !== value) {
            debounceUpdate(inputValue);
        }

        return () => {
            debounceUpdate.cancel();
        };
    }, [inputValue, onChange, value]);

    return (
        <input
            type={type}
            autoFocus
            value={inputValue}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            style={{
                outline                : 'none',
                padding                : 0,
                border                 : 0,
                margin                 : 0,
                width                  : '100%',
                height                 : '100%',
                WebkitTapHighlightColor: 'transparent',
                backgroundColor        : 'transparent',
                fontFamily             : 'inherit',
                fontSize               : 'inherit',
                fontWeight             : 'inherit',
                color                  : 'inherit',
                letterSpacing          : 'inherit',
                marginLeft             : '-2px' // to align with the cell border
            }}
        />
    );
}
