import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function FieldCheckbox({
    value,
    onChange
}: Props) {
    const [checked, setValue] = useState(value);

    return (
        <Checkbox
            checked={checked}
            onChange={(e) => {
                onChange(e.target.checked);
                setValue(e.target.checked);
            }}
        />
    );
}
