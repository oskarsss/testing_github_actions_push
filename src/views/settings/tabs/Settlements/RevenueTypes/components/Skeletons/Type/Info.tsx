import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { SubtitleSkeleton, TitleSkeleton } from '@/views/settings/tabs/Settlements/styled';
import { StyledPaper } from '@/views/settings/components/styled';
import SKELETON_OPTIONS from '../options/skeleton_options';

export default function Info() {
    return (
        <Grid
            p={2}
            container
            spacing={5}
            direction="row"
        >
            <Grid
                item
                xs={3}
            >
                <StyledPaper sx={{ width: '100%' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        padding="8px 16px"
                    >
                        <Skeleton
                            variant="rounded"
                            width="32px"
                            height="32px"
                        />
                        <SubtitleSkeleton variant="text" />
                        <TitleSkeleton variant="text" />
                    </Stack>
                </StyledPaper>
            </Grid>
            <Grid
                item
                xs={3}
            >
                <StyledPaper sx={{ width: '100%' }}>
                    <Stack
                        spacing={2}
                        direction="column"
                        padding="8px 16px"
                    >
                        <Skeleton
                            variant="rounded"
                            width="32px"
                            height="32px"
                        />
                        <SubtitleSkeleton variant="text" />
                        <TitleSkeleton variant="text" />
                    </Stack>
                </StyledPaper>
            </Grid>
            <Grid
                item
                xs={3}
            >
                <StyledPaper sx={{ width: '396px', height: '100%' }}>
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
            </Grid>
        </Grid>
    );
}
