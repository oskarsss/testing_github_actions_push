import VectorIcons from '@/@core/icons/vector_icons';
import { Box, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NoMessages() {
    const { t } = useAppTranslation();

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            flex={1}
            width="400px"
        >
            <VectorIcons.EmptyNotes />
            <Typography variant="h6">{t('common:empty.no_message')}</Typography>
        </Box>
    );
}
