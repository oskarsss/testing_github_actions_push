import { styled } from '@mui/material/styles';
import IconButtonMui from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const IconButton = styled(IconButtonMui)(({ theme }) => ({
    position  : 'absolute',
    top       : 4,
    left      : -17,
    background: theme.palette.semantic.background.white,
    filter    : theme.palette.mode === 'light' ? 'brightness(1)' : 'brightness(1.2)',
    height    : 32,
    width     : 32,
    border    : `1px solid ${theme.palette.semantic.border.secondary}`,
    boxShadow : '0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
    '&:hover' : {
        filter    : theme.palette.mode === 'light' ? 'brightness(0.9)' : 'brightness(1.3)',
        background: theme.palette.semantic.background.white
    },
    svg: {
        fontSize: 16,
        color   : theme.palette.semantic.foreground.primary
    }
}));

type Props = {
    onClose: () => void;
};

export default function CloseButton({ onClose }: Props) {
    return (
        <IconButton
            onClick={onClose}
            aria-label="close"
        >
            <CloseIcon />
        </IconButton>
    );
}
