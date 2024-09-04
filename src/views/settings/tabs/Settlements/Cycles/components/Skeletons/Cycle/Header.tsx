import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import SKELETON_OPTIONS from '@/views/settings/tabs/Settlements/Cycles/components/Skeletons/options/skeleton_options';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

export default function CycleHeader() {
    return (
        <Box>
            <PageHeadersKit.Header
                style={{ padding: 0 }}
                topLeft={(
                    <Stack
                        width="100%"
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack
                            justifyContent="space-between"
                            alignItems="center"
                            direction="row"
                            spacing={3}
                        >
                            <Skeleton
                                variant="text"
                                width={SKELETON_OPTIONS.cycleName.width}
                                sx={SKELETON_OPTIONS.cycleName.sx}
                            />
                            <Skeleton
                                variant="rounded"
                                width={SKELETON_OPTIONS.status_chip.width}
                                height={SKELETON_OPTIONS.status_chip.height}
                                sx={SKELETON_OPTIONS.status_chip.sx}
                            />
                        </Stack>
                        <Stack
                            spacing="10px"
                            direction="row"
                        >
                            <Skeleton
                                variant="rounded"
                                width={SKELETON_OPTIONS.editBtn.width}
                                height={SKELETON_OPTIONS.editBtn.height}
                            />
                            <Skeleton
                                variant="rounded"
                                width={SKELETON_OPTIONS.deactivateBtn.width}
                                height={SKELETON_OPTIONS.deactivateBtn.height}
                            />
                            <Skeleton
                                variant="rounded"
                                width={SKELETON_OPTIONS.viewLatestBtn.width}
                                height={SKELETON_OPTIONS.viewLatestBtn.height}
                            />
                        </Stack>
                    </Stack>
                )}
            />
        </Box>
    );
}
