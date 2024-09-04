import { styled } from '@mui/material';
import React from 'react';

const Wrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    padding        : '1px 6px',
    color          : theme.palette.utility.text.blue_dark,
    borderRadius   : '4px',
    fontSize       : '12px',
    fontWeight     : 500,
    backgroundColor: theme.palette.utility.foreground.blue_dark.secondary
}));

export default function EstimatedBadge() {
    return <Wrapper>Est</Wrapper>;
}
