import TooltipMui, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Span = styled('span')(({ theme }) => ({
    marginLeft  : '5px',
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace  : 'nowrap',
    color       : theme.palette.semantic.text.brand.primary
}));

const Tooltip = styled(
    ({
        className = '',
        children,
        ...props
    }: TooltipProps & { isOnline?: boolean }) => (
        <TooltipMui
            {...props}
            classes={{ tooltip: className }}
        >
            {children}
        </TooltipMui>
    ),
    {
        shouldForwardProp: (prop) => prop !== 'isOnline'
    }
)(({
    theme,
    isOnline
}) => ({
    backgroundColor: theme.palette.semantic.background.white,
    color          : theme.palette.semantic.text.secondary,
    fontWeight     : 500,
    fontSize       : '12px',
    display        : 'flex',
    alignItems     : 'center',
    gap            : '8px',
    boxShadow      : '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    borderRadius   : '32px',
    padding        : '4px 12px',

    '& .MuiAvatar-root': {
        fontSize: '10px',
        width   : '18px',
        height  : '18px'
    },

    span: {
        position  : 'relative',
        marginLeft: '4px',
        color     : isOnline
            ? theme.palette.semantic.border.success.primary
            : theme.palette.semantic.text.secondary
    },

    'span:before': {
        content        : '""',
        display        : 'block',
        borderRadius   : '2px',
        width          : '4px',
        height         : '4px',
        backgroundColor: isOnline
            ? theme.palette.semantic.border.success.primary
            : theme.palette.semantic.text.secondary,
        position: 'absolute',
        left    : '-8px',
        top     : '7px'
    }
}));

const ImageWrapper = styled('div')({
    width : '24px',
    height: '24px'
});

const TooltipStyled = {
    Tooltip,
    Span,
    ImageWrapper
};

export default TooltipStyled;
