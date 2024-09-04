import React, { useEffect, useMemo, useState } from 'react';
import Cycle from '@/views/settings/tabs/Settlements/Cycles/components/Cycle/Cycle';
import MyContext from '@/views/settings/context';
import { useCycles } from '@/store/accounting/settlements/hooks/settlements';
import NoCycle from '@/views/settings/tabs/Settlements/Cycles/components/Cycle/NoCycle/NoCycle';
import Header from './components/Header/Header';
import Skeleton from './components/Skeletons/Skeletons';

export enum VIEW_NAME {
    ACTIVE = 'Active',
    DEACTIVATED = 'Deactivated'
}

const VIEWS = [
    {
        view_id: '0',
        name   : VIEW_NAME.ACTIVE,
        deleted: false
    },
    {
        view_id: '1',
        deleted: true,
        name   : VIEW_NAME.DEACTIVATED
    }
];

export default function Cycles() {
    const myContext = React.useContext(MyContext);
    const [selectedView, setSelectedView] = useState('0');

    const {
        cycles,
        isLoading
    } = useCycles();

    const visibleCycles = useMemo(
        () => cycles.filter((cycle) => cycle.deleted === VIEWS[Number(selectedView)].deleted),
        [cycles, selectedView]
    );

    useEffect(() => {
        if (myContext.updateScroll) myContext.updateScroll();
    }, [visibleCycles, cycles]);

    if (isLoading) {
        return <Skeleton />;
    }

    if (!cycles && !isLoading) {
        return <NoCycle view_name={VIEWS[Number(selectedView)].name} />;
    }

    return (
        <>
            <Header
                setSelectedView={(id: string) => setSelectedView(id)}
                selectedView={selectedView}
                views={VIEWS}
            />
            {visibleCycles.length > 0 &&
                visibleCycles.map((cycle) => (
                    <Cycle
                        key={cycle.cycleId}
                        cycle={cycle}
                    />
                ))}
            {(!isLoading || !cycles) && visibleCycles.length === 0 && (
                <NoCycle view_name={VIEWS[Number(selectedView)].name} />
            )}
        </>
    );
}
