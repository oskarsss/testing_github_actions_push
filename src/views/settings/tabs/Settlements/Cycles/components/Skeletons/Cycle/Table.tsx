import { Box, Skeleton, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import { SubtitleSkeleton } from '@/views/settings/tabs/Settlements/styled';
import { TableHead, TableWrapper } from '@/views/settings/components/styled';
import table_columns from '../options/table_columns';

const skeleton_array = [1, 2, 3, 4, 5];

export default function CycleTable() {
    return (
        <TableWrapper>
            <TableContainer
                sx={{
                    maxHeight  : 440,
                    paddingLeft: '18px'
                }}
            >
                <Table
                    stickyHeader
                    aria-label="sticky table"
                >
                    <TableHead>
                        <TableRow
                            tabIndex={-1}
                            sx={{
                                MuiTableRow: {
                                    borderBottom: 0
                                }
                            }}
                        >
                            {table_columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{
                                        minWidth: column.minWidth,
                                        padding : '10px 0'
                                    }}
                                >
                                    <Skeleton
                                        variant={column.headerVariant}
                                        width={column.headerTextWidth}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skeleton_array.map((row, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={index}>
                                {table_columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{
                                            minWidth: column.minWidth,
                                            padding : '10px 0'
                                        }}
                                    >
                                        <Skeleton
                                            variant={column.variant}
                                            width={column.textWidth}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                height="52px"
                alignItems="center"
                justifyContent="flex-end"
                direction="row"
                spacing={3}
                paddingRight={2}
            >
                <Box width="80px">
                    <SubtitleSkeleton variant="text" />
                </Box>
                <Box width="50px">
                    <Skeleton
                        variant="circular"
                        width="30px"
                        height="30px"
                    />
                </Box>
                <Box width="80px">
                    <SubtitleSkeleton variant="text" />
                </Box>
                <Stack
                    height="52px"
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row"
                    spacing={1}
                >
                    <Skeleton
                        variant="circular"
                        width="30px"
                        height="30px"
                    />
                    <Skeleton
                        variant="circular"
                        width="30px"
                        height="30px"
                    />
                </Stack>
            </Stack>
        </TableWrapper>
    );
}
