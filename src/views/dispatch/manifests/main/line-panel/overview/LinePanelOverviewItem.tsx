import { Stack, styled, Typography } from '@mui/material';
import React from 'react';

const IconWrapper = styled('div')(({ theme }) => ({
    height: '34px',
    svg   : {
        width       : '34px',
        height      : '34px',
        borderRadius: '50%'
    }
}));

type Props = {
    icon: React.ReactNode;
    text: string;
};

export default function LinePanelOverviewItem({
    icon,
    text
}: Props) {
    return (
        <Stack
            alignItems="center"
            overflow="hidden"
        >
            <IconWrapper>{icon}</IconWrapper>
            <Typography
                noWrap
                fontSize={12}
                fontWeight={500}
                variant="body2"
                maxWidth="45px"
                textOverflow="ellipsis"
                color={(theme) => theme.palette.semantic.text.secondary}
            >
                {text}
            </Typography>
        </Stack>
    );
}
