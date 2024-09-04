import React from 'react';
import { Stack, Typography, styled } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { LB_ListenSearchResultsReply_SearchResult } from '@proto/loadboard';
import { loadboardEquipmentsMapSelector } from '@/store/loadboard/selectors';
import { useAppSelector } from '@/store/hooks';
import { numberWithCommas } from '@/utils/formatting';
import moment from 'moment-timezone';
import LoadboardTable from './LoadboardTable';

type Props = {
    isLoading: boolean;
    rows: LB_ListenSearchResultsReply_SearchResult[];
};

export type FormattedLoadboardRow = LB_ListenSearchResultsReply_SearchResult & {
    rateAmountFormatted: string;
    brokerName: string;
    ageFormatted: string;
    originStartAtFormatted: string;
    destinationEndAtFormatted: string;
    originDeadheadFormatted: string;
    destinationDeadheadFormatted: string;
    originPlaceFormatted: string;
    destinationPlaceFormatted: string;
    distanceFormatted: string;
    rpmFormatted: string;
    equipmentCode: string;
};

const Container = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    flex           : '1 1 100%',
    overflow       : 'hidden',
    borderRadius   : '12px',
    backgroundColor: theme.palette.semantic.foreground.white.primary,
    height         : '100%',
    gap            : '12px'
}));

const InnerContainer = styled('div')(({ theme }) => ({
    flex                  : '1 1 100%',
    overflow              : 'auto',
    scrollBehavior        : 'smooth',
    '&::-webkit-scrollbar': {
        width  : '6px !important',
        height : '6px !important',
        opacity: ' 1 !important'
    },
    '&::-webkit-scrollbar-thumb': {
        cursor         : 'grab',
        backgroundColor: theme.palette.mode === 'light' ? '#D0D5DD' : '#535252',
        borderRadius   : '16px !important',
        width          : '4px !important'
    }
}));

const LoadboardTableContainer = ({
    isLoading,
    rows
}: Props) => {
    const equipmentsMap = useAppSelector(loadboardEquipmentsMapSelector);

    const formattedRows: FormattedLoadboardRow[] = React.useMemo(() => {
        const formatted: FormattedLoadboardRow[] = rows.map(
            (row): FormattedLoadboardRow => ({
                ...row,
                rateAmountFormatted   : `$${numberWithCommas(row.rate?.amount || '')}`,
                brokerName            : row.broker?.name || '',
                ageFormatted          : row.age?.age || '',
                originStartAtFormatted: row.origin?.startAt
                    ? moment(row.origin?.startAt).format('MM/DD')
                    : '',
                destinationEndAtFormatted   : row.destination?.endAt || '',
                originDeadheadFormatted     : row.origin?.deadhead.toString() || '',
                destinationDeadheadFormatted: row.destination?.deadhead.toString() || '',
                originPlaceFormatted:
                    `${row.origin?.city.substr(0, 12)}, ${row.origin?.state}` || '',
                destinationPlaceFormatted:
                    `${row.destination?.city.substr(0, 12)}, ${row.destination?.state}` || '',
                distanceFormatted: `${row.distance?.miles || 0}`,
                rpmFormatted     : `$${row.rate?.rpm || 0}`,
                equipmentCode    : equipmentsMap[row.equipment?.equipmentId || '']?.code || ''
            })
        );
        return formatted;
    }, [equipmentsMap, rows]);

    if (isLoading) {
        return (
            <Preloader
                sx={{
                    flex  : '1 1 100%',
                    height: '100%'
                }}
            />
        );
    }

    return (
        <Container>
            <Stack>
                <Typography
                    fontSize="20px"
                    fontWeight={600}
                >
                    {rows.length} Results
                </Typography>
            </Stack>
            <InnerContainer>
                <LoadboardTable rows={formattedRows} />
            </InnerContainer>
        </Container>
    );
};

export default LoadboardTableContainer;
