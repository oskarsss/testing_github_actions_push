import moment from 'moment-timezone';
import { TFunction } from '@/@types/next-intl';

export const latestActivity = (timestamp: number | string, t: TFunction) => {
    if (!timestamp) return t('common:not_available');
    const now = moment();
    const lastActivity = moment(timestamp);
    const minutesAgo = now.diff(lastActivity, 'minutes');

    if (minutesAgo < 3) {
        return t('common:online')?.toLowerCase();
    }
    if (minutesAgo < 60) {
        // return `last seen ${minutesAgo} minutes ago`;
        return t('core:basic.page_headers.avatars.times.last_seen_minutes', {
            minutes: minutesAgo
        });
    }
    if (now.isSame(lastActivity, 'day')) {
        const hoursAgo = Math.floor(minutesAgo / 60);

        // return `last seen ${hoursAgo} hours ago`;
        return t('core:basic.page_headers.avatars.times.last_seen_hours', {
            hours: hoursAgo
        });
    }
    if (now.subtract(1, 'day').isSame(lastActivity, 'day')) {
        // return `last seen yesterday at ${lastActivity.format('h:mm A')}`;
        return t('core:basic.page_headers.avatars.times.last_seen_yesterday', {
            date: lastActivity.format('h:mm A')
        });
    }

    // return `last seen ${lastActivity.format('MM/DD/YY')}`;
    return t('core:basic.page_headers.avatars.times.last_seen', {
        date: lastActivity.format('MM/DD/YY')
    });
};
