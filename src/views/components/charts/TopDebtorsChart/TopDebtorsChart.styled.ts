import { TableContainer, TableCell, styled } from '@mui/material';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';

const TableInfo = styled(TableContainer)(({ theme }) => ({
    width    : '100%',
    maxHeight: '17vh',
    margin   : '-16px 0 0 24px',
    ...getScrollBarStyles(theme)
}));

const HeadCell = styled(TableCell)(({ theme }) => ({
    maxHeight    : 38,
    padding      : 8,
    fontWeight   : 600,
    fontSize     : 12,
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    textTransform: 'capitalize',
    background   : theme.palette.semantic.background.white,
    color        : theme.palette.semantic.text.secondary
}));

const BodyCell = styled(TableCell)(({ theme }) => ({
    maxWidth       : 180,
    fontWeight     : 500,
    fontSize       : 14,
    lineHeight     : '143%',
    letterSpacing  : '0.17px',
    color          : theme.palette.semantic.text.secondary,
    whiteSpace     : 'nowrap',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow       : 'hidden',
    textOverflow   : 'ellipsis',
    textTransform  : 'capitalize'
}));

const Indicator = styled('div')({
    width       : 16,
    minWidth    : 16,
    height      : 16,
    borderRadius: '100%',
    marginRight : 16
});

const TopDebtorsChartStyled = {
    TableInfo,
    HeadCell,
    BodyCell,
    Indicator
};

export default TopDebtorsChartStyled;
