import { TFunction } from '@/@types/next-intl';

export const textFormatter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const dateFormatter = (argDate: string, t: TFunction) => {
    const date = new Date(argDate);

    const monthNames = [
        t('common:time.month.short_name.jan'),
        t('common:time.month.short_name.feb'),
        t('common:time.month.short_name.mar'),
        t('common:time.month.short_name.apr'),
        t('common:time.month.short_name.may'),
        t('common:time.month.short_name.jun'),
        t('common:time.month.short_name.jul'),
        t('common:time.month.short_name.aug'),
        t('common:time.month.short_name.sep'),
        t('common:time.month.short_name.oct'),
        t('common:time.month.short_name.nov'),
        t('common:time.month.short_name.dec')
    ];

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const year = date.getFullYear();
    const day = date.getDate();

    return `${monthName} ${day}, ${year}`;
};

export const timeFormatter = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};
