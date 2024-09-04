import moment from 'moment-timezone';

export const defaultSearchOptions = {
    period_id : 'now',
    periodDays: 7,
    from_date : moment().subtract(1, 'day').format('YYYY-MM-DD'),
    end_date  : moment().add(5, 'days').format('YYYY-MM-DD')
};
