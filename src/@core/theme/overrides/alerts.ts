/* eslint-disable max-len */
import { lighten, darken, Theme } from '@mui/material';

// ** Util Import
import { hexToRGBA } from '../../../utils/hex-to-rgba';

const Alert = (theme: Theme) => {
    const getColor = theme.palette.mode === 'light' ? darken : lighten;

    return {
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius           : 5,
                    '& .MuiAlertTitle-root': {
                        marginBottom: theme.spacing(1.6)
                    },
                    '& a': {
                        color     : 'inherit',
                        fontWeight: 500
                    }
                },
                standardSuccess: {
                    color                  : getColor(theme.palette.semantic.border.success.primary, 0.12),
                    backgroundColor        : hexToRGBA(theme.palette.semantic.border.success.primary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.semantic.border.success.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.semantic.border.success.primary, 0.12)
                    }
                },
                standardInfo: {
                    color                  : getColor(theme.palette.semantic.text.brand.primary, 0.12),
                    backgroundColor        : hexToRGBA(theme.palette.semantic.text.brand.primary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.semantic.text.brand.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.semantic.text.brand.primary, 0.12)
                    }
                },
                standardWarning: {
                    color          : getColor(theme.palette.utility.foreground.warning.primary, 0.12),
                    backgroundColor: hexToRGBA(
                        theme.palette.utility.foreground.warning.primary,
                        0.12
                    ),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.utility.foreground.warning.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.utility.foreground.warning.primary, 0.12)
                    }
                },
                standardError: {
                    color          : getColor(theme.palette.utility.foreground.error.primary, 0.12),
                    backgroundColor: hexToRGBA(
                        theme.palette.utility.foreground.error.primary,
                        0.12
                    ),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.utility.foreground.error.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.utility.foreground.error.primary, 0.12)
                    }
                },
                outlinedSuccess: {
                    borderColor            : theme.palette.semantic.border.success.primary,
                    color                  : getColor(theme.palette.semantic.border.success.primary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.semantic.border.success.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.semantic.border.success.primary, 0.12)
                    }
                },
                outlinedInfo: {
                    borderColor            : theme.palette.semantic.text.brand.primary,
                    color                  : getColor(theme.palette.semantic.foreground.brand.secondary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.semantic.foreground.brand.secondary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.semantic.text.brand.primary, 0.12)
                    }
                },
                outlinedWarning: {
                    borderColor            : theme.palette.utility.foreground.warning.primary,
                    color                  : getColor(theme.palette.utility.foreground.warning.primary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.utility.foreground.warning.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.utility.foreground.warning.primary, 0.12)
                    }
                },
                outlinedError: {
                    borderColor            : theme.palette.utility.foreground.error.primary,
                    color                  : getColor(theme.palette.utility.foreground.error.primary, 0.12),
                    '& .MuiAlertTitle-root': {
                        color: getColor(theme.palette.utility.foreground.error.primary, 0.12)
                    },
                    '& .MuiAlert-icon': {
                        color: getColor(theme.palette.utility.foreground.error.primary, 0.12)
                    }
                },
                filled: {
                    fontWeight: 400
                }
            }
        }
    };
};

export default Alert;
