import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { MouseEvent } from 'react';

type Props = {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (e: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
};

export default function TablePaginationActions({
    count,
    page,
    rowsPerPage,
    onPageChange
}: Props) {
    const theme = useTheme();

    const handleFirstPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, 0);
    };

    const handleBackButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page - 1);
    };

    const handleNextButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, page + 1);
    };

    const handleLastPageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
