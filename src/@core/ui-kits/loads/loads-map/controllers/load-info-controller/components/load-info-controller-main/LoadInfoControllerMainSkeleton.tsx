import { Skeleton, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function LoadInfoControllerMainSkeleton({ children }: PropsWithChildren) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="12px"
            justifyContent="space-between"
            overflow="hidden"
            width="100%"
            height="38px"
            flex={1}
        >
            <Stack
                overflow="hidden"
                direction="row"
                alignItems="center"
                height="100%"
                gap="4px"
            >
                <Skeleton
                    width="32px"
                    height="32px"
                    variant="circular"
                />

                <Stack
                    direction="column"
                    overflow="hidden"
                >
                    <Skeleton
                        width="60px"
                        variant="text"
                    />

                    <Skeleton
                        width="80px"
                        variant="text"
                        sx={{ marginTop: '-2px' }}
                    />
                </Stack>
            </Stack>

            {children}
        </Stack>
    );
}
