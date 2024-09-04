import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps
} from '@mui/material/CircularProgress';

export default function CircleProgressBar(props: CircularProgressProps) {
    return (
        <Box sx={{ position: 'relative', display: 'flex' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) => theme.palette.semantic.foreground.six
                }}
                thickness={5}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                disableShrink
                sx={{
                    color   : (theme) => theme.palette.utility.foreground.success.primary,
                    position: 'absolute',
                    left    : 0,

                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round'
                    }
                }}
                thickness={5}
                {...props}
            />
        </Box>
    );
}
