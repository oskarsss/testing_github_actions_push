import moment from 'moment-timezone';
import { TFunction } from '@/@types/next-intl';

export function getTime(date: string, t: TFunction) {
    if (!date) return '';

    const now = moment.utc();
    const then = moment.utc(date);
    const diff = moment.duration(now.diff(then));

    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();

    if (days >= 1) {
        if (days === 1) {
            return t('core:basic.load.documents.time.day_ago', { days });
        }
        return `${then.format('MM/DD')} • ${then.format('H:mm')}`;
    }

    if (hours >= 1) {
        return t('core:basic.load.documents.time.hours_ago', { hours });
    }

    if (minutes > 1) {
        return t('core:basic.load.documents.time.minutes_ago', { minutes });
    }
    return t('common:just_now').toLowerCase();
}
