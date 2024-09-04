import { memo } from 'react';
import { Grid, Stack, Button } from '@mui/material';
import FullDialog from '@/@core/ui-kits/full-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import { useCreateServiceLogItemDialog } from '@/views/maintenance/service-logs/modals/service-log-item/CreateServiceLogItem';
import AddIcon from '@mui/icons-material/Add';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    serviceLogId: string;
};

function ServiceItemsHeader({ serviceLogId }: Props) {
    const { t } = useAppTranslation();
    const createServiceLogItemDialog = useCreateServiceLogItemDialog();

    const openCreateServiceLogItemDialog = () => {
        createServiceLogItemDialog.open({
            serviceLogId
        });
    };

    return (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            xs={12}
            justifyContent="space-between"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="15px"
            >
                <FullDialog.FieldsGroupTitle
                    startIcon={(
                        <VectorIcons.Maintenance.ServiceLogs
                            sx={{
                                fontSize: '32px',

                                fill: ({ palette }) => palette.semantic.foreground.brand.primary
                            }}
                        />
                    )}
                    title="maintenance:service_logs.common.service_items"
                />
            </Stack>

            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={openCreateServiceLogItemDialog}
            >
                {t('maintenance:service_logs.common.buttons.add_service_item')}
            </Button>
        </Grid>
    );
}

export default memo(ServiceItemsHeader);
