import { memo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useUpdateServiceProvider } from '@/views/maintenance/service-providers/modals/UpdateServiceProvider';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import { isEqual } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    serviceProvider: ServiceProviderModel_ServiceProvider;
};

function Header({ serviceProvider }: Props) {
    const { t } = useAppTranslation();
    const editServiceProviderDialog = useUpdateServiceProvider();

    const openEditServiceProviderDialog = () => {
        if (!serviceProvider) {
            return;
        }
        editServiceProviderDialog.open({ serviceProvider });
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
                <VectorIcons.Maintenance.ServiceProviders
                    sx={{
                        fontSize: '32px',

                        fill: ({ palette }) => palette.semantic.foreground.brand.primary
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={600}
                >
                    {t('navigation:items.maintenance.service_providers')}
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

export default memo(Header, isEqual);
