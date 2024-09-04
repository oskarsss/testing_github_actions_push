import { Button, Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import VehicleWarrantyGrpcService from '@/@grpcServices/services/vehicle-warranty.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';

type Props = {
    vehicleWarrantyId: string;
};

export default function WarrantyHeader({ vehicleWarrantyId }: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const [warrantyDelete, { isLoading }] = VehicleWarrantyGrpcService.useWarrantyDeleteMutation();

    const openConfirmDialog = () => {
        confirm({
            icon        : <DangerousIcon color="secondary" />,
            title       : 'common:profile.center.warranty.modals.delete_warranty.title',
            body        : 'common:profile.center.warranty.modals.delete_warranty.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () => warrantyDelete({ vehicleWarrantyId }).unwrap()
        });
    };

    return (
        <Stack
            direction="row"
            gap="20px"
            alignItems="center"
            justifyContent="space-between"
        >
            <Typography
                variant="h5"
                fontWeight={600}
            >
                {t('common:profile.center.title.warranty')}
            </Typography>

            <Button
                sx={{ height: '22px' }}
                variant="outlined"
                color="error"
                startIcon={(
                    <VectorIcons.TrashIcon
                        sx={{
                            fontSize: '16px !important',
                            color   : (theme) => theme.palette.utility.text.error,
                            path    : {
                                fill: (theme) => theme.palette.utility.foreground.error.primary
                            }
                        }}
                    />
                )}
                size="small"
                disabled={isLoading}
                onClick={openConfirmDialog}
            >
                {t('common:button.delete')}
            </Button>
        </Stack>
    );
}
