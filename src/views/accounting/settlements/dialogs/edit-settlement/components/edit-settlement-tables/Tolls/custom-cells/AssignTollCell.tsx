import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import React from 'react';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';

type Props = {
    tollTransactionId: string;
};

export default function AssignTollCell({ tollTransactionId }: Props) {
    const [assignToll, { isLoading }] = SettlementsGrpcService.useAssignTollTransactionMutation();

    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDisabledEdit || isLoading) return;
        assignToll({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId,
            tollTransactionId
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
