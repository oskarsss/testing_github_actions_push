import { useMemo } from 'react';
import LoadItem from '@/views/map/left_panel/tabs/loads/LoadItem';
import { useAppSelector } from '@/store/hooks';
import { useMapLoads } from '@/views/map/hooks/loads';
import * as React from 'react';
import EmptyScreen from '@/views/map/left_panel/tabs/loads/EmptyScreen';
import Loading from '@/@core/components/page/Loading';
import ErrorDetailsPage from '@/@core/components/page/ErrorDetailsPage';
import { getApiErrorMessage } from '@/store/helpers';

export default function Loads() {
    const {
        loads,
        isLoading
    } = useMapLoads();
    const search = useAppSelector((state) => state.map.search.loads);

    const filteredLoads = useMemo(() => {
        const serializedSearch = search?.trim().toLowerCase();
        if (!serializedSearch) {
            return loads;
        }

        return loads.filter((load) => {
            const firstStop = load.firstOrderStop;
            const lastStop = load.lastOrderStop;
            return `${load.referenceId} ${load.broker_short_name || ''} ${load.friendlyId || ''} ${
                firstStop?.location?.city || ''
            } ${lastStop?.location?.city || ''}`
                .toLowerCase()
                .includes(serializedSearch);
        });
    }, [search, loads]);

    if (isLoading) {
        return <Loading />;
    }

    // if (isError) {
    //     return (
    //         <ErrorDetailsPage
    //             buttonText="common:button.reload"
    //             onClick={refetch}
    //             error={getApiErrorMessage(error)}
    //         />
    //     );
    // }

    if (!filteredLoads?.length) {
        return <EmptyScreen />;
    }

    return (
        <>
            {filteredLoads.map((load) => (
                <LoadItem
                    load={load}
                    key={load.loadId}
                />
            ))}
        </>
    );
}
