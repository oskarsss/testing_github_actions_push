import { Stack } from '@mui/material';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import { useStableArray } from '@/hooks/useStable';
import Dispatch from '@/store/accounting/dispatchers/types';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import { formatCurrency } from '@/views/accounting/dispatchers/sections/content/stats/utils';
import { NumbersAfterDot } from '@/views/accounting/dispatchers/sections/content/stats/Chart';
import columns from './columns';
import Dispatcher from './Dispatcher';
import ContentStyled from '../Content.styled';

type Props = {
    dispatchers: Dispatch.ConverterDispatcher[];
};

export default function DispatchersTables({ dispatchers }: Props) {
    const stableArray = useStableArray<Dispatch.Truck>();

    const sortableDispatchersByName = [...dispatchers].sort((a, b) => {
        if (a.fullName === null) return 1;
        if (b.fullName === null) return -1;

        return a.fullName.localeCompare(b.fullName);
    });

    const executeAction = (name: string) => {
        switch (name) {
        default:
            break;
        }
    };

    return (
        <Stack
            bgcolor="semantic.foreground.white.primary"
            padding="4px"
            borderRadius="12px"
            width="100%"
            overflow="hidden"
        >
            <ContentStyled.PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
                sx={{
                    paddingBottom: '10px',
                    display      : 'flex',
                    flexDirection: 'column',
                    gap          : '20px'
                }}
            >
                {sortableDispatchersByName.map((dispatcher) => (
                    <Stack key={dispatcher.dispatcherId}>
                        <Dispatcher dispatcher={dispatcher} />

                        <MiniTable
                            columns={columns}
                            turnOffBorder
                            rows={dispatcher.trucks ? dispatcher.trucks : stableArray}
                            elementKey="truck_id"
                            executeAction={executeAction}
                            ComponentAfterContent={(
                                <TotalsRow
                                    fontSize="large"
                                    without_border
                                    columns={columns}
                                    info_config={{
                                        loaded_miles: `${dispatcher.stats.loadedMiles} mi`,
                                        empty_miles : `${dispatcher.stats.emptyMiles} mi`,
                                        rpm         : `${formatCurrency(
                                            dispatcher.stats.avgRpm,
                                            NumbersAfterDot.TWO
                                        )}`,
                                        gross: `${formatCurrency(
                                            dispatcher.stats.grossAmount,
                                            NumbersAfterDot.TWO
                                        )}`
                                    }}
                                />
                            )}
                        />
                    </Stack>
                ))}
            </ContentStyled.PerfectScrollbar>
        </Stack>
    );
}
