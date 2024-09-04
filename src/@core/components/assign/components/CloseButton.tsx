import { memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

type Props = {
    onClose: () => void;
};

const CloseButton = ({ onClose }: Props) => (
    <IconButton
        size="small"
        sx={{
            position: 'absolute',
            zIndex  : 10000,
            right   : 0,
            top     : 0
        }}
        onClick={onClose}
    >
        <CloseIcon fontSize="small" />
    </IconButton>
);

export default memo(CloseButton);
