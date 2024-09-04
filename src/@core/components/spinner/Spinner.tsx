// import SYSTEM_ASSETS_CONFIG from '@/@system/system-assets-config';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SYSTEM from '@/@system';
import styles from './spinner.module.scss';

const { LargeLogo } = SYSTEM.ASSETS;

export default function Spinner() {
    return (
        <Box
            style={{
                height        : '100vh',
                display       : 'flex',
                alignItems    : 'center',
                flexDirection : 'column',
                justifyContent: 'center'
            }}
        >
            <div className={styles.logo}>
                <LargeLogo />
            </div>
            <CircularProgress
                disableShrink
                sx={{ mt: 6, color: ({ palette }) => palette.semantic.foreground.brand.primary }}
                size={30}
            />
        </Box>
    );
}
