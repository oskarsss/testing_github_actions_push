import SettlementsTypes from '@/store/accounting/settlements/types';
import CyclesSelectItem from './CyclesSelectItem';
import NoCycles from './CyclesSelectNoCycle';

type Props = {
    cycles: SettlementsTypes.Cycles.Cycle[];
    onViewDrivers: () => void;
    onViewCycle: () => void;
    onEdit: (cycle_id?: string) => void;
    onClose: () => void;
};

export default function CyclesSelectList({
    cycles,
    onViewDrivers,
    onViewCycle,
    onEdit,
    onClose
}: Props) {
    if (!cycles.length) {
        return <NoCycles />;
    }

    return cycles.map((cycle) => (
        <CyclesSelectItem
            key={cycle.cycleId}
            cycle={cycle}
            onViewDrivers={onViewDrivers}
            onViewCycle={onViewCycle}
            onEdit={onEdit}
            onClose={onClose}
        />
    ));
}
