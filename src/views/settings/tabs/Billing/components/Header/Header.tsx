import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import HeaderBg from './HeaderBg';

function Header() {
    const { t } = useAppTranslation('settings');
    return (
        <Stack
            justifyContent="flex-start"
            alignItems="center"
            gap="8px"
            height="224px"
            overflow="hidden"
            sx={{
                backgroundColor   : (theme) => theme.palette.semantic.foreground.brand.primary,
                backgroundImage   : `url("data:image/svg+xml;utf8,${encodeURIComponent(HeaderBg)}")`,
                backgroundRepeat  : 'no-repeat',
                backgroundPosition: 'left top',
                backgroundSize    : 'cover',
                padding           : '64px'
            }}
        >
            <Typography
                variant="h6"
                textAlign="center"
                color="#F4F5FA"
                fontWeight={600}
                style={{
                    fontSize: '24px'
                }}
            >
                {t('billing.header.title')}
            </Typography>
            <Typography
                variant="body1"
                fontSize="16px"
                textAlign="center"
                color="#F4F5FA"
            >
                {t('billing.header.sub_title')}
            </Typography>
        </Stack>
    );
}

export default Header;
