import DangerousIcon from '@mui/icons-material/Dangerous';
import React from 'react';
import { useConfirm } from '@/@core/components/confirm-dialog';
import VectorIcons from '@/@core/icons/vector_icons';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import TrackingOverviewButtonsStyled from './styled';

type Props = {
    truck_reference_id?: string;
    manifestId: string;
    loadId: string;
};

export default function UnassignTruckButton({
    truck_reference_id,
    manifestId,
    loadId
}: Props) {
    const confirm = useConfirm();
    const [unassignTruck, { isLoading }] =
        ManifestsGrpcService.useUnassignTruckFromManifestMutation();

    const unassignHandler = () => {
        confirm({
            icon        : <DangerousIcon color="secondary" />,
            title       : 'loads:details.overview.confirm.unassign_truck.title',
            body        : 'loads:details.overview.confirm.unassign_truck.body',
            confirm_text: 'common:button.unassign',
            onConfirm   : () =>
                unassignTruck({
                    manifestId,
                    loadId
                }),
            translationOptions: {
                title: { ref: truck_reference_id || '' }
            }
        });
    };

    return (
        <HotKeyTooltip
            title="common:tooltips.unassign_truck"
            hot_keys="U"
        >
            <TrackingOverviewButtonsStyled.Button
                color="error"
                onClick={unassignHandler}
            >
                <VectorIcons.Cross />
            </TrackingOverviewButtonsStyled.Button>
        </HotKeyTooltip>
    );
}
