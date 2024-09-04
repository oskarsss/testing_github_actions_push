import { Box, Skeleton, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';

const ButtonSkeleton = () => (
    <Skeleton
        variant="rectangular"
        sx={{ borderRadius: '5px' }}
        width="120px"
        height="43px"
    />
);

const InputSkeleton = () => (
    <Skeleton
        variant="rectangular"
        width="100%"
        height="48px"
        sx={{ borderRadius: '4px 4px 0px 0px' }}
    />
);

export default function RecurringTransactionsSkeleton() {
    return (
        <Box
            width="480px"
            height="570px"
            p="20px"
        >
            <Stack
                flexDirection="row"
                alignItems="flex-start"
                justifyContent="space-between"
                gap="4px"
                mb="20px"
            >
                <Stack
                    flexGrow={1}
                    height="64px"
                >
                    <Skeleton
                        variant="text"
                        width="95%"
                        sx={{ fontSize: '26px' }}
                    />
                    <Skeleton
                        variant="text"
                        width="30%"
                        sx={{
                            fontSize: '26px',
                            position: 'relative',
                            top     : '-10px'
                        }}
                    />
                </Stack>
                <Skeleton
                    variant="rectangular"
                    width="90px"
                    height="26px"
                    sx={{
                        borderRadius: '4px',
                        position    : 'relative',
                        top         : '4px'
                    }}
                />
            </Stack>
            <Skeleton
                variant="rectangular"
                width="100%"
                height="45px"
            />
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap="4px"
                mb="20px"
                mt="20px"
            >
                <Skeleton
                    variant="text"
                    width="150px"
                    sx={{ fontSize: '26px' }}
                />
                <Skeleton
                    variant="text"
                    width="210px"
                    sx={{ fontSize: '26px' }}
                />
            </Stack>
            <Grid
                container
                columnSpacing={3}
                rowSpacing={5}
            >
                <Grid
                    item
                    xs={6}
                >
                    <InputSkeleton />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <InputSkeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputSkeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputSkeleton />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InputSkeleton />
                </Grid>
            </Grid>

            <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt="24px"
            >
                <ButtonSkeleton />
                <Stack
                    direction="row"
                    spacing="10px"
                >
                    <ButtonSkeleton />
                    <ButtonSkeleton />
                </Stack>
            </Stack>
        </Box>
    );
}
