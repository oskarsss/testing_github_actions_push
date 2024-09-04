import * as yup from 'yup';
import moment from 'moment-timezone';
import { formatDateTimeToUnix } from '@/utils/formatting';

export type DefaultValues = {
    truck_id: string;
    trailer_id: string;
    amount: number;
    source: string;
    toll_agency: string;
    posting_date: string;
    entry_datetime: string | null;
    exit_datetime: string;
    entry_plaza: string;
    transponder_number: string;
    reference_id: string;
    exit_plaza: string;
};

export const default_values: DefaultValues = {
    truck_id          : '',
    trailer_id        : '',
    amount            : 0,
    posting_date      : '',
    source            : '',
    toll_agency       : '',
    entry_datetime    : '',
    exit_datetime     : '',
    entry_plaza       : '',
    transponder_number: '',
    reference_id      : '',
    exit_plaza        : ''
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    truck_id    : yup.string().defined(),
    trailer_id  : yup.string().defined(),
    amount      : yup.number().defined(),
    source      : yup.string().defined(),
    toll_agency : yup.string().defined(),
    posting_date: yup
        .string()
        .test('posting_date_test', 'Invalid date', (value) => moment(value).isValid())
        .defined(),
    entry_datetime: yup.string().nullable().defined(),
    exit_datetime : yup
        .string()
        .nullable()
        .test(
            'exit_datetime_test',
            'Exit Date & Time is required',
            (value) => formatDateTimeToUnix(value) > 0
        )
        .required('Exit Date & Time is required'),
    entry_plaza       : yup.string().defined(),
    exit_plaza        : yup.string().defined(),
    transponder_number: yup.string().defined(),
    reference_id      : yup.string().defined()
});
