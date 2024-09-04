import { useAppSelector } from '@/store/hooks';
import {
    loadboardSearchesMapSelector,
    loadboardSelectedLoadIdSelector,
    loadboardSelectedSearchIdSelectors,
    useLoadboardSelectedSearchResultsMap
} from '@/store/loadboard/selectors';
import { Box, Stack } from '@mui/material';
import LoadboardMap from './loadboard-map/LoadboardMap';
import CallButton from './buttons/CallButton';
import EmailButton from './buttons/EmailButton';
import BookButton from './buttons/BookButton';
import RateOverview from './rate-overview/RateOverview';
import LoadCharacteristics from './load-characteristics/LoadCharacteristics';

export default function LoadboardInfoPanel() {
    const { map } = useLoadboardSelectedSearchResultsMap();
    const searchesMap = useAppSelector(loadboardSearchesMapSelector);
    const selectedLoadId = useAppSelector(loadboardSelectedLoadIdSelector);

    const selectedLoad = map[selectedLoadId];
    const selectedSearchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const search = searchesMap['searchId' || ''];

    if (!selectedLoad) {
        return null;
    }

    return (
        <Stack
            direction="column"
            flexGrow={1}
            width="100%"
            maxWidth="380px"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.secondary,
                padding        : '8px 8px 8px 0',
                overflow       : 'auto'
            }}
            gap={2}
        >
            <Box
                sx={{
                    minHeight: '420px',
                    maxHeight: '420px',
                    height   : '100%'
                }}
            >
                <LoadboardMap
                    destination={selectedLoad.destination}
                    origin={selectedLoad.origin}
                    distance={selectedLoad.distance}
                    truckId={search?.truckId}
                    resultId={selectedLoad.resultId}
                    searchId={selectedSearchId}
                    integrationId={selectedLoad?.loadboard?.loadboardId || ''}
                />
            </Box>
            <Stack
                direction="row"
                gap={2}
                sx={{
                    padding        : '12px',
                    backgroundColor: (theme) => theme.palette.semantic.background.white,
                    borderRadius   : '5px'
                }}
            >
                <Box flex={1}>
                    <BookButton />
                </Box>
                <Box flex={1}>
                    <CallButton />
                </Box>
                <Box flex={1}>
                    <EmailButton />
                </Box>
            </Stack>
            <RateOverview
                rate={selectedLoad.rate?.amount || ''}
                reload=""
                rpm={selectedLoad.rate?.rpm || ''}
                marketRate=""
                marketRpm=""
            />
            <LoadCharacteristics load={selectedLoad} />
        </Stack>
    );
}
