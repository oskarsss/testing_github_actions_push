import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';

function LoadsHeader() {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            <VectorIcons.CubeIcon
                sx={{
                    fontSize: '24px',
                    color   : ({ palette }) => palette.semantic.foreground.brand.primary
                }}
            />

            <Typography
                fontSize="18px"
                fontWeight={700}
                color="semantic.text.primary"
            >
                {t('common:profile.center.title.loads')}
            </Typography>
        </Stack>
    );
}

export default memo(LoadsHeader);
