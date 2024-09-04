import SettlementsTypes from '@/store/accounting/settlements/types';
import CycleSelectNoCycle from './CycleSelectNoCycle';
import CycleSelectItem from './CycleSelectItem';

type Props = {
    cycles: SettlementsTypes.Cycles.Cycle[];
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEdit: (cycle_id?: string) => void;
    onClose: () => void;
};

export default function CycleSelectList({
    cycles,
    onViewDrivers,
    onViewCycle,
    onEdit,
    onClose
}: Props) {
    if (!cycles.length) {
        return <CycleSelectNoCycle />;
    }

    return cycles.map((cycle) => (
        <CycleSelectItem
            key={cycle.cycleId}
            cycle={cycle}
            onViewDrivers={onViewDrivers}
            onViewCycle={onViewCycle}
            onEdit={onEdit}
            onClose={onClose}
        />
    ));
}
