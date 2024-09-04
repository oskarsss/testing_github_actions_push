import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditSettlementContext } from '../../../../EditSettlement';

type Props = {
    row: SettlementsTypes.CycleSettlementDetails.FuelTransaction;
};

export default function AmountItem({ row }: Props) {
    const { truck } = useEditSettlementContext();
    if (truck?.fuelDiscountsEnabled) {
        return <del>{row.totalAmount}</del>;
    }
    return `${row.totalAmount}`;
}
