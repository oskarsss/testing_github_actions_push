import parsePhoneNumber from 'libphonenumber-js';
import moment from 'moment-timezone';
import type { TFunction } from '@/@types/next-intl';

export const formatAmount = (value: string | number = 0) => {
    const parts = value.toString().split('.');
    const numberPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1].padEnd(2, '0')}` : '.00';
    const thousands = /\B(?=(\d{3})+(?!\d))/g;

    return `$${numberPart.replace(thousands, ',')}${decimalPart}`;
};

export function milesToKilometers(miles: number): number {
    const kilometers = miles * 1.60934;
    return parseFloat(kilometers.toFixed(2));
}

export const formatMiles = (value: string | number = 0) => {
    const parts = value.toString().split('.');
    const numberPart = parts[0];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;

    return numberPart.replace(thousands, ',');
};

export const formatPhoneNumber = (phoneNumberString: string) => {
    if (!phoneNumberString) {
        return phoneNumberString;
    }
    let phone_number = phoneNumberString.replace(/\D/g, '');
    if (phone_number.slice(0, 1) === '1') {
        phone_number = phone_number.substring(1);
    }
    if (phone_number.slice(0, 1) === '3' && phone_number.length === 12) {
        phone_number = phone_number.substring(2);
    }
    if (phone_number.slice(0, 1) === '0') {
        phone_number = `+38${phone_number}`;
    } else {
        phone_number = `+1${phone_number}`;
    }
    const parsed_phone_number = parsePhoneNumber(phone_number);
    if (parsed_phone_number) {
        if (parsed_phone_number.country === 'UA') {
            return parsed_phone_number.formatInternational();
        }
        return `${parsed_phone_number.formatNational()}`;
    }
    return phoneNumberString;
};

export const formatHours = (data: string) => {
    const newDate = new Date(data);
    return newDate.toLocaleTimeString('en-US', {
        hour  : 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

export function formatMinutes(minutes: number, t: TFunction): string {
    const days = Math.floor(minutes / 1440);

    const hours = Math.floor((minutes % 1440) / 60);

    if (days > 30) {
        return t('common:not_provided');
    }
    if (days > 0) {
        return `${days}${t('common:time.short.d')} ${hours}${t('common:time.short.h')}`;
    }

    if (hours > 0) {
        return `${hours}${t('common:time.short.h')}`;
    }
    if (hours === 0) {
        return `${minutes} ${t('common:time.short.min')}`;
    }
    if (days === 0) {
        return `${minutes} ${t('common:time.short.min')}`;
    }

    return '';
}

export const numberWithCommas = (data: number | string) =>
    data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function formatDateTimeToUnix(date?: moment.MomentInput) {
    return date && moment(date).isValid() ? moment.utc(date).valueOf() : 0;
}

export function formatAmountFormattingToNumber(value: string) {
    // "$55,544.3" => 55544.3
    return parseFloat(value.replace(/[^0-9.-]+/g, ''));
}

export function formatCardNumber(cardNumber: string) {
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
}
