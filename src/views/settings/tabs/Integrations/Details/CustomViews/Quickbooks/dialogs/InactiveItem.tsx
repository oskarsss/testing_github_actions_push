import { Box, Stack } from '@mui/material';

function InactiveItem({ displayName }: { displayName: string }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            overflow="hidden"
            position="relative"
        >
            <Box>{displayName}</Box>
            <Box
                sx={{
                    fontSize       : '12px',
                    padding        : '2px 4px',
                    backgroundColor: (theme) => theme.palette.utility.foreground.error.tertiary,
                    color          : (theme) => theme.palette.utility.foreground.error.primary,
                    borderRadius   : '4px'
                }}
            >
                Inactive
            </Box>
        </Stack>
    );
}

export default InactiveItem;
