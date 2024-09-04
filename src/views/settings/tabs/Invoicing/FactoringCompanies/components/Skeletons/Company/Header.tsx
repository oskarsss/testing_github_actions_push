import Stack from '@mui/material/Stack';
import { Box, Skeleton } from '@mui/material';
import SKELETON_OPTIONS from '@/views/settings/tabs/Settlements/Cycles/components/Skeletons/options/skeleton_options';
import { DescriptionWrapper } from '@/views/settings/components/styled';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

export default function CompanyHeader() {
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
                                variant="rounded"
                                width="40px"
                                height="40px"
                            />
                            <Stack direction="column">
                                <Skeleton
                                    variant="text"
                                    height="32px"
                                    width="260px"
                                />
                                <Skeleton
                                    variant="text"
                                    height="24px"
                                    width="260px"
                                />
                            </Stack>
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
                bottomLeft={(
                    <DescriptionWrapper>
                        {SKELETON_OPTIONS.description.map((el, index) => (
                            <Skeleton
                                // eslint-disable-next-line max-len
                                // eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-multi-spaces
                                key={index}
                                variant="text"
                                width={el.width}
                                sx={el.sx}
                            />
                        ))}
                    </DescriptionWrapper>
                )}
            />
        </Box>
    );
}
