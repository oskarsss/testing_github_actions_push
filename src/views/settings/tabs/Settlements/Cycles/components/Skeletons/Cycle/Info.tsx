import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import {
    StyledBoxSkeleton,
    SubtitleSkeleton,
    TitleSkeleton,
    TotalSubtitleSkeleton
} from '@/views/settings/tabs/Settlements/styled';
import { StyledPaper, TotalPaper } from '@/views/settings/components/styled';
import SKELETON_OPTIONS from '../options/skeleton_options';

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

                <StyledPaper sx={{ width: '326px' }}>
                    <Stack
                        spacing={2}
                        direction="row"
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                        padding="8px 16px"
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Skeleton
                                variant="circular"
                                width="44px"
                                height="44px"
                            />
                            <Stack
                                spacing={0.5}
                                direction="column"
                            >
                                <TitleSkeleton variant="text" />
                                <SubtitleSkeleton variant="text" />
                            </Stack>
                        </Stack>
                        <Skeleton
                            variant="rounded"
                            width={SKELETON_OPTIONS.manageBtn.width}
                            height={SKELETON_OPTIONS.manageBtn.height}
                        />
                    </Stack>
                </StyledPaper>

                <TotalPaper sx={{ width: '90px' }}>
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

                <Stack
                    spacing={5}
                    direction="column"
                    justifyContent="center"
                >
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                    >
                        <StyledBoxSkeleton variant="rectangular" />
                        <TotalSubtitleSkeleton
                            variant="text"
                            width="46px"
                        />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                    >
                        <StyledBoxSkeleton variant="rectangular" />
                        <TotalSubtitleSkeleton
                            variant="text"
                            width="46px"
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
