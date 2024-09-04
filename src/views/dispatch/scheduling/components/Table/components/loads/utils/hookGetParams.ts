import Scheduling from '@/store/dispatch/scheduling/types';
import { useAppSelector } from '@/store/hooks';
import { useAccountCompanies } from '@/store/app/hooks';
import { useCallback } from 'react';
import moment from 'moment-timezone';
import { Params } from '@/views/dispatch/scheduling/components/Table/types';

type PropsCallBack = {
    startAt: string;
    endAt: string;
    manifest?: Scheduling.TruckManifestRow['manifests'][0];
    time_off?: Scheduling.TimeOffType;
};
export const useGetParams = (widthOneMin: number) => {
    const {
        from_date,
        end_date,
        periodDays
    } = useAppSelector(
        (state) => state.scheduling.search_options
    );

    const { timezone } = useAccountCompanies();
    return useCallback(
        ({
            startAt,
            endAt,
            manifest,
            time_off
        }: PropsCallBack) => {
            if (!startAt || !endAt) return null;
            const fromDate = moment.tz(from_date, timezone).startOf('day');
            const endDate = moment.tz(end_date, timezone).endOf('day');

            const start_time = moment.tz(startAt, timezone);
            const end_time = moment.tz(endAt, timezone);

            const diffDaysBetweenStartAndEnd = end_time.diff(start_time, 'days');

            const params: Params = {
                id         : '',
                diffMinutes: end_time.diff(start_time, 'minutes'),
                width      : 0,
                position   : {
                    left : 0,
                    right: null
                }
            };

            if (manifest) {
                params.manifest = manifest;
                params.id = manifest.manifestId;
            } else if (time_off) {
                params.time_off = time_off;
                params.id = time_off.id;
            } else {
                return null;
            }

            params.width = end_time.diff(start_time, 'minutes') * widthOneMin;
            params.position.left = start_time.diff(fromDate, 'minutes') * widthOneMin;

            const diffEndAtWithLastDay = endDate.diff(end_time, 'minutes');
            const diffStartAtWithFirstDay = start_time.diff(fromDate, 'minutes');

            // if the number of load days exceeds the visible area.
            if (diffDaysBetweenStartAndEnd > periodDays) {
                // We set it to the maximum visible width.
                params.width = periodDays * 24 * 60 * widthOneMin;

                if (diffEndAtWithLastDay <= 0 && diffStartAtWithFirstDay <= 0) {
                    // if it extends beyond the left and right side of visibility
                    // We use the overWidth prop to remove indicators from the load
                    // on the left and right as the border of the cargo.
                    params.position.left = 0;
                    params.overWidth = true;
                } else if (diffStartAtWithFirstDay <= 0) {
                    // if it goes beyond the left side of visibility,
                    // we create a new time for it so that when hovering
                    // the entire load will be visible
                    const newTimeStartAt = end_time.clone().subtract(periodDays, 'days');
                    params.position.left = newTimeStartAt.diff(fromDate, 'minutes') * widthOneMin;
                } else if (diffEndAtWithLastDay <= 0) {
                    // if it goes beyond the right side of visibility,
                    // we create a new time for it so that when hovering
                    // the entire load will be visible
                    const newTimeEndAt = start_time.clone().add(periodDays, 'days');
                    params.position.right = endDate.diff(newTimeEndAt, 'minutes') * widthOneMin;
                }
            } else if (diffEndAtWithLastDay <= 0) {
                // position of the load if it protrudes beyond the right visible area
                params.position.right = diffEndAtWithLastDay * widthOneMin;
            }

            return params;
        },
        [from_date, timezone, end_date, widthOneMin, periodDays]
    );
};
