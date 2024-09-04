import { Box, CircularProgress, SxProps, Theme } from '@mui/material';
import React from 'react';

type Props = {
    sx?: Omit<SxProps<Theme>, 'height' | 'display' | 'justifyContent' | 'alignItems'>;
};

export default function Preloader({ sx = {} }: Props) {
    return (
        <Box
            sx={{
                height        : '100%',
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
                color         : ({ palette }) => palette.semantic.foreground.brand.primary,
                ...sx
            }}
        >
            <CircularProgress size={24} />
        </Box>
    );
}
