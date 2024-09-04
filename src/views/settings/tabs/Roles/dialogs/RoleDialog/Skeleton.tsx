import React from 'react';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const Item = () => (
    <Grid
        item
        xs={4}
    >
        <Box
            sx={{
                borderRadius: '5px',
                padding     : 2,
                height      : '100%'
            }}
        >
            <Skeleton
                variant="text"
                height="32px"
                width="80px"
            />
            <Stack
                direction="column"
                gap="8px"
            >
                {Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, i) => (
                    <Stack
                        key={i}
                        direction="row"
                        alignItems="center"
                        gap="6px"
                    >
                        <Skeleton
                            variant="rectangular"
                            width={18}
                            height={18}
                            sx={{ borderRadius: '4px' }}
                        />
                        <Skeleton
                            variant="text"
                            height="24px"
                            width="120px"
                        />
                    </Stack>
                ))}
            </Stack>
        </Box>
    </Grid>
);

const SkeletonPermissions = () => (
    <Grid
        p={2}
        container
        spacing={3}
        minHeight="920px"
    >
        {Array.from({ length: 8 }, (_, i) => (
            <Item key={i} />
        ))}
    </Grid>
);

export default SkeletonPermissions;
