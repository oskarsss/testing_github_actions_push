import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

type Props = {
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

export default function FieldSelect({
    value,
    options,
    onChange
}: Props) {
    const [open, setOpen] = useState(true);
    const [inputValue, setValue] = useState(value);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Select
            open={open}
            sx={{
                height                 : '100%',
                width                  : '100%',
                padding                : 0,
                margin                 : 0,
                outline                : 'none',
                border                 : 0,
                WebkitTapHighlightColor: 'transparent',
                backgroundColor        : 'transparent',
                fontFamily             : 'inherit',
                fontSize               : 'inherit',
                fontWeight             : 'inherit',
                color                  : 'inherit',
                letterSpacing          : 'inherit',
                marginLeft             : '-2px', // to align with the cell border
                '.MuiSelect-select'    : {
                    padding: '0 16px'
                }
            }}
            variant="standard"
            value={value}
            label=""
            onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
                setOpen(false);
            }}
            onClick={() => {
                setOpen(true);
            }}
            onBlur={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }}
            onClose={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }}
            onAbort={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }}
        >
            {options.map((option) => (
                <MenuItem
                    value={option}
                    key={option}
                >
                    {option}
                </MenuItem>
            ))}
        </Select>
    );

    /*    return (
        <select
               autoFocus
               value={inputValue}
               onChange={(e) => {
                     setValue(e.target.value);
                     onChange(e.target.value);
               }}
               style={{
                   outline                : 'none',
                   padding                : 0, // '0 15px',
                   border                 : 0,
                   margin                 : 0,
                   WebkitTapHighlightColor: 'transparent',
                   width                  : '100%',
                   height                 : '100%',
                   backgroundColor        : 'transparent',
                   fontFamily             : 'inherit',
                   fontSize               : 'inherit',
                   fontWeight             : 'inherit',
                   color                  : 'inherit',
                   letterSpacing          : 'inherit',
                   marginLeft             : '-2px' // to align with the cell border
               }}
        >
            {options.map((option) => (
                <option value={option}>{option}</option>
            ))}
        </select>
    ) */
}
