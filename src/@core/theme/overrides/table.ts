import { Components, Theme } from '@mui/material';

const Table = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiTableContainer: {
        styleOverrides: {
            root: {
                boxShadow     : theme.shadows[0],
                borderTopColor: theme.palette.semantic.border.secondary
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                textTransform         : 'uppercase',
                '& .MuiTableCell-head': {
                    fontSize     : '0.75rem',
                    fontWeight   : 600,
                    letterSpacing: '0.13px',
                    borderColor  : theme.palette.semantic.border.primary
                }
            }
        }
    },
    MuiTableBody: {
        styleOverrides: {
            root: {
                '& .MuiTableCell-body': {
                    letterSpacing: '0.25px',
                    // eslint-disable-next-line max-len
                    color        : theme.palette.semantic.text.secondary,
                    '&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)':
                        {
                            paddingTop   : theme.spacing(3.5),
                            paddingBottom: theme.spacing(3.5)
                        }
                }
            }
        }
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                '& .MuiTableCell-head:first-of-type & .MuiTableCell-root:first-of-type ': {
                    paddingLeft: theme.spacing(5)
                },
                '& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child': {
                    paddingRight: theme.spacing(5)
                }
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderBottom       : `1px solid ${theme.palette.semantic.border.secondary}`,
                '& .MuiButton-root': {
                    textTransform: 'uppercase',
                    color        : theme.palette.semantic.text.secondary
                }
            },
            stickyHeader: {
                backgroundColor: theme.palette.semantic.background.secondary
            }
        }
    }
});

export default Table;
