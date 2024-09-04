/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { SettlementsActions } from '@/store/accounting/settlements/slice';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAppDispatch } from '@/store/hooks';

type Props = {
    row: SettlementsTypes.Cycles.Periods.Settlements.ConvertedSettlementRow;
};

export default function OneTimeDebitsCell({ row }: Props) {
    const dispatch = useAppDispatch();

    const onClickCell = () => {
        dispatch(SettlementsActions.ToggleTabValue('driverRecurringTransactionsInfo'));

        // dispatch(SettlementsActions.ToggleTransactionsTabValue('driverR
        // ecurringTransactionsInfo'));
    };
    return (
        <div
            style={{
                display   : 'flex',
                flex      : '1 1 100%',
                height    : '100%',
                alignItems: 'center',
                padding   : '0 15px'
            }}
            onClick={onClickCell}
        >
            {row.oneTimeDebitsAmountFormatted}
        </div>
    );
}
