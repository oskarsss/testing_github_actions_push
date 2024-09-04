import { GetLoadsRequest_SortBy, LoadData_Load } from '@proto/loads';
import { useMemo } from 'react';
import useOrderStops from './useOrderStops';

const acceptedSort = [GetLoadsRequest_SortBy.LATEST, GetLoadsRequest_SortBy.OLDEST];

export const useIsFirstOfPeriodOrdersRow = (
    row: LoadData_Load,
    index: number,
    indexes: Record<string, string[]>,
    sortBy: GetLoadsRequest_SortBy
) => {
    const stops = useOrderStops(row);

    const isFirstOfPeriod = useMemo(() => {
        if (!row || !acceptedSort.includes(sortBy)) return false;
        const firstStopAppointmentStartAt = stops[0]?.appointmentStartAtLocal;
        if (!firstStopAppointmentStartAt) return false;
        const key = firstStopAppointmentStartAt.split(' ')[0];
        const arr = indexes[key];
        if (!arr) return false;
        return arr.findIndex((id) => id === row.loadId) === 0;
    }, [row, sortBy, stops, indexes]);

    const firstStopAppointmentDate = useMemo(() => stops[0]?.appointmentStartAtLocal, [stops]);

    const countItems = useMemo(
        () => indexes[firstStopAppointmentDate?.split(' ')[0]]?.length || 0,
        [indexes, firstStopAppointmentDate]
    );
    return { isFirstOfPeriod, firstStopAppointmentDate, countItems };
};
