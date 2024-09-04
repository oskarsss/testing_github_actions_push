import { Box, Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                borderBottom : `1px solid ${theme.palette.semantic.border.secondary}`,
                paddingBottom: '12px'
            }}
        >
            <Stack
                direction="row"
                spacing={6}
                width="100%"
                alignItems="center"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Skeleton
                        variant="circular"
                        width="50px"
                        height="50px"
                    />
                    <Stack
                        width="250px"
                        height="62px"
                        spacing={1}
                        sx={{
                            display       : 'flex',
                            justifyContent: 'center',
                            alignItems    : 'flex-start',
                            flexDirection : 'column'
                        }}
                    >
                        <Skeleton
                            variant="rounded"
                            width="200px"
                            sx={{ fontSize: '24px' }}
                        />
                        <Skeleton
                            variant="rounded"
                            width="220px"
                            sx={{ fontSize: '18px' }}
                        />
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Skeleton
                        variant="rounded"
                        height="40px"
                        width="850px"
                    />
                    <Skeleton
                        variant="rounded"
                        height="40px"
                        width="90px"
                    />
                </Stack>
            </Stack>
        </Box>
    );
}
