import { getArchivedManifestsThunk } from '@/store/dispatch/manifests/actions/api';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { useAppDispatch } from '@/store/hooks';
import moment from 'moment-timezone';
import { useEffect } from 'react';

export default function ArchiveListener() {
    const { selected_filters } = useManifestsFilters();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const liveModeBorderDate = moment().subtract(45, 'days').startOf('day');
        if (moment(selected_filters.start_at).isBefore(liveModeBorderDate)) {
            dispatch(getArchivedManifestsThunk({ autoSelectManifest: true }));
        }
    }, [selected_filters.start_at]);

    return null;
}
