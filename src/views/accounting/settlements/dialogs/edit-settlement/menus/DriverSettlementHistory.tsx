import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { Stack } from '@mui/material';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import EditSettlement from '../styled';
import EditSettlementIcons from '../edit-settlement-icons';
import SettlementsHistory, {
    SelectSettlementType
} from '../components/settlements-history/SettlementsHistory';

type Props = {
    selectedSettlementId: string;
    driverId: string;
    onSelect: SelectSettlementType;
};

export const useSelectStatementMenu = menuHookFabric(SelectStatementMenu);

function SelectStatementMenu({
    selectedSettlementId,
    driverId,
    onSelect
}: Props) {
    const selectStatementMenu = useSelectStatementMenu(true);
    const getSettlementsState = SettlementsGrpcService.useGetSettlementsQuery({
        driverId
    });

    const settlements = useStableArray(getSettlementsState.data?.settlements);

    const onSelectSettlement: SelectSettlementType = (settlement_id, period_id, cycle_id) => {
        onSelect(settlement_id, period_id, cycle_id);
        selectStatementMenu.close();
    };

    return (
        <Stack
            direction="column"
            flex="1 1 0"
            height="370px"
            padding="16px"
            spacing={1}
        >
            <EditSettlement.SectionHeader
                title="modals:settlements.edit_settlement.settlement_history.title"
                Icon={<EditSettlementIcons.DriverSettlementHistory />}
            />

            <SettlementsHistory
                onSelectSettlement={onSelectSettlement}
                selected_settlement_id={selectedSettlementId}
                other_settlements={settlements}
            />
        </Stack>
    );
}
