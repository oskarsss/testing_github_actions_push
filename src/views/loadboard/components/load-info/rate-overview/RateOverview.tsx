import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MarketRateOverview from './MarketRateOverview';
import BrokerRateOverview from './BrokerRateOverview';

type Props = {
    reload: string;
    rate: string;
    rpm: string;
    marketRate: string;
    marketRpm: string;
    turnOffMarket?: boolean;
};

function RateOverview({
    reload,
    rate,
    rpm,
    marketRate,
    marketRpm,
    turnOffMarket = false
}: Props) {
    const [showMarket, setShowMarket] = useState(turnOffMarket ? false : !!rate);
    return (
        <Stack position="relative">
            <BrokerRateOverview
                rate={rate}
                reload={reload}
                rpm={rpm}
            />

            {showMarket && (
                <MarketRateOverview
                    rate={marketRate}
                    rpm={marketRpm}
                />
            )}
            {!turnOffMarket && (
                <Box
                    onClick={() => setShowMarket(!showMarket)}
                    sx={{
                        position       : 'absolute',
                        padding        : '0 8px',
                        backgroundColor: '#FFF',
                        borderRadius   : '27px',
                        left           : '45%',
                        bottom         : '-10px',
                        border         : '1px solid #F3F4F6',
                        display        : 'flex',
                        alignItems     : 'center',
                        cursor         : 'pointer'
                    }}
                >
                    <Typography
                        color="#505966"
                        fontSize="14px"
                        fontWeight={500}
                    >
                        Market
                    </Typography>
                    {showMarket ? (
                        <KeyboardArrowUpIcon
                            sx={{
                                color : '#505966',
                                height: '16px',
                                width : '16px'
                            }}
                        />
                    ) : (
                        <KeyboardArrowDownIcon
                            sx={{
                                color : '#505966',
                                height: '16px',
                                width : '16px'
                            }}
                        />
                    )}
                </Box>
            )}
        </Stack>
    );
}

export default RateOverview;
