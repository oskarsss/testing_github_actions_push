import { Components, Theme } from '@mui/material';

const Typography = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiTypography: {
        styleOverrides: {
            gutterBottom: {
                marginBottom: theme.spacing(2)
            }
        }
    }
});

export default Typography;
