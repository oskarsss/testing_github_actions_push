import { memo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '@/store/hooks';
import { useEditServiceLogDialog } from '@/views/maintenance/service-logs/modals/edit-service-log';

function Header() {
    const { t } = useAppTranslation();
    const selectedServiceLog = useAppSelector((state) => state.serviceLogs.selectedServiceLog);
    const editServiceLogDialog = useEditServiceLogDialog();

    if (!selectedServiceLog) {
        return null;
    }

    const openEditServiceProviderDialog = () => {
        editServiceLogDialog.open({ serviceLogId: selectedServiceLog.serviceLogId });
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="semantic.background.secondary"
            position="sticky"
            paddingTop="20px"
            paddingBottom="5px"
            top={0}
            zIndex={1000}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <VectorIcons.Maintenance.ServiceLogs
                    sx={{
                        fontSize: '32px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {t('maintenance:service_logs.panel.title', {
                        friendlyId: selectedServiceLog.friendlyId
                    })}
                </Typography>
            </Stack>

            <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={openEditServiceProviderDialog}
            >
                {t('common:button.edit')}
            </Button>
        </Stack>
    );
}

export default memo(Header);
