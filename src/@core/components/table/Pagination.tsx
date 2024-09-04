import { memo, MouseEvent, ChangeEvent } from 'react';
import { TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TestIDs, applyTestId } from '@/configs/tests';

type Props = {
    page: number;
    per_page: number;
    total: number;
    updateFilters: (options: object) => void;
};

const Pagination = ({
    page,
    per_page,
    total,
    updateFilters
}: Props) => {
    const { palette } = useTheme();
    const onPageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateFilters({
            page: newPage
        });
    };
    const onRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateFilters({
            per_page: event.target.value,
            page    : 0
        });
    };

    return (
        <TablePagination
            style={{
                backgroundColor: palette.semantic.foreground.secondary,
                height         : 60,
                minHeight      : 60
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
            component="div"
            className="pagination"
            count={total}
            rowsPerPage={per_page}
            page={page}
            backIconButtonProps={{
                'aria-label': 'Previous Page',
                ...applyTestId(TestIDs.components.pagination.previousPage)
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
                ...applyTestId(TestIDs.components.pagination.nextPage)
            }}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
};

export default memo(Pagination);
