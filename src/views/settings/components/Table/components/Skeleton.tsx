import { Columns } from '@/views/settings/components/Table/types';
import { Skeleton } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const arr = new Array(14).fill(0);

type Props<Row> = {
    columns: Columns<Row>[];
};

export default function SkeletonTable<Row>({ columns }: Props<Row>) {
    return (
        <TableBody>
            {arr.map((row, index) => (
                <TableRow
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                >
                    {columns.map((column, index) => (
                        <TableCell
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            align={column.align}
                            padding="checkbox"
                            sx={{
                                padding          : '10px 0',
                                '&:first-of-type': {
                                    paddingLeft: '16px'
                                }
                            }}
                        >
                            {column.variant !== 'checkbox' && column.variant !== 'button' && (
                                <Skeleton
                                    variant="text"
                                    sx={{
                                        fontSize  : '14px',
                                        fontWeight: 500,
                                        height    : 24,
                                        width     : column.minWidth * 0.8
                                    }}
                                />
                            )}
                            {column.variant === 'checkbox' && (
                                <Skeleton
                                    variant="rectangular"
                                    sx={{
                                        height : 24,
                                        width  : 24,
                                        marginX: 'auto'
                                    }}
                                />
                            )}
                            {column.variant === 'button' && (
                                <Skeleton
                                    variant="circular"
                                    sx={{
                                        height : 24,
                                        width  : 24,
                                        marginX: 'auto'
                                    }}
                                />
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}
