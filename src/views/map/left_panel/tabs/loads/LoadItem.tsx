import { ItemPaper } from '@/views/map/styled_components';
import Stack from '@mui/material/Stack';
import { PrePassIconSvg } from '@/views/map/svg';
import Typography from '@mui/material/Typography';
import { Box, createSvgIcon } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import moment from 'moment-timezone';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { BrokersIcon as BrokerIconSvg, CustomersIcon } from '@/@core/icons/custom-nav-icons/icons';
import LocationComponent from '@/views/dispatch/scheduling/components/Table/components/truck/location/LocationComponent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMemo, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useScrollContext } from '@/views/map/contexts/ScrollContext';
import { MapActions } from '@/store/map/slice';
import { useScrollList } from '@/views/map/hooks/scrollList';
import openNewWindow from '@/utils/open-new-window';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import { MapLoads } from '@/store/dispatch/loads/hooks';

import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import VectorIcons from '@/@core/icons/vector_icons';

type Props = {
    load: MapLoads;
};

const BrokerIcon = createSvgIcon(<BrokerIconSvg />, 'BrokerIcon');
const CustomerIcon = createSvgIcon(<CustomersIcon />, 'CustomerIcon');

export default function LoadItem({ load }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const selected = useAppSelector((state) => state.map.selected.load_id === load.loadId);
    const paperRef = useRef<HTMLDivElement>(null);
    const scrollRef = useScrollContext();

    useScrollList(scrollRef?.current, paperRef.current, selected);

    const {
        truckId,
        driverId
    } = useMemo(() => {
        const activeManifest = load.manifests?.find(
            (manifest) => manifest.manifestId === load.activeManifestId
        );
        const truckId = activeManifest?.truckId ?? '';
        const trailerId = activeManifest?.trailerId ?? '';
        const driverId = activeManifest?.primaryDriverId ?? '';
        return {
            truckId,
            trailerId,
            driverId,
            activeManifest
        };
    }, [load.manifests, load.activeManifestId]);

    const location = useLocationFleet(driverId || '', truckId || '');

    const showMap = () => {
        if (!location) return;
        const url = `https://maps.google.com/?q=${location.lat},${location.lon}`;
        window.open(url);
    };

    const openLoads = () => openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(load.loadId));

    const onClick = () => {
        if (!selected) {
            dispatch(
                MapActions.updateSelected({
                    load_id  : load.loadId,
                    truck_id : truckId,
                    driver_id: driverId
                })
            );

            return;
        }

        dispatch(MapActions.updateSelected({ load_id: '', truck_id: '', driver_id: '' }));
    };

    return (
        <ItemPaper
            sx={
                selected
                    ? {
                        backgroundColor: ({ palette }) =>
                            palette.utility.foreground.blue_dark.tertiary
                    }
                    : {}
            }
            elevation={0}
            ref={paperRef}
            onClick={onClick}
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
                            whiteSpace="nowrap"
                            spacing={1}
                            sx={{ '&:hover': { opacity: 0.6 } }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                openLoads();
                            }}
                        >
                            <VectorIcons.CubeIcon
                                sx={{
                                    color: ({ palette }) =>
                                        palette.semantic.foreground.brand.primary,
                                    fontSize: '25px'
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                # {load.friendlyId}
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
                        />
                    </Stack>
                    <Stack
                        flex={1}
                        fontSize="12px"
                        alignItems="flex-end"
                    >
                        <LoadStatusChipSelect
                            load_id={load.loadId}
                            load_status={LOAD_STATUS_GRPC_ENUM[load.status]}
                        />
                    </Stack>
                </Stack>
                <Stack
                    flex={1}
                    direction="row"
                    spacing={1}
                >
                    {load.brokerId ? (
                        <BrokerIcon color="secondary" />
                    ) : (
                        <CustomerIcon color="secondary" />
                    )}
                    <Stack
                        flex={1}
                        overflow="hidden"
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            fontSize="12px"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            overflow="hidden"
                        >
                            {load.brokerId
                                ? load.broker_short_name || load.broker_name
                                : load.customer_short_name || load.customer_name}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {t('common:ref')} #{load.referenceId}
                        </Typography>
                    </Stack>

                    <Stack alignItems="flex-end">
                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            fontSize="12px"
                        >
                            {load.invoiceAmount}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.ratePerMileFormatted} {t('map:left_panel.loads.rpm')}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <PrePassIconSvg />
                    <Box>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.firstOrderStop?.location?.city || ''},{' '}
                            {load.firstOrderStop?.location?.state || ''}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.firstOrderStop
                                ? moment(load.firstOrderStop.appointmentStartAtLocal).format(
                                    'MM/DD H:mm'
                                )
                                : ''}
                        </Typography>
                    </Box>
                    <ArrowForward
                        fontSize="small"
                        color="secondary"
                    />
                    <Box>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.lastOrderStop?.location?.city || '-'},{' '}
                            {load.lastOrderStop?.location?.state || ''}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight={500}
                            fontSize="12px"
                        >
                            {load.lastOrderStop
                                ? moment(load.lastOrderStop.appointmentStartAtLocal).format(
                                    'MM/DD H:mm'
                                )
                                : ''}
                        </Typography>
                    </Box>
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
                                {load.loadedMiles}
                                {t('common:mi')}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                {t('map:left_panel.loads.titles.loaded')}
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
                                {load.emptyMiles}
                                {t('common:mi')}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight={700}
                                fontSize="12px"
                            >
                                {t('common:empty.empty')}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </ItemPaper>
    );
}
