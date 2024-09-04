import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import React from 'react';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';

type Props = {
    manifestId: string;
};

export default function AssignManifestCell({ manifestId }: Props) {
    const [assignManifest, { isLoading }] = SettlementsGrpcService.useAssignManifestMutation();

    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDisabledEdit || isLoading) return;
        assignManifest({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId,
            manifestId
        });
    };

    return (
        <EditSettlementIcons.Buttons.ButtonWrapper onClick={onClick}>
            <EditSettlementIcons.Buttons.Assign
                disabled={isDisabledEdit}
                isLoading={isLoading}
            />
        </EditSettlementIcons.Buttons.ButtonWrapper>
    );
}
