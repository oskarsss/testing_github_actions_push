import moment from 'moment-timezone';
import { DateRange } from '@mui/x-date-pickers-pro';

export type ValueType = DateRange<moment.Moment>;

export type PeriodDateType = {
    start_date: string;
    end_date: string;
};
