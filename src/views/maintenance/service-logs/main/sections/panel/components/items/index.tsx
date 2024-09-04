import { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import { ServiceLogItemGetReply } from '@proto/service_log_item';
import ServiceLogPanelServiceItemsTable from './table';

type Props = {
    items?: ServiceLogItemGetReply;
};

function ServiceLogPanelServiceItems({ items }: Props) {
    const { t } = useAppTranslation();

    if (!items) {
        return null;
    }

    return (
        <Stack gap="12px">
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
                    {t('maintenance:service_logs.panel.sections.service_items.title')}
                </Typography>
            </Stack>

            <ServiceLogPanelServiceItemsTable items={items} />
        </Stack>
    );
}

export default memo(ServiceLogPanelServiceItems);
