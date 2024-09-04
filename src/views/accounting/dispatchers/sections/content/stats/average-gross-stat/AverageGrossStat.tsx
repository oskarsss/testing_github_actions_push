import { Stack } from '@mui/material';
import Dispatch from '@/store/accounting/dispatchers/types';
import ChartHeader, { ChartTitle } from '../ChartHeader';
import DonutChart, { ChartType } from '../Chart';
import Dispatchers from './Dispatchers';

type Props = {
    dispatchers: Dispatch.ConverterDispatcher[];
};

export default function AverageGrossStat({ dispatchers }: Props) {
    const filteredDispatchers = [...dispatchers].sort(
        (a, b) => b.stats.grossAmount - a.stats.grossAmount
    );

    const dataChart = filteredDispatchers.map((dispatcher) => ({
        amounts: dispatcher.stats?.grossAmount,
        names  : dispatcher.fullName || ''
    }));

    return (
        <Stack width="100%">
            <ChartHeader title={ChartTitle.AVERAGE_GROSS} />

            <Stack
                borderTop={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
                alignItems="center"
                width="100%"
            >
                <DonutChart
                    data={dataChart}
                    type={ChartType.GROSS}
                />

                <Dispatchers
                    dispatchers={filteredDispatchers}
                    type={ChartType.GROSS}
                />
            </Stack>
        </Stack>
    );
}
