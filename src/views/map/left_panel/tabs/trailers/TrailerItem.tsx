import { ItemPaper } from '@/views/map/styled_components';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { TrailersSVGIcon } from '@/views/map/svg';
import Typography from '@mui/material/Typography';
import ChipItem from '@/views/map/left_panel/components/Chip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
import LocationComponent from '@/views/dispatch/scheduling/components/Table/components/truck/location/LocationComponent';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useScrollList } from '@/views/map/hooks/scrollList';
import { useScrollContext } from '@/views/map/contexts/ScrollContext';
import { useRef } from 'react';
import openNewWindow from '@/utils/open-new-window';
import { useTrailerLocation } from '@/store/streams/events/hooks';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { TRAILER_STATUS_GRPC } from '@/models/fleet/trailers/trailers-mappings';
import TrailersTypes from '@/store/fleet/trailers/types';

type Props = {
    trailer: TrailersTypes.ConvertedTrailerRow;
};

export default function TrailerItem({ trailer }: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const paperRef = useRef<HTMLDivElement>(null);
    const selected = useAppSelector((state) => state.map.selected.trailer_id === trailer.trailerId);

    const trailersTypesMap = useTrailersTypesMap();
    const trailerType = trailersTypesMap[trailer.trailerTypeId];

    const handleClick = () => {
        if (!selected) {
            dispatch(MapActions.updateSelected({ trailer_id: trailer.trailerId }));

            return;
        }

        dispatch(MapActions.updateSelected({ trailer_id: '' }));
    };

    const location = useTrailerLocation(trailer.trailerId);

    const scrollRef = useScrollContext();

    useScrollList(scrollRef?.current, paperRef.current, selected);

    const showMap = () => {
        if (!location) {
            return;
        }

        window.open(`https://maps.google.com/?q=${location.lat},${location.lon}`);
    };

    const openTrailer = () => openNewWindow(`trailers/${trailer.trailerId}`);

    return (
        <ItemPaper
            elevation={0}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                handleClick();
            }}
            ref={paperRef}
            sx={selected ? { backgroundColor: '#3c7eff22' } : {}}
        >
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={2}
                >
                    <Tooltip title={t('common:tooltips.open_in_new_tab')}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ '&:hover': { opacity: 0.6 } }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                openTrailer();
                            }}
                        >
                            <TrailersSVGIcon fill="#C6D3E3" />
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                # {trailer.referenceId}
                            </Typography>
                        </Stack>
                    </Tooltip>
                    <Stack>
                        <LocationComponent
                            address={location?.address}
                            lat={location?.lat}
                            lon={location?.lon}
                            timestamp={location?.timestamp}
                            onLocationClick={showMap}
                            noLocButtonTooltipTitle="map:left_panel.trailers.tooltips.link_with_eld"
                        />
                    </Stack>
                    <Stack
                        flex={1}
                        fontSize="12px"
                        alignItems="flex-end"
                    >
                        <ChipItem
                            type="trailer"
                            status={trailer.status}
                            tKey={`state_info:trailers.status.${trailer.status}`}
                        />
                    </Stack>
                </Stack>
                <Stack
                    flex={1}
                    direction="row"
                    spacing={1}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {getTrailerTypeIcon(trailerType?.icon)}
                        <Typography variant="subtitle2">{trailerType?.name}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {ENTITY_CHIP_ICONS[trailer.ownershipType]}
                        <Typography variant="subtitle2">
                            {t(`state_info:trailers.ownership_type.${trailer.ownershipType}`)}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flex={1}
                    overflow="hidden"
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={700}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        {t('common:make')}:
                        <Typography
                            variant="subtitle2"
                            fontSize="12px"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            overflow="hidden"
                        >
                            {trailer.make}
                        </Typography>
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={700}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        {t('common:model')}:
                        <Typography
                            variant="subtitle2"
                            fontSize="12px"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            overflow="hidden"
                        >
                            {trailer.model}
                        </Typography>
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        fontSize="12px"
                        fontWeight={700}
                        display="flex"
                        alignItems="center"
                        gap={1}
                    >
                        {t('common:year')}:
                        <Typography
                            variant="subtitle2"
                            fontSize="12px"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            overflow="hidden"
                        >
                            {trailer.year}
                        </Typography>
                    </Typography>
                </Stack>
                {/* <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <PrePassIconSvg />
                    <AuthContentWrapper>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.first_stop_city}, {load.first_stop_state}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {moment(load.first_stop_appointment_start_at).format('MM/DD H:mm')}
                        </Typography>
                    </AuthContentWrapper>
                    <ArrowForward
                        fontSize="small"
                        color="secondary"
                    />
                    <AuthContentWrapper>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.last_stop_city}, {load.last_stop_state}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {moment(load.last_stop_appointment_start_at).format('MM/DD H:mm')}
                        </Typography>
                    </AuthContentWrapper>
                    <div style={{ flex: 1 }} />
                    <Stack
                        direction="column"
                        alignItems="flex-end"
                        spacing={1}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight={500}
                                fontSize="12px"
                            >
                                {load.loaded_miles}mi
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                Loaded
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                        >
                            <Typography
                                variant="subtitle2"
                                fontWeight={500}
                                fontSize="12px"
                            >
                                {load.empty_miles}mi
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                Empty
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack> */}
            </Stack>
        </ItemPaper>
    );
}
