import { Theme } from '@mui/material';

// ** Util Import
import { hexToRGBA } from '../../../utils/hex-to-rgba';

const Backdrop = (theme: Theme) => ({
    MuiBackdrop: {
        styleOverrides: {
            root: {
                backgroundColor:

                // theme.palette.semantic.background.primary

                    hexToRGBA(theme.palette.colors.gray[900], 0.7)
            },
            invisible: {
                backgroundColor: 'transparent'
            }
        }
    }
});

export default Backdrop;
