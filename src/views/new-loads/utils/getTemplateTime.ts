import moment from 'moment-timezone';
import DraftsTypes from '@/store/drafts/types';
import type { TFunction } from '@/@types/next-intl';

const unitsTranslate = {
    year   : 'common:units.year',
    years  : 'common:units.years',
    month  : 'common:units.month',
    months : 'common:units.months',
    day    : 'common:units.day',
    days   : 'common:units.days',
    minute : 'common:units.minute',
    minutes: 'common:units.minutes',
    hour   : 'common:units.hour',
    hours  : 'common:units.hours'
} as const;

export const convertMomentToUnix = (time: string) => {
    if (!time) return 0;
    const momentObj = moment(moment(time).format('YYYY-MM-DD HH:mm:ss'));
    return momentObj.unix();
};

const getTemplateTime = (stops: DraftsTypes.Stops, t: TFunction) => {
    if (stops?.length) {
        const times = stops
            .map((stop) => {
                if (stop.fixedAppointment) return convertMomentToUnix(stop.appointmentStartAt);
                return convertMomentToUnix(stop.appointmentEndAt);
            })
            .filter((time) => time);
        if (times.length > 1) {
            const time = times[times.length - 1] - times[0];
            if (time <= 0) return t('new_loads:errors.appointment_times');

            const duration = moment.duration(time, 'seconds');
            const years = duration.years();
            const days = duration.days();
            const months = duration.months();
            const hours = duration.hours();
            const minutes = duration.minutes();

            const getTranslate = (key: keyof typeof unitsTranslate) =>
                t(unitsTranslate[key]).toLowerCase();

            const timeArr = [];
            if (years === 1) timeArr.push(`${years} ${getTranslate('year')}`);
            if (years > 1) timeArr.push(`${years} ${getTranslate('years')}`);
            if (months === 1) timeArr.push(`${months} ${getTranslate('month')}`);
            if (months > 1) timeArr.push(`${months} ${getTranslate('months')}`);
            if (days === 1) timeArr.push(`${days} ${getTranslate('day')}`);
            if (days > 1) timeArr.push(`${days} ${getTranslate('days')}`);
            if (hours === 1) timeArr.push(`${hours} ${getTranslate('hour')}`);
            if (hours > 1) timeArr.push(`${hours} ${getTranslate('hours')}`);
            if (minutes === 1) timeArr.push(`${minutes} ${getTranslate('minute')}`);
            if (minutes > 1) timeArr.push(`${minutes} ${getTranslate('minutes')}`);
            return timeArr.join(', ');
        }
    }
    return t('new_loads:errors.appointment_times');
};

export default getTemplateTime;
