import { Theme } from '@mui/material';

const Rating = (theme: Theme) => ({
    MuiRating: {
        styleOverrides: {
            root: {
                color: theme.palette.utility.foreground.warning.primary
            }
        }
    }
});

export default Rating;
