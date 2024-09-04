// ** Util Import
import { Theme } from '@mui/material';
import { hexToRGBA } from '../../../utils/hex-to-rgba';

const Timeline = (theme: Theme) => ({
    MuiTimelineItem: {
        styleOverrides: {
            root: {
                '&:not(:last-of-type)': {
                    '& .MuiTimelineContent-root': {
                        marginBottom: theme.spacing(4)
                    }
                }
            }
        }
    },
    MuiTimelineConnector: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.semantic.border.secondary
            }
        }
    },
    MuiTimelineContent: {
        styleOverrides: {
            root: {
                marginTop: theme.spacing(0.5)
            }
        }
    },
    MuiTimelineDot: {
        styleOverrides: {
            filledPrimary: {
                boxShadow: `0 0 0 3px ${hexToRGBA(
                    theme.palette.semantic.foreground.brand.primary,
                    0.12
                )}`
            },
            filledSecondary: {
                boxShadow: `0 0 0 3px ${hexToRGBA(theme.palette.semantic.text.secondary, 0.12)}`
            },
            filledSuccess: {
                boxShadow: `0 0 0 3px ${hexToRGBA(
                    theme.palette.semantic.border.success.primary,
                    0.12
                )}`
            },
            filledError: {
                boxShadow: `0 0 0 3px ${hexToRGBA(
                    theme.palette.utility.foreground.error.primary,
                    0.12
                )}`
            },
            filledWarning: {
                boxShadow: `0 0 0 3px ${hexToRGBA(
                    theme.palette.utility.foreground.warning.primary,
                    0.12
                )}`
            },
            filledInfo: {
                boxShadow: `0 0 0 3px ${hexToRGBA(
                    theme.palette.semantic.foreground.brand.primary,
                    0.12
                )}`
            },
            filledGrey: {
                boxShadow: `0 0 0 3px ${hexToRGBA(theme.palette.colors.gray[400], 0.12)}`
            },
            outlinedPrimary: {
                '& svg': { color: theme.palette.semantic.foreground.brand.primary }
            },
            outlinedSecondary: {
                '& svg': { color: theme.palette.semantic.text.secondary }
            },
            outlinedSuccess: {
                '& svg': { color: theme.palette.semantic.border.success.primary }
            },
            outlinedError: {
                '& svg': { color: theme.palette.utility.foreground.error.primary }
            },
            outlinedWarning: {
                '& svg': { color: theme.palette.utility.foreground.warning.primary }
            },
            outlinedInfo: {
                '& svg': { color: theme.palette.semantic.foreground.brand.primary }
            },
            outlinedGrey: {
                '& svg': { color: theme.palette.colors.gray[500] }
            }
        }
    }
});

export default Timeline;
