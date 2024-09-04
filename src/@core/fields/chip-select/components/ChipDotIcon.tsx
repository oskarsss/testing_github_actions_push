import { createSvgIcon } from '@mui/material';

const ChipDotIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <circle
            opacity="0.3"
            cx="7"
            cy="7"
            r="7"
            fill="currentColor"
        />
        <circle
            cx="7"
            cy="7"
            r="3"
            fill="currentColor"
        />
    </svg>,
    'ChipDotIcon'
);

export default ChipDotIcon;
