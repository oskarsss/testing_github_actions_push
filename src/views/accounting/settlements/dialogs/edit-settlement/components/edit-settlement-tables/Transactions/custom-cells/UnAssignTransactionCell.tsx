import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import React from 'react';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import SettlementTransactionsGrpcService from '@/@grpcServices/services/settlements-service/settlement-transactions.service';

type Props = {
    transactionId: string;
};

export default function UnAssignTransactionCell({ transactionId }: Props) {
    const [unassignTransaction, { isLoading }] =
        SettlementTransactionsGrpcService.useSettlementTransactionUnassignMutation();

    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isDisabledEdit || isLoading) return;
        unassignTransaction({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId,
            transactionId
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
