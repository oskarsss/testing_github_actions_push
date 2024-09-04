import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Stats from '@/views/maintenance/service-providers/ui-elements/Stats';
import { useAppSelector } from '@/store/hooks';
import VectorIcons from '@/@core/icons/vector_icons';

function LogStats() {
    const { t } = useAppTranslation();

    const selectedServiceProviderId = useAppSelector(
        (state) => state.serviceProviders.selectedServiceProviderId
    );

    return (
        <Stack gap="12px">
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.Maintenance.Stats
                    sx={{
                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t('maintenance:service_providers.modals.form.sections.stats')}
                </Typography>
            </Stack>

            <Stats providerId={selectedServiceProviderId} />
        </Stack>
    );
}

export default memo(LogStats);
