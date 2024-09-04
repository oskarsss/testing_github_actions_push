import { useAppSelector } from '@/store/hooks';
import { loadboardSearchesMapSelector } from '@/store/loadboard/selectors';
import { Box, Stack } from '@mui/material';
import { LB_ListenSearchResultsReply_SearchResult } from '@proto/loadboard';
import LoadboardMap from '../../components/load-info/loadboard-map/LoadboardMap';
import BookButton from '../../components/load-info/buttons/BookButton';
import CallButton from '../../components/load-info/buttons/CallButton';
import EmailButton from '../../components/load-info/buttons/EmailButton';
import RateOverview from '../../components/load-info/rate-overview/RateOverview';
import LoadCharacteristics from '../../components/load-info/load-characteristics/LoadCharacteristics';

type Props = {
    selectedLoad: LB_ListenSearchResultsReply_SearchResult;
};

export default function LoadboardMainInfo({ selectedLoad }: Props) {
    const searchesMap = useAppSelector(loadboardSearchesMapSelector);
    const search = searchesMap[''];
    return (
        <>
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
                    searchId={search?.searchId || ''}
                    integrationId={selectedLoad?.loadboard?.loadboardId || ''}
                />
            </Box>
            <Stack
                gap={2}
                sx={{
                    padding: '12px'
                }}
            >
                <Stack
                    direction="row"
                    gap={2}
                    sx={{
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
                    turnOffMarket
                    rate={selectedLoad.rate?.amount || ''}
                    reload=""
                    rpm={selectedLoad.rate?.rpm || ''}
                    marketRate=""
                    marketRpm=""
                />
                <LoadCharacteristics load={selectedLoad} />
            </Stack>
        </>
    );
}
