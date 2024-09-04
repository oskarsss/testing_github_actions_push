import { memo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';
import StateTotalsTable from './components/states-totals-table/StatesTotalsTable';
import StopsTable from './components/stops-table/StopsTable';
import TrucksTable from './components/trucks-table/TrucksTable';
import Header from './components/Header/Header';

const Container = styled('div')(({ theme }) => ({
    height       : '100%',
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'column',
    background   : theme.palette.semantic.background.secondary
}));

export type IftaViewIdType = 'trucks' | 'totals' | 'stops';

function Views({
    viewId,
    periodId: period_id
}: { viewId: IftaViewIdType; periodId: string }) {
    if (viewId === 'trucks') {
        return <TrucksTable periodId={period_id} />;
    }
    if (viewId === 'totals') {
        return <StateTotalsTable periodId={period_id} />;
    }
    if (viewId === 'stops') {
        return <StopsTable periodId={period_id} />;
    }
    return null;
}

const VIEWS: { id: IftaViewIdType; name: IntlMessageKey }[] = [
    {
        id  : 'trucks',
        name: 'ifta:details.header.tabs.trucks'
    },
    {
        id  : 'totals',
        name: 'ifta:details.header.tabs.totals'
    },
    {
        id  : 'stops',
        name: 'ifta:details.header.tabs.stops'
    }
];

const Details = ({ period_id }: { period_id: string }) => {
    const [selectedViewId, setSelectedViewId] = useState<IftaViewIdType>('trucks');

    return (
        <Container>
            <Header
                periodId={period_id}
                views={VIEWS}
                selectedViewId={selectedViewId}
                setSelectedViewId={setSelectedViewId}
            />
            <Box
                sx={{
                    display : 'flex',
                    overflow: 'auto',
                    padding : 5,
                    width   : '100%',
                    height  : '100%'
                }}
            >
                <Views
                    periodId={period_id}
                    viewId={selectedViewId}
                />
            </Box>
        </Container>
    );
};

export default memo(Details);
