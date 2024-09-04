import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';

export default function useTabQuery(
    defaultViewId: DETAILS_TABS_IDS,
    activeViewId: DETAILS_TABS_IDS
) {
    const router = useRouter();
    const currentQuery = useMemo(() => ({ ...router.query }), [router.query]);

    const setTab = (tab_id: DETAILS_TABS_IDS) => {
        router.push(
            {
                query: {
                    id: router.query.id,
                    ...(tab_id !== defaultViewId && { tab_id })
                }
            },
            undefined,
            { shallow: true }
        );
    };

    useEffect(() => {
        if (router.isReady && currentQuery.tab_id === activeViewId) {
            setTab(activeViewId);
        }
    }, []);

    const tab_id = currentQuery.tab_id as DETAILS_TABS_IDS;

    return { tab_id, setTab };
}
