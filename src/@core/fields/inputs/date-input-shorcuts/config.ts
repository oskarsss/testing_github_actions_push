import moment from 'moment-timezone';
import { TFunction } from '@/@types/next-intl';

type GetShortcutsItem = (
    value: string | null,
    t: TFunction
) => {
    label: string;
    getValue: () => moment.Moment;
}[];

const getShortcutsItem: GetShortcutsItem = (value, t) => {
    const currentValue = value ? moment.utc(value) : moment();
    const hours = currentValue.hours();
    const minutes = currentValue.minutes();

    const currentDay = moment().startOf('day').add(hours, 'hours')
        .add(minutes, 'minutes');

    return [
        {
            label   : t('common:days.day_after_tomorrow'),
            getValue: () => currentDay.clone().add(2, 'days')
        },
        {
            label   : t('common:days.tomorrow'),
            getValue: () => currentDay.clone().add(1, 'days')
        },
        {
            label   : t('common:days.today'),
            getValue: () => currentDay.clone()
        },
        {
            label   : t('common:days.yesterday'),
            getValue: () => currentDay.clone().subtract(1, 'days')
        },
        {
            label   : t('common:days.day_before_yesterday'),
            getValue: () => currentDay.clone().subtract(2, 'days')
        }
    ];
};

export default getShortcutsItem;
