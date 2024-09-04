import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
    reload: string;
    rate: string;
    rpm: string;
};

function BrokerRateOverview({
    rate,
    rpm,
    reload
}: Props) {
    return (
        <Stack
            direction="row"
            gap="1px"
        >
            <Box
                flex={2}
                maxWidth="160px"
                display="flex"
                flexDirection="column"
                padding="8px 12px"
                sx={{
                    borderRadius: '5px 0px 0px 5px',
                    background  : 'linear-gradient(94deg, #666EFF 0%, #004DF6 100%)'
                }}
            >
                <Typography
                    variant="caption"
                    fontWeight={500}
                    color="#CAD8FD"
                    fontSize="12px"
                >
                    Rate
                </Typography>
                <Typography
                    variant="caption"
                    fontSize="24px"
                    fontWeight={600}
                    color="#FFFFFF"
                >
                    {`$${rate}` || '-'}
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                padding="8px 12px"
                sx={{
                    background: '#0950F7'
                }}
                flex={1}
            >
                <Typography
                    variant="caption"
                    fontWeight={500}
                    color="#CAD8FD"
                    fontSize="12px"
                >
                    RPM
                </Typography>
                <Typography
                    variant="caption"
                    fontSize="24px"
                    fontWeight={600}
                    color="#FFFFFF"
                >
                    {`$${rpm}` || '-'}
                </Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                padding="8px 12px"
                sx={{
                    borderRadius: '0px 5px 5px 0px ',
                    background  : 'rgb(10, 67, 225, 0.7)'
                }}
                flex={1}
            >
                <Typography
                    variant="caption"
                    fontSize="12px"
                    fontWeight={500}
                    color="#CAD8FD"
                >
                    Reload
                </Typography>
                <Typography
                    variant="caption"
                    fontSize="24px"
                    fontWeight={600}
                    color="#FFFFFF"
                >
                    {reload || '-'}
                </Typography>
            </Box>
        </Stack>
    );
}

export default BrokerRateOverview;
