import { TablePagination } from '@mui/material';
import { MouseEvent, ChangeEvent, memo } from 'react';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';

type Props = {
    filter_id: string;
    rows_total: number;
    per_page: number;
    page: number;
};

function TabTablePagination({
    filter_id,
    rows_total,
    page,
    per_page
}: Props) {
    const updateFilters = useAdvancedUpdateFilters({ filter_id });

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateFilters({
            page: newPage
        });
    };

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateFilters({
            per_page: event.target.value,
            page    : 0
        });
    };

    return (
        <TablePagination
            sx={{
                margin    : '0px -30px',
                flexShrink: 0,
                borderTop : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,

                '.MuiTablePagination-selectLabel': {
                    fontWeight: 500
                },

                '.MuiTablePagination-displayedRows': {
                    fontWeight: 500
                },

                '.MuiSelect-select': {
                    fontWeight: 500
                },

                '.MuiToolbar-root': {
                    padding  : '0px 30px',
                    minHeight: 'auto',
                    height   : '34px',

                    '.MuiButtonBase-root': {
                        padding: '2px'
                    }
                }
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
            component="div"
            count={rows_total}
            rowsPerPage={per_page}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
        />
    );
}

export default memo(TabTablePagination);
