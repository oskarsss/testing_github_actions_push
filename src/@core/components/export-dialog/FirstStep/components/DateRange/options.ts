import moment from 'moment-timezone';
import { IntlMessageKey } from '@/@types/next-intl';

const format = {
    value    : 'YYYY-MM-DD',
    sub_title: 'MMM D'
};

type Option = {
    id: string;
    title: IntlMessageKey;
    sub_title: string;
    start_at: string;
    end_at: string;
};

const options: Option[] = [
    {
        id       : 'today',
        title    : 'core:export_dialog.fields.date_range.options.today',
        sub_title: moment().format(format.sub_title),
        start_at : moment().format(format.value),
        end_at   : moment().format(format.value)
    },
    {
        id       : 'last_7_days',
        title    : 'core:export_dialog.fields.date_range.options.last_7_days',
        sub_title: `${moment().subtract(7, 'days').format(format.sub_title)} - ${moment().format(
            format.sub_title
        )}`,
        start_at: moment().subtract(7, 'days').format(format.value),
        end_at  : moment().format(format.value)
    },
    {
        id       : 'current_month',
        title    : 'core:export_dialog.fields.date_range.options.current_month',
        sub_title: `${moment().startOf('month').format(format.sub_title)} - ${moment().format(
            format.sub_title
        )}`,
        start_at: moment().startOf('month').format(format.value),
        end_at  : moment().format(format.value)
    },
    {
        id       : 'last_month',
        title    : 'core:export_dialog.fields.date_range.options.last_month',
        sub_title: `${moment()
            .subtract(1, 'month')
            .startOf('month')
            .format(format.sub_title)} - ${moment()
            .subtract(1, 'month')
            .endOf('month')
            .format(format.sub_title)}`,
        start_at: moment().subtract(1, 'month').startOf('month')
            .format(format.value),
        end_at: moment().subtract(1, 'month').endOf('month')
            .format(format.value)
    },
    {
        id       : 'custom',
        title    : 'core:export_dialog.fields.date_range.options.custom',
        sub_title: '',
        start_at : '',
        end_at   : ''
    },
    {
        id       : 'all',
        title    : 'core:export_dialog.fields.date_range.options.all',
        sub_title: '',
        start_at : '',
        end_at   : ''
    }
];

export default options;
