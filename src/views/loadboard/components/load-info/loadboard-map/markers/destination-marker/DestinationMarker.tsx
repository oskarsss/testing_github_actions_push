/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { createSvgIcon } from '@mui/material';
import React from 'react';

type Props = {
    onClick: () => void;
};

const DestinationIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8.2C0 3.69801 3.55535 0 8 0C12.4446 0 16 3.69801 16 8.2C16 10.4965 14.9859 12.5068 13.613 14.3405C12.4671 15.871 11.0003 17.3666 9.54112 18.8543C9.2654 19.1355 8.98995 19.4163 8.717 19.6971C8.52871 19.8907 8.2701 20 8 20C7.7299 20 7.47129 19.8907 7.28301 19.6971C7.01005 19.4163 6.7346 19.1355 6.45888 18.8543C4.99974 17.3666 3.53292 15.871 2.38702 14.3405C1.01406 12.5068 0 10.4965 0 8.2ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            fill="#FF3A40"
        />
    </svg>,
    'DestinationIcon'
);

function DestinationMarker({ onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                cursor         : 'pointer',
                position       : 'relative',
                width          : '12px',
                height         : '12px',
                backgroundColor: '#0a43e1',
                display        : 'flex',
                justifyContent : 'center',
                alignItems     : 'center',
                borderRadius   : '50%'
            }}
        >
            <DestinationIcon
                sx={{
                    position: 'absolute',
                    left    : '-6px',
                    bottom  : '5px'
                }}
            />
        </div>
    );
}

export default DestinationMarker;
