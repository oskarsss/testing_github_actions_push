import { SettlementCyclePeriodCreateRequest } from '@proto/settlement.cycle.period';
import * as yup from 'yup';
import moment from 'moment-timezone';

export type DefaultValues = Omit<SettlementCyclePeriodCreateRequest, 'cycleId'>;

const defaultValues: DefaultValues = {
    endDatetime  : '',
    startDatetime: ''
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    startDatetime: yup.string().required('Field is required'),
    endDatetime  : yup
        .string()
        .test('dates_test', 'The End Date cannot be before the Start date', function (value) {
            const { startDatetime } = this.parent;

            return moment.utc(value).isSameOrAfter(moment.utc(startDatetime));
        })
        .required('Field is required')
});

const FORM_CONFIG = {
    defaultValues,
    schema
};

export default FORM_CONFIG;
