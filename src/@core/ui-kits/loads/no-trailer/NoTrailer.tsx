import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function NoTrailer() {
    const { t } = useAppTranslation('state_info');
    return (
        <Stack
            height="38px"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="8px"
        >
            <Stack
                sx={{
                    svg: {
                        width       : '40px',
                        height      : '40px',
                        borderRadius: '50%'
                    }
                }}
            >
                {getTrailerTypeIcon(0)}
            </Stack>
            <Stack>
                <Typography
                    variant="body2"
                    fontSize="14px"
                    fontWeight={600}
                    sx={{
                        color: (theme) => theme.palette.semantic.text.secondary
                    }}
                >
                    {t('trailers.no_trailer')}
                </Typography>
            </Stack>
        </Stack>
    );
}

export default memo(NoTrailer);
