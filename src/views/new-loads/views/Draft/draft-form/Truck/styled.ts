import { Button, styled, TableCell } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
    display     : 'flex',
    alignItems  : 'flex-end',
    width       : '100%',
    padding     : '24px 0 16px',
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));
export const Block = styled('div')(() => ({
    display          : 'flex',
    flexDirection    : 'column',
    paddingLeft      : 16,
    minWidth         : '20%',
    '&:first-of-type': {
        paddingLeft: 0
    }
}));
export const Label = styled('span')(({ theme }) => ({
    fontWeight: 400,
    fontSize  : 12,
    lineHeight: '150%',
    color     : theme.palette.semantic.text.secondary
}));
export const Value = styled('span')(({ theme }) => ({
    height    : 40,
    paddingTop: 16,
    fontWeight: 400,
    fontSize  : 16,
    lineHeight: '150%',
    color     : theme.palette.semantic.text.secondary
}));
export const AssignButton = styled(Button)(() => ({
    '.MuiSvgIcon-root': {
        marginRight: 8
    }
}));

export const TableContainer = styled('div')(() => ({
    position: 'relative',
    width   : '100%'
}));
export const HeadCell = styled(TableCell)(({ theme }) => ({
    padding          : '0 16px',
    fontWeight       : '400 !important',
    fontSize         : '12px !important',
    lineHeight       : '150%',
    textAlign        : 'left',
    color            : theme.palette.semantic.text.secondary,
    textTransform    : 'capitalize',
    border           : 'none',
    '&:first-of-type': {
        paddingLeft: 0
    },
    '&:last-child': {
        paddingRight: '0 !important'
    }
}));
export const BodyCell = styled(TableCell)(({ theme }) => ({
    height           : '56px',
    padding          : '8px 16px',
    fontWeight       : '400',
    fontSize         : '16px',
    lineHeight       : '150%',
    textAlign        : 'left',
    color            : theme.palette.semantic.text.primary,
    cursor           : 'pointer',
    '&:first-of-type': {
        paddingLeft: 0
    },
    '&:last-child': {
        paddingRight: '0 !important'
    },
    '&:nth-of-type(n + 3)': {
        fontWeight: 600
    }
}));
export const FooterCell = styled(TableCell)(({ theme }) => ({
    background  : theme.palette.semantic.text.secondary,
    borderRadius: '0 0 8px 8px',
    padding     : '16px 12px 16px 16px'
}));
export const ActionsContainer = styled('div')(() => ({
    display       : 'flex',
    justifyContent: 'flex-end'
}));
export const TotalContainer = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column'
}));
export const TotalTitle = styled('span')(({ theme }) => ({
    fontWeight   : 400,
    fontSize     : 12,
    lineHeight   : '150%',
    color        : theme.palette.semantic.text.secondary,
    textTransform: 'capitalize'
}));
export const TotalAmount = styled('span')(({ theme }) => ({
    fontWeight: 600,
    fontSize  : 16,
    lineHeight: '150%',
    color     : theme.palette.semantic.text.primary,
    marginTop : 4
}));
export const AddButton = styled(Button)(() => ({
    position          : 'absolute',
    left              : 0,
    bottom            : 21,
    marginLeft        : 'auto',
    '.MuiSvgIcon-root': {
        marginRight: 8
    }
}));
