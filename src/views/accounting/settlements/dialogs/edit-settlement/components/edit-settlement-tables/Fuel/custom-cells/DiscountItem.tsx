import SettlementsTypes from '@/store/accounting/settlements/types';
import { useEditSettlementContext } from '../../../../EditSettlement';

type Props = {
    row: SettlementsTypes.CycleSettlementDetails.FuelTransaction;
};

export default function DiscountItem({ row }: Props) {
    const { truck } = useEditSettlementContext();
    if (truck?.fuelDiscountsEnabled === false) {
        return <del>{row.totalDiscountedAmount}</del>;
    }
    return `${row.totalDiscountedAmount}`;
}
