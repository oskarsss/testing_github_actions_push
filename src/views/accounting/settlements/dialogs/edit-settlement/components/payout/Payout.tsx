import PayoutEmptyScreen from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutEmptyScreen';
import PayoutHeader from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutHeader';
import PayoutContent from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/content/PayoutContent';
import PayoutComponents from '@/views/accounting/settlements/dialogs/edit-settlement/components/payout/components/PayoutComponents';
import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';

export default function Payout() {
    const { payouts } = useEditSettlementContext();
    const payout = payouts?.[0];

    return (
        <EditSettlement.Row
            grow={0}
            sx={{ flexShrink: 0 }}
        >
            <PayoutComponents.Container>
                <PayoutHeader payout={payout} />
                {payout && <PayoutContent payout={payout} />}
                {!payout && <PayoutEmptyScreen />}
            </PayoutComponents.Container>
        </EditSettlement.Row>
    );
}
