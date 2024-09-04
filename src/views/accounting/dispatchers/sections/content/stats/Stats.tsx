import { Stack } from '@mui/material';
import Dispatch from '@/store/accounting/dispatchers/types';
import AverageGrossStat from './average-gross-stat/AverageGrossStat';
import AverageRPMStat from './average-rpm-stat/AverageRPMStat';
import ContentStyled from '../Content.styled';

type Props = {
    dispatchers: Dispatch.ConverterDispatcher[];
};

export default function Stats({ dispatchers }: Props) {
    return (
        <Stack
            bgcolor="semantic.foreground.white.primary"
            borderRadius="12px"
            padding="4px"
            minWidth="420px"
            gap="16px"
            overflow="hidden"
        >
            <ContentStyled.PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
            >
                <AverageGrossStat dispatchers={dispatchers} />

                <AverageRPMStat dispatchers={dispatchers} />
            </ContentStyled.PerfectScrollbar>
        </Stack>
    );
}
