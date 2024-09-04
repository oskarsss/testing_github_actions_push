import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function DragActive() {
    const { t } = useAppTranslation('core');
    return (
        <Fade in>
            <Stack
                justifyContent="center"
                height="100%"
                sx={{
                    border         : (theme) => `2px solid ${theme.palette.semantic.border.brand.primary}`,
                    borderRadius   : '10px',
                    backgroundColor: (theme) => theme.palette.semantic.foreground.brand.tertiary
                }}
            >
                <Typography
                    fontSize={20}
                    fontWeight={500}
                    textAlign="center"
                >
                    {t('notes.drag_active_title')}
                </Typography>
            </Stack>
        </Fade>
    );
}
