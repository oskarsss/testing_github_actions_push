import { Button, createSvgIcon } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const BookIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
    >
        <path
            d="M12.6993 4.8778L5.13953 12.4376C4.47288 13.1042 4.0965 13.4806 3.80354 13.9159C3.54371 14.302 3.33472 14.72 3.18173 15.1595C3.00925 15.6551 2.93399 16.182 2.80069 17.1153L2.75419 17.4408C2.73505 17.5748 2.78218 17.7097 2.88059 17.8026C2.97899 17.8956 3.1164 17.9349 3.24908 17.9081L3.6993 17.8173C4.53783 17.6481 5.01131 17.5526 5.45593 17.3776C5.8504 17.2223 6.22527 17.0213 6.57286 16.7786C6.96465 16.5051 7.30616 16.1636 7.91103 15.5586L15.6456 7.82407L12.6993 4.8778Z"
            fill="white"
        />
        <path
            d="M16.8241 6.64556L17.8273 5.64241C18.6409 4.82882 18.6409 3.50972 17.8273 2.69613C17.0137 1.88254 15.6946 1.88254 14.881 2.69613L13.8778 3.69928L16.8241 6.64556Z"
            fill="white"
        />
    </svg>,
    'BookIcon'
);

function BookButton() {
    const { t } = useAppTranslation();
    return (
        <Button
            sx={{
                height       : '46px',
                fontWeight   : 500,
                textTransform: 'capitalize',
                fontSize     : '18px',
                width        : '100%'
            }}
            variant="contained"
            startIcon={(
                <BookIcon
                    sx={{
                        width : '20px',
                        height: '20px'
                    }}
                />
            )}
        >
            {t('loadboard:buttons.book')}
        </Button>
    );
}

export default BookButton;
