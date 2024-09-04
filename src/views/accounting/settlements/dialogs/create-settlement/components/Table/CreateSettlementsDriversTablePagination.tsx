import { TablePagination } from '@mui/material';
import React from 'react';

type Props = {
    count: number;
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CreateSettlementsDriversTablePagination({
    count,
    rowsPerPage,
    page,
    setPage,
    setRowsPerPage
}: Props) {
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TablePagination
            sx={{
                margin      : '0px -20px',
                flexShrink  : 0,
                borderTop   : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
                borderBottom: (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,

                '.MuiTablePagination-selectLabel': {
                    fontWeight: 500,
                    margin    : 0
                },

                '.MuiTablePagination-displayedRows': {
                    fontWeight: 500,
                    margin    : 0
                },

                '.MuiSelect-select': {
                    fontWeight: 500
                },

                '.MuiToolbar-root': {
                    padding  : '0px 20px',
                    minHeight: 'auto',
                    height   : '34px',

                    '.MuiButtonBase-root': {
                        padding: '2px'
                    }
                }
            }}
            rowsPerPageOptions={[10, 15, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
