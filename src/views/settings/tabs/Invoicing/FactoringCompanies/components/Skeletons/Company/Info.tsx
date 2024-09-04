import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import {
    SubtitleSkeleton,
    TitleSkeleton,
    TotalSubtitleSkeleton
} from '@/views/settings/tabs/Settlements/styled';
import { StyledPaper, TotalPaper } from '@/views/settings/components/styled';

export default function Info() {
    return (
        <Box pt="50px">
            <Stack
                spacing={3}
                direction="row"
            >
                <StyledPaper sx={{ width: '140px' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        padding="8px 16px"
                    >
                        <SubtitleSkeleton variant="text" />
                        <TitleSkeleton variant="text" />
                        <SubtitleSkeleton variant="text" />
                        <TitleSkeleton variant="text" />
                    </Stack>
                </StyledPaper>

                <TotalPaper sx={{ width: '120px' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Skeleton
                            variant="rectangular"
                            width="32px"
                            height="32px"
                        />
                        <Stack
                            direction="column"
                            alignItems="center"
                            spacing={0.5}
                            justifyContent="center"
                        >
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="40px"
                            />
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="70px"
                            />
                        </Stack>
                    </Stack>
                </TotalPaper>

                <TotalPaper sx={{ width: '120px' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Skeleton
                            variant="rectangular"
                            width="32px"
                            height="32px"
                        />
                        <Stack
                            direction="column"
                            alignItems="center"
                            spacing={0.5}
                            justifyContent="center"
                        >
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="40px"
                            />
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="70px"
                            />
                        </Stack>
                    </Stack>
                </TotalPaper>

                <TotalPaper sx={{ width: '120px' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Skeleton
                            variant="rectangular"
                            width="32px"
                            height="32px"
                        />
                        <Stack
                            direction="column"
                            alignItems="center"
                            spacing={0.5}
                            justifyContent="center"
                        >
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="40px"
                            />
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="70px"
                            />
                        </Stack>
                    </Stack>
                </TotalPaper>

                <TotalPaper sx={{ width: '120px' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Skeleton
                            variant="rectangular"
                            width="32px"
                            height="32px"
                        />
                        <Stack
                            direction="column"
                            alignItems="center"
                            spacing={0.5}
                            justifyContent="center"
                        >
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="40px"
                            />
                            <TotalSubtitleSkeleton
                                variant="text"
                                width="70px"
                            />
                        </Stack>
                    </Stack>
                </TotalPaper>
            </Stack>
        </Box>
    );
}
