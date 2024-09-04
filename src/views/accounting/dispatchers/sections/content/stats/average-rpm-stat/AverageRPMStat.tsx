import { Stack } from '@mui/material';
import Dispatch from '@/store/accounting/dispatchers/types';
import ChartHeader, { ChartTitle } from '../ChartHeader';
import DonutChart, { ChartType } from '../Chart';
import Dispatchers from './Dispatchers';

type Props = {
    dispatchers: Dispatch.ConverterDispatcher[];
};

export default function AverageRPMStat({ dispatchers }: Props) {
    const filteredDispatchers = [...dispatchers].sort((a, b) => b.stats.avgRpm - a.stats.avgRpm);

    const dataChart = filteredDispatchers.map((dispatcher) => ({
        amounts: dispatcher.stats?.avgRpm || 0,
        names  : dispatcher.fullName || ''
    }));

    return (
        <Stack width="100%">
            <ChartHeader title={ChartTitle.AVERAGE_RPM} />

            <Stack
                borderTop={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
                alignItems="center"
                width="100%"
            >
                <DonutChart
                    data={dataChart}
                    type={ChartType.RPM}
                />

                <Dispatchers
                    dispatchers={filteredDispatchers}
                    type={ChartType.RPM}
                />
            </Stack>
        </Stack>
    );
}
