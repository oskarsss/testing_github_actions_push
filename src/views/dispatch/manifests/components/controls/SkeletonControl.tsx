import { Skeleton, Stack } from '@mui/material';
import React from 'react';

export default function SkeletonControl() {
    return (
        <Stack
            direction="row"
            gap="8px"
        >
            <Skeleton
                variant="circular"
                width={36}
                height={36}
            />

            <Stack direction="column">
                <Skeleton
                    variant="text"
                    width={100}
                    height={20}
                />
                <Skeleton
                    variant="text"
                    width={80}
                    height={17}
                />
            </Stack>
        </Stack>
    );
}
