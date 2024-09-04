import moment from 'moment-timezone';
import type { TFunction } from '@/@types/next-intl';

// eslint-disable-next-line import/prefer-default-export,max-len
export const getDateRange = (
    start: string | null,
    end: string | null,
    location_timezone: string | undefined | null,
    t: TFunction
): string => {
    const default_date = '';
    const format_time = 'HH:mm';
    const format_date = 'MMM D';

    if (!start && !end) return default_date;

    const tz1 = moment(start);
    const tz2 = moment(end);

    const getFormattedDate = (data: moment.Moment, no_timezone?: boolean) => {
        const date = data.clone().format(format_date);
        const time = data.clone().format(format_time);
        return `${date}, ${t('common:time.time')}${time} ${no_timezone ? '' : location_timezone}`;
    };

    if (!tz1.isValid() && !tz2.isValid()) return default_date;
    if (!tz1.isValid() || !tz2.isValid()) {
        if (!tz1.isValid()) {
            return getFormattedDate(tz2);
        }
        return getFormattedDate(tz1);
    }

    if (tz1.isSame(tz2)) {
        return getFormattedDate(tz1);
    }

    if (tz1.isSame(tz2, 'day')) {
        return `${tz1.format(format_date)}, ${t('common:time.time')}${tz1.format(
            format_time
        )} - ${tz2.format(format_time)} ${location_timezone}`;
    }

    if (tz1.isSame(tz2, 'year') && tz1.isSame(tz2, 'month')) {
        if (tz1.format(format_time) === tz2.format(format_time)) {
            return `${tz1.format('MM')}/${tz1.format('DD')}-${tz2.format('DD')} ${t(
                'common:time.time'
            )}${tz2.format(format_time)} ${location_timezone}`;
        }
    }

    return `${getFormattedDate(tz1, true)} - ${getFormattedDate(tz2)}`;
};
