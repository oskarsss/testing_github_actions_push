import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { Stack } from '@mui/material';

type ButtonProps = {
    time?: string | null;
};

const Button = styled(MuiButton)<ButtonProps>(({
    theme,
    time,
    color
}) => ({
    width          : '100%',
    height         : 24,
    padding        : '1px 8px',
    borderRadius   : 0,
    justifyContent : 'flex-start',
    fontSize       : 12,
    fontWeight     : 500,
    backgroundColor: 'transparent',
    color          : theme.palette.semantic.foreground.brand.primary,
    textTransform  : 'none',

    ...(time
        ? {
            color: theme.palette.semantic.text.secondary
        }
        : {}),

    ...(color === 'error'
        ? {
            backgroundColor: theme.palette.utility.foreground.error.secondary,
            color          : theme.palette.utility.foreground.error.primary,

            svg: {
                path: {
                    fill: theme.palette.utility.foreground.error.primary
                }
            }
        }
        : {}),

    ...(color === 'info' && {
        color: theme.palette.semantic.text.secondary,

        svg: {
            path: {
                fill: theme.palette.utility.foreground.gray.primary
            }
        }
    }),

    ...(color === 'success'
        ? {
            backgroundColor: theme.palette.utility.foreground.success.secondary,
            color          : theme.palette.utility.foreground.success.primary,

            svg: {
                path: {
                    fill: theme.palette.utility.foreground.success.primary
                }
            }
        }
        : {}),

    '& .MuiButton-startIcon': {
        marginRight: '4px',

        svg: {
            width : 16,
            height: 16
        }
    }
}));

const TextWrapper = styled(Stack)({
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%'
});

type ButtonTextProps = {
    textColor?: 'error' | 'success' | 'primary' | 'secondary' | 'disabled';
};

const Text = styled('span')<ButtonTextProps>(({
    textColor = 'secondary',
    theme
}) => ({
    fontSize  : 12,
    fontWeight: 500,
    color     : theme.palette.semantic.text[textColor]
}));

const LoadStopComponents = {
    Button,
    TextWrapper,
    Text
};

export default LoadStopComponents;
