import { SettlementsActions } from '@/store/accounting/settlements/slice';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAppDispatch } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Settlements_Cycle_Period_Settlement_Trend_Entity } from '@proto/models/model_settlement';
import Trend from './Trends/Trend';

type Props = {
    row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
    rowHeight: number;
};

export default function LoadsCell({
    row,
    rowHeight
}: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const onClickCell = () => {
        dispatch(SettlementsActions.ToggleTabValue('manifestsInfo'));
    };

    const trend =
        row.trends[
            Settlements_Cycle_Period_Settlement_Trend_Entity
                .SETTLEMENT_TREND_ENTITY_TOTAL_LOADS_AMOUNT
        ];

    return (
        <Trend
            rowHeight={rowHeight}
            onClickCell={onClickCell}
            amount={row.totalLoadsAmountFormatted}
            percent={trend?.amountPercentage}
            amountTrend={trend?.amountTrend}
            info={`${row.avgRpmFormatted} ${t('columns:rpm')}`}
        />
    );
}
