import { Backdrop, CircularProgress } from '@mui/material';
import { memo } from 'react';

const ScedhuleLoading = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default memo(ScedhuleLoading);
