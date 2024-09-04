import { Theme } from '@mui/material';

const Avatar = (theme: Theme) => ({
    MuiAvatar: {
        styleOverrides: {
            colorDefault: {
                color          : theme.palette.semantic.text.secondary,
                backgroundColor: theme.palette.semantic.foreground.six
            },
            rounded: {
                borderRadius: 5
            }
        }
    },
    MuiAvatarGroup: {
        styleOverrides: {
            root: {
                justifyContent                   : 'flex-end',
                '.MuiCard-root & .MuiAvatar-root': {
                    borderColor: theme.palette.semantic.background.white
                }
            }
        }
    }
});

export default Avatar;
