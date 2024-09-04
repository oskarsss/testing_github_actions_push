import DangerousIcon from '@mui/icons-material/Dangerous';
import React from 'react';
import { useConfirm } from '@/@core/components/confirm-dialog';
import Button from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/Button';
import VectorIcons from '@/@core/icons/vector_icons';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';

type Props = {
    truck_reference_id?: string;
    manifestId: string;
    loadId: string;
};

export default function UnassignTruckButton({
    manifestId,
    truck_reference_id,
    loadId
}: Props) {
    const confirm = useConfirm();
    const [unassignTruckFromLoad, { isLoading }] =
        ManifestsGrpcService.useUnassignTruckFromManifestMutation();

    const unassignHandler = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'loads:details.overview.confirm.unassign_truck.title',
            body              : 'loads:details.overview.confirm.unassign_truck.body',
            confirm_text      : 'common:button.unassign',
            onConfirm         : () => unassignTruckFromLoad({ manifestId, loadId }),
            translationOptions: {
                title: { ref: truck_reference_id || '' }
            }
        });
    };

    return (
        <Button
            onClick={unassignHandler}
            tooltipProps={{
                title   : 'common:tooltips.unassign_truck',
                hot_keys: 'U'
            }}
            color="error"
            disabled={isLoading}
        >
            <VectorIcons.Cross />
        </Button>
    );
}
