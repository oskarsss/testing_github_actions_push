// ** MUI Imports
import { useTheme } from '@mui/material/styles';

// ** Util Import
import { hexToRGBA } from '../utils/hex-to-rgba';

const UseBgColor = () => {
    // ** Hooks
    const theme = useTheme();

    return {
        primaryFilled: {
            color          : theme.palette.semantic.text.brand.primary,
            backgroundColor: theme.palette.semantic.foreground.brand.primary
        },
        primaryLight: {
            color          : theme.palette.semantic.foreground.brand.primary,
            backgroundColor: hexToRGBA(theme.palette.semantic.foreground.brand.primary, 0.12)
        },
        secondaryFilled: {
            color          : theme.palette.semantic.text.secondary,
            backgroundColor: theme.palette.semantic.text.secondary
        },
        secondaryLight: {
            color          : theme.palette.semantic.text.secondary,
            backgroundColor: hexToRGBA(theme.palette.semantic.text.secondary, 0.12)
        },
        successFilled: {
            color          : theme.palette.semantic.text.success,
            backgroundColor: theme.palette.semantic.border.success.primary
        },
        successLight: {
            color          : theme.palette.semantic.border.success.primary,
            backgroundColor: hexToRGBA(theme.palette.semantic.border.success.primary, 0.12)
        },
        errorFilled: {
            color          : theme.palette.utility.text.error,
            backgroundColor: theme.palette.utility.foreground.error.primary
        },
        errorLight: {
            color          : theme.palette.utility.foreground.error.primary,
            backgroundColor: hexToRGBA(theme.palette.utility.foreground.error.primary, 0.12)
        },
        warningFilled: {
            color          : theme.palette.utility.text.warning,
            backgroundColor: theme.palette.utility.foreground.warning.secondary
        },
        warningLight: {
            color          : theme.palette.utility.text.warning,
            backgroundColor: hexToRGBA(theme.palette.utility.foreground.warning.secondary, 0.12)
        },
        infoFilled: {
            color          : theme.palette.semantic.text.brand.primary,
            backgroundColor: theme.palette.semantic.foreground.brand.secondary
        },
        infoLight: {
            color          : theme.palette.semantic.text.brand.primary,
            backgroundColor: hexToRGBA(theme.palette.semantic.foreground.brand.secondary, 0.12)
        }
    };
};

export default UseBgColor;
