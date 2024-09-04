import { useSendSettlementDialog } from '@/views/accounting/settlements/dialogs/send-settlement/SendSettlement';
import SendIcon from '@mui/icons-material/Send';
import type SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditSettlementContext } from '../../EditSettlement';
import ReusableButton from './ReusableButton';

type Props = {
    settlement: SettlementsTypes.CycleSettlementDetails.Settlement;
};

export default function SendSettlementButton({ settlement }: Props) {
    const sendSettlementDialog = useSendSettlementDialog();
    const { selectedSettlementParams } = useEditSettlementContext();

    const openSendSettlementDialog = () =>
        sendSettlementDialog.open({
            settlement,
            cycle_id : selectedSettlementParams.cycle_id,
            period_id: selectedSettlementParams.period_id
        });

    return (
        <ReusableButton
            onClick={openSendSettlementDialog}
            isDisabled={false}
            isLoading={false}
            label="common:button.send"
            tooltip="common:button.send"
            Icon={<SendIcon />}
        />
    );
}
