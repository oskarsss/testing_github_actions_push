import { Box, IconButton, createSvgIcon } from '@mui/material';
import React from 'react';
import { Control, UseFormGetValues, useController } from 'react-hook-form';
import { UpdateSearchDefaultValues } from './LoadboardFilters';

const SwapIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.4106 2.74408C14.736 2.41864 15.2637 2.41864 15.5891 2.74408L18.0891 5.24408C18.4145 5.56951 18.4145 6.09715 18.0891 6.42259L15.5891 8.92259C15.2637 9.24803 14.736 9.24803 14.4106 8.92259C14.0851 8.59715 14.0851 8.06951 14.4106 7.74408L15.488 6.66667H5.83317C5.37293 6.66667 4.99984 6.29357 4.99984 5.83333C4.99984 5.3731 5.37293 5 5.83317 5H15.488L14.4106 3.92259C14.0851 3.59715 14.0851 3.06951 14.4106 2.74408ZM5.58909 11.0774C5.91453 11.4028 5.91453 11.9305 5.58909 12.2559L4.51168 13.3333H14.1665C14.6267 13.3333 14.9998 13.7064 14.9998 14.1667C14.9998 14.6269 14.6267 15 14.1665 15H4.51168L5.58909 16.0774C5.91453 16.4028 5.91453 16.9305 5.58909 17.2559C5.26366 17.5814 4.73602 17.5814 4.41058 17.2559L1.91058 14.7559C1.58514 14.4305 1.58514 13.9028 1.91058 13.5774L4.41058 11.0774C4.73602 10.752 5.26366 10.752 5.58909 11.0774Z"
            fill="#0A43E1"
        />
    </svg>,
    'SwapIcon'
);

type Props = {
    getValues: UseFormGetValues<UpdateSearchDefaultValues>;
    control: Control<UpdateSearchDefaultValues>;
};

function SwapButton({
    getValues,
    control
}: Props) {
    const originControl = useController({ name: 'origin', control });
    const destinationControl = useController({ name: 'destination', control });
    const swap = () => {
        const values = getValues();
        originControl.field.onChange(values.destination);
        destinationControl.field.onChange(values.origin);
    };

    return (
        <Box
            sx={{
                display   : 'flex',
                alignItems: 'center'
            }}
        >
            <IconButton onClick={swap}>
                <SwapIcon
                    sx={{
                        width : '20px',
                        height: '20px'
                    }}
                />
            </IconButton>
        </Box>
    );
}

export default SwapButton;
