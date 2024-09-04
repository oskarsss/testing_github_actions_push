import { Theme } from '@mui/material';

const Chip = (theme: Theme) => ({
    MuiChip: {
        styleOverrides: {
            outlined: {
                '&.MuiChip-colorDefault': {
                    borderColor: theme.palette.semantic.foreground.secondary
                }
            },
            deleteIcon: {
                width : 18,
                height: 18
            }
        }
    }
});

export default Chip;
