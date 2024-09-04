import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { MouseEvent } from 'react';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';

type Props = {
    fuelTransactionId: string;
};

export default function UnAssignFuelCell({ fuelTransactionId }: Props) {
    const [removeFuel, { isLoading }] =
        SettlementsGrpcService.endpoints.unassignFuelTransaction.useMutation();

    const {
        settlement,
        selectedSettlementParams,
        isDisabledEdit
    } = useEditSettlementContext();

    const onClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (isDisabledEdit || isLoading) return;
        removeFuel({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement.settlementId,
            fuelTransactionId
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
