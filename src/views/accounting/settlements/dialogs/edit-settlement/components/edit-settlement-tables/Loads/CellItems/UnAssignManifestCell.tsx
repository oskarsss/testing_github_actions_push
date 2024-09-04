import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import React from 'react';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';

type Props = {
    manifestId: string;
};

export default function UnAssignManifestCell({ manifestId }: Props) {
    const [unassignManifest, { isLoading }] = SettlementsGrpcService.useUnassignManifestMutation();

    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDisabledEdit || isLoading) return;
        unassignManifest({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId,
            manifestId
        });
    };

    return (
        <EditSettlementIcons.Buttons.ButtonWrapper onClick={onClick}>
            <EditSettlementIcons.Buttons.Unassign
                disabled={isDisabledEdit}
                isLoading={isLoading}
            />
        </EditSettlementIcons.Buttons.ButtonWrapper>
    );
}
