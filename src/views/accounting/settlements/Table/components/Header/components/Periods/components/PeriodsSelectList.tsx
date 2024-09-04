import SettlementsTypes from '@/store/accounting/settlements/types';
import PeriodsSelectNoPeriods from './PeriodsSelectNoPeriods';
import PeriodsSelectItem from './PeriodsSelectItem';

type Props = {
    periods: SettlementsTypes.Cycles.Periods.Period[];
    onEditDialog: (period_id: string, start_datetime: string, end_datetime: string) => void;
    onClose: () => void;
    cycleId: string;
    periodId: string;
};

export default function PeriodsSelectList({
    periods,
    cycleId,
    periodId,
    onEditDialog,
    onClose
}: Props) {
    if (!periods.length) {
        return <PeriodsSelectNoPeriods />;
    }

    return periods.map((period) => (
        <PeriodsSelectItem
            key={period.periodId}
            period={period}
            onEditDialog={onEditDialog}
            onClose={onClose}
            cycleId={cycleId}
            periodId={periodId}
        />
    ));
}
