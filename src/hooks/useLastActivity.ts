import moment from 'moment-timezone';
import { useMemo } from 'react';

export default function useLastActivity(
    lastPingTime?: string | Date | null | number,
    renderText?: (momentTime: moment.Moment) => {
        notAvailableText?: string;
        onlineText?: string;
        oneDayAgoText?: string;
        yesterdayText?: string;
        tooMuchTimeAgoText?: string;
    }
) {
    const {
        last_activity,
        isOnline
    } = useMemo(() => {
        const date = moment(lastPingTime || null);
        if (!date.isValid()) {
            return {
                last_activity: renderText?.(date)?.notAvailableText ?? 'Not available',
                isOnline     : false
            };
        }

        if (moment().diff(date, 'minutes') < 3) {
            return {
                last_activity: renderText?.(date)?.onlineText ?? 'Online',
                isOnline     : true
            };
        }

        if (moment().subtract(1, 'days').isBefore(date)) {
            return {
                last_activity: renderText?.(date)?.oneDayAgoText ?? `${date.toNow(true)} ago`,
                isOnline     : false
            };
        }
        if (date.isSame(moment().subtract(1, 'days'), 'day')) {
            return {
                last_activity:
                    renderText?.(date)?.yesterdayText ?? date.format('[Yesterday at] H:mm'),
                isOnline: false
            };
        }
        return {
            last_activity:
                renderText?.(date)?.tooMuchTimeAgoText ?? date.format('D MMM YYYY [at] H:mm'),
            isOnline: false
        };
    }, [lastPingTime]);

    return {
        last_activity,
        isOnline
    };
}
