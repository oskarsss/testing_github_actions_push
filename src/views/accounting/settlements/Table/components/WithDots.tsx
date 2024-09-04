import React, { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const DOT = styled('div')(({ theme }) => ({
    width                    : '2px',
    height                   : '2px',
    borderRadius             : '50%',
    border                   : 'none',
    backgroundColor          : theme.palette.semantic.text.primary,
    animation                : 'dotAnimation 1.5s infinite',
    '@keyframes dotAnimation': {
        '0%'  : { transform: 'scale(1)' },
        '50%' : { transform: 'scale(1.5)' },
        '100%': { transform: 'scale(1)' }
    },

    '&:nth-child(1)': {
        animationDelay: '0s'
    },

    '&:nth-child(2)': {
        animationDelay: '0.25s'
    },

    '&:nth-child(3)': {
        animationDelay: '0.5s'
    }
}));

const WithDots = ({ children }: PropsWithChildren) => (
    <Stack
        direction="row"
        alignItems="flex-end"
    >
        {children}
        <Stack
            direction="row"
            spacing={1}
            sx={{
                marginLeft  : 1,
                marginBottom: 1.3
            }}
        >
            <DOT />
            <DOT />
            <DOT />
        </Stack>
    </Stack>
);

export default WithDots;
