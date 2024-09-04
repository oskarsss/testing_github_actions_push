import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function StopsEmpty() {
    const { t } = useAppTranslation();
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            minHeight="120px"
            height="100%"
            width="100%"
        >
            <Typography
                variant="body1"
                fontSize="16px"
                textAlign="center"
                fontWeight={700}
                color="text.secondary"
            >
                {t('common:empty.no_stops')}
            </Typography>
        </Stack>
    );
}
