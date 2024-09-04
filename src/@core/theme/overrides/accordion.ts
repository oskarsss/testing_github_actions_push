import { Theme } from '@mui/material';

const Accordion = (theme: Theme) => ({
    MuiAccordion: {
        styleOverrides: {
            root: {
                '&.Mui-disabled': {
                    backgroundColor: theme.palette.semantic.foreground.disabled
                },
                '&.Mui-expanded': {
                    boxShadow: theme.shadows[3]
                }
            }
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                padding                : `0 ${theme.spacing(5)}`,
                '& + .MuiCollapse-root': {
                    '& .MuiAccordionDetails-root:first-of-type': {
                        paddingTop: 0
                    }
                }
            },
            content: {
                margin: `${theme.spacing(2.5)} 0`
            },
            expandIconWrapper: {
                color: theme.palette.semantic.text.secondary
            }
        }
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: {
                padding                        : theme.spacing(5),
                '& + .MuiAccordionDetails-root': {
                    paddingTop: 0
                }
            }
        }
    }
});

export default Accordion;
