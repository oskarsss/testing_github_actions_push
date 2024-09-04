import { SettlementsActions } from '@/store/accounting/settlements/slice';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';
import { Settlements_Cycle_Period_Settlement_Trend_Entity } from '@proto/models/model_settlement';
import Trend from './Trends/Trend';

type Props = {
    row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
    rowHeight: number;
};

export default function TollsCell({
    row,
    rowHeight
}: Props) {
    const dispatch = useAppDispatch();

    const onClickCell = () => {
        dispatch(SettlementsActions.ToggleTabValue('tollsInfo'));
    };

    const trend =
        row.trends[
            Settlements_Cycle_Period_Settlement_Trend_Entity.SETTLEMENT_TREND_ENTITY_TOLLS_AMOUNT
        ];

    return (
        <Trend
            rowHeight={rowHeight}
            onClickCell={onClickCell}
            amount={row.tollsAmountFormatted}
            percent={trend?.amountPercentage}
            amountTrend={trend?.amountTrend}
        />
    );
}
