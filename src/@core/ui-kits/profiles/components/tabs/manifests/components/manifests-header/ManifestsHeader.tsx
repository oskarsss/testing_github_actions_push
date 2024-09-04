import { memo } from 'react';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function ManifestsHeader() {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            <EditSettlementIcons.Section.Manifests />

            <Typography
                fontSize="18px"
                fontWeight={700}
                color="semantic.text.primary"
            >
                {t('common:profile.center.title.manifests')}
            </Typography>
        </Stack>
    );
}

export default memo(ManifestsHeader);
