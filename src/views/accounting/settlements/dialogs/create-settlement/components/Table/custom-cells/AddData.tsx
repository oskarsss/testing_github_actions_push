import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box } from '@mui/material';
import type { TFunction } from '@/@types/next-intl';

export default function AddData({ t }: { t: TFunction }) {
    return (
        <Box
            sx={{
                display      : 'flex',
                alignItems   : 'center',
                gap          : '4px',
                textTransform: 'uppercase',
                color        : '#0A43E1',
                fontWeight   : 500
            }}
        >
            <AddCircleOutlineIcon sx={{ width: 16 }} />

            {t('common:button.add')}
        </Box>
    );
}
