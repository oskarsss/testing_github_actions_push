import { memo, useState } from 'react';
import moment from 'moment-timezone';
import DateRange from '@/@core/ui-kits/basic/date-range/DateRange';
import { PeriodDateType } from '@/@core/ui-kits/basic/date-range/types';
import Chart from './Chart';
import ChartContainer from '../ChartContainer';

const defaultDate = {
    start_date: moment().clone().subtract(14, 'days')
        .startOf('day')
        .format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD')
};

const TopBrokers = () => {
    const [date, setDate] = useState(defaultDate);
    const {
        start_date,
        end_date
    } = date;

    const {
        items,
        dates
    } = {
        items: [],
        dates: []
    };

    const onChange = ({
        start_date,
        end_date
    }: PeriodDateType) => {
        setDate({ start_date, end_date });
    };

    const header = (
        <>
            <h6 style={{ fontSize: 20, lineHeight: 1.2, fontWeight: 600, margin: 0 }}>
                Top Brokers
            </h6>
            <DateRange
                date={{ start_date, end_date }}
                onChange={onChange}
            />
        </>
    );

    return (
        <ChartContainer
            header={header}
            isLoading={false}
            styleContent={{ height: 'calc(100% - 48px)' }}
        >
            <div style={{ flexGrow: 10, height: '100%', minHeight: '400px' }}>
                <Chart
                    categories={dates}
                    series={items}
                />
            </div>
        </ChartContainer>
    );
};

export default memo(TopBrokers);
