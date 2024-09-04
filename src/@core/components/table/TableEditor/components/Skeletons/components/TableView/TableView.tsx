import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import AccordionSkeleton from './Accordion';

export default function TableView() {
    return (
        <>
            <Stack
                direction="row"
                spacing={3}
                mt="12px"
            >
                <Skeleton
                    variant="rounded"
                    width="140px"
                    height="40px"
                />
                <Skeleton
                    variant="rounded"
                    width="140px"
                    height="40px"
                    sx={{ marginTop: '12px' }}
                />
            </Stack>
            <Skeleton
                variant="rectangular"
                width="100%"
                height="36px"
                sx={{ marginTop: '6px' }}
            />
            <Box
                mt="12px"
                height="600px"
            >
                {Array.from({ length: 3 }, (_, i) => (
                    <Box
                        key={i}
                        sx={{
                            '& + &': {
                                mt: 2
                            }
                        }}
                    >
                        <AccordionSkeleton key={i} />
                    </Box>
                ))}
            </Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                mt={3}
            >
                <Skeleton
                    variant="rounded"
                    width="130px"
                    height="40px"
                />
                <Skeleton
                    variant="rounded"
                    width="148px"
                    height="40px"
                />
            </Stack>
        </>
    );
}
