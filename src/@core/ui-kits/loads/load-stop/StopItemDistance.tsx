import { Stack, Typography } from '@mui/material';
import { Distance } from '@proto/models/distance';
import React from 'react';

type Props = {
    distance?: Distance;
};

export default function StopItemDistance({ distance }: Props) {
    if (!distance || !distance?.miles) return <Stack padding="6px" />;
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
            gap="12px"
            mt="4px"
            mb="12px"
        >
            <Typography
                fontSize="12px"
                fontWeight={500}
                lineHeight={1.5}
                color={(theme) => theme.palette.semantic.text.disabled}
            >
                {distance.milesFormatted}
            </Typography>
            <Stack
                flexGrow={1}
                height="1px"
                sx={{
                    backgroundImage: (theme) =>
                        `linear-gradient(to right,
                         ${theme.palette.semantic.foreground.white.primary} 40%,
                        ${theme.palette.semantic.border.primary} 40%)`,
                    backgroundSize  : '30px 1px',
                    backgroundRepeat: 'repeat-x'
                }}
            />
        </Stack>
    );
}
