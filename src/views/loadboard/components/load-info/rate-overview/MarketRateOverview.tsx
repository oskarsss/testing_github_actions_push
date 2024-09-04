import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
    rate: string;
    rpm: string;
};

function MarketRateOverview({
    rate,
    rpm
}: Props) {
    return (
        <Stack
            direction="row"
            gap="1px"
            position="relative"
        >
            <Box
                maxWidth="160px"
                flex={2}
                display="flex"
                flexDirection="column"
                padding="8px 12px"
                sx={{
                    borderRadius: '5px 0px 0px 5px',
                    background  : '#FFF'
                }}
            >
                <Typography
                    variant="caption"
                    fontWeight={500}
                    color="#505966"
                    fontSize="12px"
                >
                    Marker Rate
                </Typography>
                <Typography
                    variant="caption"
                    fontSize="24px"
                    color="#020D2D"
                    fontWeight={600}
                >
                    {rate || '-'}
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                padding="8px 12px"
                sx={{
                    background: '#FFF'
                }}
                flex={2}
            >
                <Typography
                    variant="caption"
                    fontWeight={500}
                    color="#505966"
                    fontSize="12px"
                >
                    Market RPM
                </Typography>
                <Typography
                    variant="caption"
                    fontSize="24px"
                    fontWeight={600}
                    color="#020D2D"
                >
                    {rpm || '-'}
                </Typography>
            </Box>
        </Stack>
    );
}

export default MarketRateOverview;
