import moment from 'moment-timezone';
import { ValueType } from '@/@core/ui-kits/basic/date-range/types';
import { IntlMessageKey } from '@/@types/next-intl';

export interface IShortcutsItem {
    label: IntlMessageKey;
    getValue: (nowDate?: moment.Moment | null) => ValueType;
    is_period?: boolean;
    is_reset?: boolean;
}
const shortcutsItem: IShortcutsItem[] = [
    {
        label   : 'common:days.today',
        getValue: () => [moment().startOf('day'), moment().endOf('day')]
    },
    {
        label   : 'common:days.yesterday',
        getValue: () => [
            moment().subtract(1, 'day').startOf('day'),
            moment().subtract(1, 'day').endOf('day')
        ]
    },
    {
        label   : 'core:basic.date_range.shortcuts.this_week',
        getValue: () => [moment().startOf('week'), moment().endOf('week')]
    },
    {
        label   : 'core:basic.date_range.shortcuts.last_7_days',
        getValue: () => [moment().subtract(7, 'day').startOf('day'), moment().endOf('day')]
    },
    {
        label   : 'core:basic.date_range.shortcuts.last_week',
        getValue: () => {
            const start = moment().subtract(1, 'week').startOf('week');
            const end = moment().subtract(1, 'week').endOf('week');
            return [start, end];
        }
    },
    {
        label   : 'core:basic.date_range.shortcuts.this_month',
        getValue: () => [moment().startOf('month'), moment().endOf('month')]
    },
    {
        label   : 'core:basic.date_range.shortcuts.last_month',
        getValue: () => {
            const start = moment().subtract(1, 'month').startOf('month');
            const end = moment().subtract(1, 'month').endOf('month');
            return [start, end];
        }
    },
    {
        label   : 'core:basic.date_range.shortcuts.reset',
        getValue: () => [null, null]
    }
];
export default shortcutsItem;
