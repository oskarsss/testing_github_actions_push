import { useConfirm } from '@/@core/components/confirm-dialog';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { Button } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DangerousIcon from '@mui/icons-material/Dangerous';
import VectorIcons from '@/@core/icons/vector_icons';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';

type Props = {
    truckReferenceId: string;
    manifestId: string;
    loadId: string;
};

export default function UnassignTruckButton({
    manifestId,
    truckReferenceId,
    loadId
}: Props) {
    const { t } = useAppTranslation();

    const confirm = useConfirm();

    const [unassignTruckFromLoad, { isLoading }] =
        ManifestsGrpcService.useUnassignTruckFromManifestMutation();

    const handleUnassign = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:loads.edit_load.truck_items.confirm.title',
            body              : 'modals:loads.edit_load.truck_items.confirm.body',
            confirm_text      : 'common:button.unassign',
            onConfirm         : () => unassignTruckFromLoad({ manifestId, loadId }),
            translationOptions: {
                title: { truckReferenceId }
            }
        });
    };

    return (
        <Button
            disabled={isLoading}
            onClick={handleUnassign}
            startIcon={<VectorIcons.Cross />}
        >
            {t('common:button.unassign')}
        </Button>
    );
}
