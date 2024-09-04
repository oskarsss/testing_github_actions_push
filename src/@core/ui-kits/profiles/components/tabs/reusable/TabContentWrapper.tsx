import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function TabContentWrapper({ children }: PropsWithChildren) {
    return (
        <Stack
            height="100%"
            padding="20px"
            gap="16px"
        >
            {children}
        </Stack>
    );
}
