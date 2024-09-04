import moment from 'moment-timezone';

export type DefaultValues = {
    start_at: string;
    end_at: string;
    description: string;
};
export const formattingDate = (date: string) => moment.utc(date).format('YYYY-MM-DD');
export const default_values: DefaultValues = {
    start_at   : moment().startOf('week').format('YYYY-MM-DD'),
    end_at     : moment().endOf('week').format('YYYY-MM-DD'),
    description: ''
};
