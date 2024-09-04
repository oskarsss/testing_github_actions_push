import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
    Icon?: React.ReactNode;
    title: string;
};

export default function ArticleHeader({
    title,
    Icon
}: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <Box
                sx={{
                    display   : 'flex',
                    alignItems: 'center',
                    svg       : {
                        width : '24px !important',
                        height: '24px !important'
                    }
                }}
            >
                {Icon}
            </Box>
            <Typography
                fontWeight={600}
                fontSize="18px"
                variant="body1"
                color="initial"
            >
                {title}
            </Typography>
        </Stack>
    );
}
