import { SettlementsActions } from '@/store/accounting/settlements/slice';
import { useAppDispatch } from '@/store/hooks';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { Settlements_Cycle_Period_Settlement_Trend_Entity } from '@proto/models/model_settlement';
import Trend from './Trends/Trend';

type Props = {
    row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
    rowHeight: number;
};

export default function FuelCell({
    row,
    rowHeight
}: Props) {
    const dispatch = useAppDispatch();

    const onClickCell = () => {
        dispatch(SettlementsActions.ToggleTabValue('fuelInfo'));
    };

    const trend =
        row.trends[
            Settlements_Cycle_Period_Settlement_Trend_Entity.SETTLEMENT_TREND_ENTITY_FUEL_AMOUNT
        ];

    return (
        <Trend
            rowHeight={rowHeight}
            onClickCell={onClickCell}
            amount={row.fuelAmountFormatted}
            percent={trend?.amountPercentage}
            amountTrend={trend?.amountTrend}
        />
    );
}
