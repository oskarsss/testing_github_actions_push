import { styled, Table, TableCell } from '@mui/material';

const TableContainer = styled(Table)(() => ({
    width  : '100%',
    padding: '0 16px'
}));

const HeadCell = styled(TableCell)(({ theme }) => ({
    padding      : '0 16px',
    fontWeight   : '400 !important',
    fontSize     : '12px !important',
    lineHeight   : '150%',
    textAlign    : 'left',
    color        : theme.palette.semantic.text.secondary,
    textTransform: 'capitalize',
    border       : 'none'
}));

const BodyCell = styled(TableCell)(({ theme }) => ({
    height                : '56px',
    padding               : '8px 16px',
    fontWeight            : '400',
    fontSize              : '16px',
    lineHeight            : '150%',
    textAlign             : 'left',
    color                 : theme.palette.semantic.text.primary,
    cursor                : 'pointer',
    '&:nth-of-type(n + 2)': {
        fontWeight: 600
    }
}));

const ActionsContainer = styled('div')(() => ({
    display       : 'flex',
    justifyContent: 'flex-end'
}));

const InvoicingFieldsStyled = {
    TableContainer,
    HeadCell,
    BodyCell,
    ActionsContainer
};

export default InvoicingFieldsStyled;
