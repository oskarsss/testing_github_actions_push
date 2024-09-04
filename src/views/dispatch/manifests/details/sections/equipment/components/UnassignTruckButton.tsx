import { useConfirm } from '@/@core/components/confirm-dialog';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import HotKeyTooltip from '@/@core/ui-kits/basic/hot-key-tooltip/HotKeyTooltip';
import ManifestStyled from '@/views/dispatch/manifests/components/styled';
import CloseIcon from '@mui/icons-material/Close';
import React, { useCallback } from 'react';
import Typography from '@mui/material/Typography';

type UnassignTruckButtonProps = {
    manifestId: string;
    truckId: string;
    kind: 'text' | 'common';
};

export const useUnassignTruckFromManifest = ({
    truckId,
    manifestId
}: {
    truckId: string;
    manifestId: string;
}) => {
    const confirm = useConfirm();
    const [trigger] = ManifestsGrpcService.useUnassignTruckFromManifestMutation();
    const trucksMap = useTrucksMap();

    return useCallback(() => {
        const truck = trucksMap[truckId];
        confirm({
            title             : 'modals:manifests.details.confirm.unassign_truck.title',
            body              : 'modals:manifests.details.confirm.unassign_truck.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: { ref: truck?.referenceId || '' }
            },
            onConfirm: () =>
                trigger({
                    manifestId
                })
        });
    }, [confirm, manifestId, trigger, truckId, trucksMap]);
};

export function UnassignTruckButton({
    truckId,
    manifestId,
    kind
}: UnassignTruckButtonProps) {
    const onClick = useUnassignTruckFromManifest({ truckId, manifestId });
    return (
        <HotKeyTooltip
            title="common:tooltips.unassign_truck"
            hot_keys="U"
        >
            <ManifestStyled.ActionButton
                onClick={onClick}
                kind={kind}
                className="error"
            >
                {kind === 'text' && (
                    <Typography
                        component="span"
                        variant="body1"
                        fontSize="12px"
                        fontWeight={500}
                    >
                        Unassign
                    </Typography>
                )}
                <CloseIcon />
            </ManifestStyled.ActionButton>
        </HotKeyTooltip>
    );
}
