import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
    Icon: React.ReactNode;
    title: string;
    value: string;
};

export default function CharacteristicItem({
    Icon,
    title,
    value
}: Props) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <Box
                    sx={{
                        borderRadius   : '50%',
                        backgroundColor: '#F3F4F6',
                        width          : '24px',
                        height         : '24px',
                        display        : 'flex',
                        alignItems     : 'center',
                        justifyContent : 'center',
                        svg            : {
                            width : '14px',
                            height: '14px'
                        }
                    }}
                >
                    {Icon}
                </Box>

                <Typography
                    noWrap
                    fontSize="18px"
                    color="#020D2D"
                    fontWeight={500}
                >
                    {title}
                </Typography>
            </Stack>
            <Typography
                noWrap
                fontWeight={500}
                fontSize="18px"
                color="#505966"
            >
                {value || '-'}
            </Typography>
        </Box>
    );
}
