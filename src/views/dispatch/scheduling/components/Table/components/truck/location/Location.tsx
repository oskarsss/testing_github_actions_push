import { memo, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import { StatusChipStyled } from '@/@core/theme/chip';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import Scheduling from '@/store/dispatch/scheduling/types';
import PinTruckButton from '@/views/dispatch/scheduling/components/Table/components/truck/location/PinTruckButton';
import TruckOnlineButton from '@/views/dispatch/scheduling/components/Table/components/truck/location/TruckOnlineButton';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import Box from '@mui/material/Box';
import { DriverIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { formatPhoneNumber } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import {
    Container,
    LocationWrap,
    GpsIcon,
    Address,
    IconButtonStyled,
    LocationUpdated,
    ButtonLocation,
    ContainerNoLoc,
    NoLocationChip
} from './styled';

type Props = {
    truck: Scheduling.TruckManifestRow;
    location_only_truck?: boolean;
};

function Location({
    truck,
    location_only_truck
}: Props) {
    const { t } = useAppTranslation();
    const driversMap = useDriversMap();
    const trailerMap = useTrailersMap();

    const copy = useCopyToClipboard();

    const scrollTo = useCallback(() => {
        const container = document.getElementById('dispatch-table');
        const row = document.querySelector(['[data-truck-id="', truck.truckId, '"]'].join(''));
        const container_dom_rect = row?.getBoundingClientRect();
        if (container && container_dom_rect) {
            container.scrollTo({
                top: container.scrollTop + container_dom_rect.top - container_dom_rect.height - 3
            });
        }
    }, [truck.truckId]);

    const primary_driver = truck.drivers.find((d) => d.primary) || truck.drivers[0];
    const location = useLocationFleet(
        location_only_truck ? '' : primary_driver?.driverId || '',
        truck.truckId
    );

    const clickCopyDriver = () => {
        const data: string[] = [];
        const trailer = trailerMap[truck.trailerId];

        data.push(`${t('entity:truck')}: #${truck.referenceId}`);
        data.push(`${t('entity:trailer')}: ${trailer ? `#${trailer.referenceId}` : 'PO'}`);

        truck.drivers.forEach((truckDriver) => {
            const driver = driversMap[truckDriver.driverId];
            if (!driver) return;
            data.push(`${t('entity:driver')}: ${driver.firstName} ${driver.lastName}`);
            data.push(`${t('common:phone')}: ${formatPhoneNumber(driver.phoneNumber)}`);
        });

        if (location?.address) {
            data.push(`${t('schedule:table.truck.location.current_loc')}: ${location.address}`);
        }

        copy(data.length ? data.join('\n') : '');
    };

    const showMap = () => {
        if (!location) {
            return;
        }

        window.open(`https://maps.google.com/?q=${location.lat},${location.lon}`);
    };

    return (
        <Container isOnline={truck.online}>
            <LocationWrap>
                {location.lat && location.lon ? (
                    <Tooltip title={t('common:tooltips.show_in_google_maps')}>
                        <ButtonLocation
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                showMap();
                            }}
                        >
                            <StatusChipStyled
                                color={location.location_current ? 'success' : 'gray'}
                                style={{ padding: '0 4px' }}
                            >
                                <GpsIcon isOnline={location.location_current} />
                            </StatusChipStyled>

                            {location.type && !location_only_truck && (
                                <Box
                                    sx={{
                                        display   : 'flex',
                                        marginLeft: '4px',

                                        svg: {
                                            fill: (theme) =>
                                                theme.palette.semantic.foreground.primary
                                        }
                                    }}
                                >
                                    {location.type === 'driver' && <DriverIcon />}
                                    {location.type === 'truck' && <TrucksIcon />}
                                </Box>
                            )}

                            {/* ---------------- ADDRESS ---------------- */}
                            <Address>{location.address}</Address>
                        </ButtonLocation>
                    </Tooltip>
                ) : (

                    // ---------------- NO LOCATION ----------------
                    <ContainerNoLoc>
                        <Tooltip title={t('common:tooltips.install_driver_app')}>
                            <NoLocationChip>
                                <LocationDisabledIcon />
                                {t('common:empty.no_location')}
                            </NoLocationChip>
                        </Tooltip>
                    </ContainerNoLoc>
                )}

                {/* ---------------- LOCATION UPDATED AT ---------------- */}
                {location.location_age && (
                    <LocationUpdated>{`(${location.location_age})`}</LocationUpdated>
                )}
            </LocationWrap>

            {/* ---------------- CONTROLLERS ---------------- */}

            {/* ------------ COPY DRIVER INFO ------------ */}
            <Tooltip title={t('schedule:table.truck.location.tooltips.copy_driver_info')}>
                <IconButtonStyled
                    sx={{ ml: 0 }}
                    active={false}
                    size="small"
                    aria-label="copy driver info"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        clickCopyDriver();
                    }}
                >
                    <FileCopyRoundedIcon />
                </IconButtonStyled>
            </Tooltip>

            {/* ------------ OFFLINE-ONLINE ------------ */}
            {(truck.drivers.length !== 0 || !location_only_truck) && (
                <TruckOnlineButton
                    truck_id={truck.truckId}
                    truck_online={truck.online}
                    scrollTo={scrollTo}
                />
            )}

            {/* ------------ PIN ------------ */}
            <PinTruckButton
                truck_id={truck.truckId}
                scrollTop={scrollTo}
            />
        </Container>
    );
}

export default memo(Location);
