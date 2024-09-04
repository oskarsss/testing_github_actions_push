import { ItemPaper } from '@/views/map/styled_components';
import ScheduleTruck from '@/views/dispatch/scheduling/components/Table/components/truck/Truck';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRef } from 'react';
import { useScrollContext } from '@/views/map/contexts/ScrollContext';
import { useScrollList } from '@/views/map/hooks/scrollList';
import { MapActions } from '@/store/map/slice';
import { useRouter } from 'next/router';
import Scheduling from '@/store/dispatch/scheduling/types';

type Props = {
    truck: Scheduling.TruckManifestRow;
};

export default function TruckItem({ truck }: Props) {
    const dispatch = useAppDispatch();
    const selected = useAppSelector((state) => state.map.selected.truck_id === truck.truckId);

    const paperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scrollRef = useScrollContext();

    useScrollList(scrollRef?.current, paperRef.current, selected);

    return (
        <ItemPaper
            elevation={0}
            ref={paperRef}
            style={{ padding: 0 }}
            onClick={(e) => {
                if (!selected) {
                    // router.push({
                    //     query: {
                    //         ...router.query,
                    //         selectedItem: JSON.stringify({
                    //             itemId: truck.truckId,
                    //             entity: 'truck'
                    //         })
                    //     }
                    // });

                    dispatch(MapActions.updateSelected({ truck_id: truck.truckId }));
                    return;
                }

                dispatch(MapActions.updateSelected({ truck_id: '', load_id: '' }));

                // const updQuery = { ...router.query };
                // delete updQuery.selectedItem;
                // router.push({
                //     query: updQuery
                // });
            }}
        >
            <ScheduleTruck
                location_only_truck
                truck={truck}
                style={{ backgroundColor: selected ? '#3c7eff22' : 'transparent', padding: '12px' }}
            />
        </ItemPaper>
    );
}
