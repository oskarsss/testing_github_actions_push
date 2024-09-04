import moment from 'moment-timezone';
import { TFunction } from '@/@types/next-intl';

export default function getTimeAgo(date: moment.MomentInput, t: TFunction): string {
    if (!date) return '';

    const now = moment.utc();
    const then = moment.utc(date);
    const diff = moment.duration(now.diff(then));

    const years = diff.years();
    const months = diff.months();
    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();

    if (years >= 1) {
        return t('common:time.ago.years', { years });
    }

    if (months >= 1) {
        return t('common:time.ago.months', { months });
    }

    if (days >= 1) {
        return t('common:time.ago.days', { days });
    }

    if (hours >= 1) {
        return t('common:time.ago.hours', { hours });
    }

    if (minutes >= 1) {
        return t('common:time.ago.minutes', { minutes });
    }

    return t('common:time.ago.seconds', { seconds });
}
