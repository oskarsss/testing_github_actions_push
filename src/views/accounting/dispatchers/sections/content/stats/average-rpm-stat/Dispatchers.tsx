import Dispatch from '@/store/accounting/dispatchers/types';
import { Stack } from '@mui/material';
import { ChartType } from '@/views/accounting/dispatchers/sections/content/stats/Chart';
import { useColorsRange } from '../utils';
import Dispatcher from './Dispatcher';

type Props = {
    dispatchers: Dispatch.ConverterDispatcher[];
    type: ChartType;
};

export default function Dispatchers({
    dispatchers,
    type
}: Props) {
    const colors = useColorsRange(
        dispatchers.length,
        type === ChartType.GROSS ? 'brand' : 'indigo'
    );

    return (
        <Stack
            gap="4px"
            padding="0 16px 16px"
            width="100%"
        >
            {dispatchers.map((dispatcher, index) => (
                <Dispatcher
                    key={dispatcher.dispatcherId}
                    dispatcher={dispatcher}
                    background={colors[index]}
                />
            ))}
        </Stack>
    );
}
