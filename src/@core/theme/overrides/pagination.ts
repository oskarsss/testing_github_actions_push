// ** Util Import
import { Theme } from '@mui/material';
import { hexToRGBA } from '../../../utils/hex-to-rgba';

const Pagination = (theme: Theme) => ({
    MuiPaginationItem: {
        styleOverrides: {
            root: {
                '&.Mui-selected:not(.Mui-disabled):not(.MuiPaginationItem-textPrimary):not(.MuiPaginationItem-textSecondary):hover':
                    {
                        backgroundColor: theme.palette.semantic.background.secondary
                    }
            },
            outlined: {
                borderColor: theme.palette.semantic.border.primary
            },
            outlinedPrimary: {
                '&.Mui-selected': {
                    backgroundColor: hexToRGBA(
                        theme.palette.semantic.foreground.brand.primary,
                        0.12
                    ),
                    '&:hover': {
                        backgroundColor: `${hexToRGBA(
                            theme.palette.semantic.foreground.brand.primary,
                            0.2
                        )} !important`
                    }
                }
            },
            outlinedSecondary: {
                '&.Mui-selected': {
                    backgroundColor: hexToRGBA(theme.palette.semantic.text.secondary, 0.12),
                    '&:hover'      : {
                        backgroundColor: `${hexToRGBA(
                            theme.palette.semantic.text.secondary,
                            0.2
                        )} !important`
                    }
                }
            }
        }
    }
});

export default Pagination;
