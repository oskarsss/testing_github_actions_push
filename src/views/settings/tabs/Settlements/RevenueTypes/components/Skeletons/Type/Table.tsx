import { Skeleton, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import { TableHead, TableWrapper } from '@/views/settings/components/styled';
import table_columns from '../options/table_columns';

const skeleton_array = [1, 2, 3];

export default function TypeTable() {
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
                            <TableRow
                                // eslint-disable-next-line react/no-array-index-key
                                key={index}
                            >
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
                                            height={column.textHeight && column.textHeight}
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
                justifyContent="flex-start"
                direction="row"
                paddingLeft="18px"
            >
                <Skeleton
                    variant="rounded"
                    width="150px"
                    height="32px"
                />
            </Stack>
        </TableWrapper>
    );
}
