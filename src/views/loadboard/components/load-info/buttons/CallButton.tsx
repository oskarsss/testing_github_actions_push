import { Button, createSvgIcon } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const CallIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
    >
        <path
            d="M3 4.58333C3 11.717 8.78299 17.5 15.9167 17.5C16.2385 17.5 16.5576 17.4882 16.8736 17.4651C17.2362 17.4385 17.4174 17.4253 17.5825 17.3302C17.7192 17.2516 17.8488 17.1121 17.9173 16.97C18 16.7985 18 16.5984 18 16.1983V13.8506C18 13.5141 18 13.3459 17.9446 13.2016C17.8957 13.0743 17.8163 12.9608 17.7133 12.8713C17.5966 12.77 17.4385 12.7125 17.1223 12.5975L14.45 11.6257C14.0821 11.492 13.8981 11.4251 13.7236 11.4364C13.5697 11.4464 13.4216 11.499 13.2958 11.5881C13.1531 11.6893 13.0524 11.8571 12.851 12.1928L12.1667 13.3333C9.95845 12.3333 8.16825 10.5407 7.16667 8.33333L8.30719 7.64902C8.64288 7.44761 8.81072 7.3469 8.91186 7.20422C9.00104 7.0784 9.05356 6.93031 9.06357 6.77641C9.07493 6.60189 9.00804 6.41794 8.87426 6.05004L7.90249 3.37768C7.7875 3.06147 7.73001 2.90336 7.62868 2.78675C7.53918 2.68374 7.42575 2.60429 7.29835 2.55538C7.15413 2.5 6.9859 2.5 6.64943 2.5H4.30168C3.90157 2.5 3.70151 2.5 3.52998 2.58271C3.38792 2.65121 3.24845 2.78085 3.16975 2.91753C3.07474 3.08255 3.06146 3.26385 3.03491 3.62644C3.01177 3.94238 3 4.26148 3 4.58333Z"
            fill="#505966"
            stroke="#505966"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>,
    'CallIcon'
);

export default function CallButton() {
    const { t } = useAppTranslation();

    return (
        <Button
            sx={{
                color        : '#505966',
                fontWeight   : 500,
                height       : '46px',
                textTransform: 'capitalize',
                fontSize     : '18px',
                width        : '100%'
            }}
            variant="outlined"
            color="secondary"
            startIcon={(
                <CallIcon
                    sx={{
                        width : '20px',
                        height: '20px'
                    }}
                />
            )}
        >
            {t('loadboard:buttons.call')}
        </Button>
    );
}
