import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import { Fade, Typography } from '@mui/material';
import * as React from 'react';

type Props = {
    percentage: number;
};

export default function SetupChecklistNavNotCollapsed({ percentage }: Props) {
    return (
        <Fade in>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) => theme.palette.semantic.foreground.brand.tertiary
                    }}
                    size={40}
                    thickness={6}
                    value={100}
                />
                <CircularProgress
                    variant="determinate"
                    disableShrink
                    sx={{
                        color   : (theme) => theme.palette.semantic.foreground.brand.primary,
                        position: 'absolute',
                        left    : 0,

                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round'
                        }
                    }}
                    size={40}
                    thickness={6}
                    value={percentage}
                />
                <Typography
                    color="inherit"
                    fontSize="10px"
                    fontWeight={500}
                    lineHeight={1.4}
                    position="absolute"
                    left="50%"
                    sx={{
                        transform: 'translateX(-50%)'
                    }}
                >
                    {`${percentage}%`}
                </Typography>
            </Box>
        </Fade>
    );
}
