import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export function GrossLabel() {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="12px"
            sx={{
                pointerEvents: 'none'
            }}
        >
            <Typography
                variant="caption"
                component="span"
                paddingX="4px"
                fontWeight={500}
                sx={{
                    backgroundColor: (theme) => theme.palette.semantic.foreground.brand.secondary,
                    color          : (theme) => theme.palette.semantic.foreground.brand.primary,
                    borderRadius   : '4px'
                }}
            >
                {t('common:gross')}
            </Typography>
        </Stack>
    );
}
