import { ItemPaper } from '@/views/map/styled_components';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChipItem from '@/views/map/left_panel/components/Chip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
import DriversTypes from '@/store/fleet/drivers/types';
import {
    Avatar,
    DriverNameWrap,
    PhoneNumber
} from '@/views/dispatch/scheduling/components/Table/components/truck/drivers/styled';
import { Box, Divider, Tooltip } from '@mui/material';
import { ButtonStyled } from '@/views/dispatch/scheduling/components/Table/components/truck/location/styled';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import CopyText from '@/@core/components/copy-text/CopyText';
import openNewWindow from '@/utils/open-new-window';
import getInitials from '@/utils/get-initials';
import LocationComponent from '@/views/dispatch/scheduling/components/Table/components/truck/location/LocationComponent';
import MobileFriendlyRounded from '@mui/icons-material/MobileFriendlyRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';
import PhonelinkEraseRounded from '@mui/icons-material/PhonelinkEraseRounded';

import { useScrollList } from '@/views/map/hooks/scrollList';
import { useScrollContext } from '@/views/map/contexts/ScrollContext';
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { useLastDriverLocation } from '@/store/streams/events/hooks';
import { formatPhoneNumber } from '@/utils/formatting';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DRIVER_STATUS_TO_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';

type Props = {
    driver: DriversTypes.ConvertedDriverRow;
};

export default function DriverItem({ driver }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const paperRef = useRef<HTMLDivElement>(null);
    const selected = useAppSelector((state) => state.map.selected.driver_id === driver.driverId);

    const location = useLastDriverLocation(driver.driverId);
    const address = location?.address || '';

    const scrollRef = useScrollContext();

    useScrollList(scrollRef?.current, paperRef.current, selected);
    const router = useRouter();

    const driverSelfie = usePrivateFileUrl(driver.selfieThumbUrl);

    const showMap = () => {
        if (!location) return;
        const url = `https://maps.google.com/?q=${location.lat},${location.lon}`;
        window.open(url);
    };

    const handleClick = () => {
        if (!selected) {
            dispatch(MapActions.updateSelected({ driver_id: driver.driverId }));

            // router.push({
            //     query: {
            //         ...router.query,
            //         selectedItem: JSON.stringify({
            //             itemId: driver.driver_id,
            //             entity: 'driver'
            //         })
            //     }
            // });
            return;
        }
        dispatch(MapActions.updateSelected({ driver_id: '' }));

        // const updQuery = { ...router.query };
        // delete updQuery.selectedItem;
        // router.push({
        //     query: updQuery
        // });
    };

    const appInstalled = !!location?.timestamp;

    return (
        <ItemPaper
            elevation={0}
            onClick={handleClick}
            ref={paperRef}
            sx={selected ? { backgroundColor: '#3c7eff22' } : {}}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
            >
                <Tooltip
                    title={t(
                        `map:left_panel.drivers.tooltips.${
                            appInstalled ? 'app_installed' : 'doesnt_install_app'
                        }`
                    )}
                >
                    {appInstalled ? (
                        <MobileFriendlyRounded color="secondary" />
                    ) : (
                        <PhonelinkEraseRounded color="secondary" />
                    )}
                </Tooltip>
                <Box flex={1}>
                    <LocationComponent
                        address={address}
                        lat={location?.lat}
                        lon={location?.lon}
                        timestamp={location?.timestamp}
                        onLocationClick={showMap}
                    />
                </Box>
                <ChipItem
                    tKey={`state_info:drivers.status.${driver.status}`}
                    type="driver"
                    status={DRIVER_STATUS_TO_GRPC_ENUM[driver.status]}
                />
            </Stack>
            <Divider variant="fullWidth" />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
            >
                <Stack
                    direction="row"
                    flex={1}
                >
                    {/* // TODO FIX isOnline prop */}
                    <Avatar
                        isOnline={false}
                        key={driver.driverId}
                        src={driverSelfie.url}
                        alt="avatar"
                    >
                        {getInitials(`${driver.firstName} ${driver.lastName}` || '').slice(0, 2)}
                    </Avatar>
                    <div>
                        <div>
                            <DriverNameWrap>
                                <Tooltip
                                    disableInteractive
                                    title={t('common:tooltips.open_in_new_tab')}
                                >
                                    <ButtonStyled
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openNewWindow(`drivers/${driver.driverId}`, true);
                                        }}
                                    >
                                        {`${driver.firstName} ${driver.lastName}`}
                                    </ButtonStyled>
                                </Tooltip>
                            </DriverNameWrap>

                            {driver.phoneNumber && (
                                <CopyText text={driver.phoneNumber}>
                                    <PhoneNumber>
                                        {formatPhoneNumber(driver.phoneNumber)}
                                    </PhoneNumber>
                                </CopyText>
                            )}
                        </div>
                    </div>
                </Stack>
                <Stack flex={1}>
                    <Tooltip title={driver.driverType?.name || ''}>
                        <Typography
                            component="span"
                            fontSize="12px"
                            display="flex"
                            alignItems="center"
                            gap="5px"
                        >
                            {
                                DRIVER_TYPE_ICONS[
                                    driver.driverType?.icon || DriverTypeModel_Icon.COMPANY
                                ]
                            }
                            {driver.driverType?.name || ''}
                        </Typography>
                    </Tooltip>
                    {driver.addressCity && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                            gap="5px"
                        >
                            <HomeRounded />
                            <Typography
                                variant="body2"
                                component="span"
                            >
                                {[driver.addressCity, driver.addressState, driver.addressPostalCode]
                                    .filter(Boolean)
                                    .join(', ')}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </ItemPaper>
    );
}
