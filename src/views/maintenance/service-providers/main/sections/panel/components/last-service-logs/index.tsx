import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Table from './table';

function LastServiceLogs() {
    const { t } = useAppTranslation();
    return (
        <Stack
            gap="12px"
            maxHeight="500px"
            paddingBottom="20px"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.Maintenance.ServiceLogs
                    sx={{
                        fontSize: '24px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {t('maintenance:service_providers.modals.form.sections.last_service_logs')}
                </Typography>
            </Stack>

            <Table />
        </Stack>
    );
}

export default memo(LastServiceLogs);
