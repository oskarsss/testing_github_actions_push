/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { STORAGE_BUCKET_URL } from '@/configs';
import moment from 'moment-timezone';
import type { TFunction } from '@/@types/next-intl';
import ReplaceSystemNoteConfig from './configs';

type ReplaceSystemNoteConfigType = keyof typeof ReplaceSystemNoteConfig.system;

function replaceUserSelfie(inputString: string, selfieTag: string) {
    const regex = new RegExp(`<${selfieTag}>([^<]+)<\\/${selfieTag}>`, 'g');
    return inputString.replace(
        regex,
        (match, imageUrl) =>
            `<img alt="user-selfie" width="24px" height="24px" style="border-radius:100%; margin-right: 4px; margin-left: 4px; margin-bottom: -7px" src="${
                STORAGE_BUCKET_URL + imageUrl
            }"/>`
    );
}

export function replaceFromString(inputString: string) {
    let resultString = inputString;

    if (resultString[0] !== '<') {
        const {
            match,
            replace
        } = ReplaceSystemNoteConfig.manual.ACTION_NEXT_LINE;
        return resultString.replace(match, replace);
    }

    for (const key in ReplaceSystemNoteConfig.system) {
        const {
            match,
            replace
        } =
            ReplaceSystemNoteConfig.system[key as ReplaceSystemNoteConfigType];
        resultString = resultString.replace(match, replace);
    }
    resultString = replaceUserSelfie(resultString, 's-new-user-selfie');
    resultString = replaceUserSelfie(resultString, 's-old-user-selfie');
    return resultString;
}

export function formatTime(date: string | Date, timezone: string) {
    const time = moment.utc(date).tz(timezone);

    return time.isValid() ? time.format('HH:mm A') : '';
}

// eslint-disable-next-line max-len
export function formatDate(timestamp: string, timezone: string, t: TFunction) {
    if (!timestamp) return '';
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    if (
        targetDate.getDate() === currentDate.getDate() &&
        targetDate.getMonth() === currentDate.getMonth() &&
        targetDate.getFullYear() === currentDate.getFullYear()
    ) {
        return currentDate.getMinutes() === targetDate.getMinutes() &&
            currentDate.getHours() === targetDate.getHours()
            ? t('common:just_now')?.toLowerCase()
            : formatTime(timestamp, timezone);
    }

    const daysInMilliseconds = 24 * 60 * 60 * 1000;

    const daysPassed = Math.floor(
        (currentDate.valueOf() - targetDate.valueOf()) / daysInMilliseconds
    );

    if (daysPassed < 7) {
        const daysOfWeek = [
            'common:days.short.sunday',
            'common:days.short.monday',
            'common:days.short.tuesday',
            'common:days.short.wednesday',
            'common:days.short.thursday',
            'common:days.short.friday',
            'common:days.short.saturday'
        ] as const;

        const dayOfWeek = t(daysOfWeek[targetDate.getDay()]);

        return `${dayOfWeek}, ${formatTime(timestamp, timezone)}`;
    }

    return `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
}
