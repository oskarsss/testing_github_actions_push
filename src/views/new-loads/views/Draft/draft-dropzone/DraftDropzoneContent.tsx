import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    isDragActive: boolean;
};

const DraftDropzoneContent = ({ isDragActive }: Props) => {
    const { t } = useAppTranslation('new_loads');
    return (
        <Fade in={isDragActive}>
            <Stack
                position="absolute"
                top={0}
                zIndex={10}
                width="100%"
                height="100%"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ background: (theme) => theme.palette.semantic.foreground.brand.primary }}
            >
                <Typography
                    variant="h3"
                    color="semantic.text.white"
                    sx={{ mb: 16 }}
                >
                    {t('draft.drop_zone.title')}
                </Typography>
                <Typography
                    variant="h5"
                    color="semantic.text.white"
                >
                    {t('draft.drop_zone.description', { name: SYSTEM.AI_NAME })}
                </Typography>
            </Stack>
        </Fade>
    );
};

export default DraftDropzoneContent;
