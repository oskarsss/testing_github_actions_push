import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { Stack } from '@mui/material';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled(Paper)(({ theme }) => ({
    width          : '100%',
    display        : 'flex',
    flexDirection  : 'column',
    flex           : '1 1 0',
    overflow       : 'hidden',
    borderRadius   : 0,
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

export const TableWrapper = styled(Stack)(({ theme }) => ({
    height       : '100%',
    width        : '100%',
    flexDirection: 'column',
    gap          : '20px',
    overflow     : 'auto',
    ...getScrollBarStyles(theme)
}));

export const Header = styled(TableHead)(() => ({
    position: 'sticky',
    top     : 0,
    zIndex  : 1000,
    width   : 'max-content'
}));

export const AssignedRow = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.utility.foreground.success.secondary,
    textTransform  : 'none'
}));
