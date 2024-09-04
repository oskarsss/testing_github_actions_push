import { Box, Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableEditorComponents from '@/@core/components/table/TableEditor/TableEditorComponents';
import Grid from '@mui/material/Grid';
import { Fragment } from 'react';
import Item from './Item';

const grid_options = [2.7, 2.2, 1.9, 2.2, 1, 1, 1];
export default function ReorderColumns() {
    return (
        <>
            <Stack
                mt="12px"
                direction="row"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '32px' }}
                        width="200px"
                    />
                    <Skeleton
                        variant="circular"
                        width="24px"
                        height="24px"
                    />
                </Stack>
                <Skeleton
                    variant="circular"
                    width="20px"
                    height="20px"
                />
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                mt="24px"
                mb="12px"
            >
                <Skeleton
                    variant="circular"
                    width="20px"
                    height="20px"
                />
                <Skeleton
                    width="100px"
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                />
            </Stack>
            <Box height="600px">
                <TableEditorComponents.PinnedPaper
                    elevation={0}
                    is_unpinned={false}
                >
                    <Grid
                        container
                        spacing={1}
                        alignItems="center"
                    >
                        {Array.from({ length: 5 }).map((_, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Fragment key={i}>
                                {grid_options.map((value, idx) => (
                                    <Item
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={idx}
                                        value={value}
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </Grid>
                </TableEditorComponents.PinnedPaper>
                <Box mt={3}>
                    <TableEditorComponents.PinnedPaper
                        elevation={0}
                        is_unpinned
                    >
                        <Grid
                            container
                            spacing={1}
                            alignItems="center"
                        >
                            {Array.from({ length: 8 }).map((_, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <Fragment key={i}>
                                    {grid_options.map((value, idx) => (
                                        <Item
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={idx}
                                            value={value}
                                        />
                                    ))}
                                </Fragment>
                            ))}
                        </Grid>
                    </TableEditorComponents.PinnedPaper>
                </Box>
            </Box>
            <Stack
                direction="row"
                justifyContent="flex-end"
            >
                <Skeleton
                    variant="rounded"
                    width="100px"
                    height="40px"
                />
            </Stack>
        </>
    );
}
