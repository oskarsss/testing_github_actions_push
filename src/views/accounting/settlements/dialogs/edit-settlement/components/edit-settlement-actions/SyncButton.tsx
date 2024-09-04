/* eslint-disable max-len */
import HistoryIcon from '@mui/icons-material/History';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useEditSettlementContext } from '../../EditSettlement';
import ReusableButton from './ReusableButton';

type Props = {
    settlement_id: string;
};

export default function SyncButton({ settlement_id }: Props) {
    const {
        settlement,
        selectedSettlementParams
    } = useEditSettlementContext();

    SettlementsGrpcService.useSyncSettlementTurnOffToastQuery({
        cycleId     : selectedSettlementParams.cycle_id,
        periodId    : selectedSettlementParams.period_id,
        settlementId: selectedSettlementParams.settlement_id
    });

    const [trigger, { isLoading }] = SettlementsGrpcService.useSyncSettlementMutation();

    const syncSettlement = () => {
        trigger({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: settlement_id
        });
    };

    return (
        <ReusableButton
            onClick={syncSettlement}
            isDisabled={!settlement_id}
            isLoading={isLoading}
            label="common:button.sync"
            tooltip="common:button.sync"
            Icon={<HistoryIcon />}
            variant="outlined"
        />
    );
}
