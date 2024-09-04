/* eslint-disable indent */
import map_icons from '@/views/fleet/drivers/Details/components/Center/tabs/Map/icons/map_icons';
import Typography from '@mui/material/Typography';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import Stack from '@mui/material/Stack';
import MobileAppIcons from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/mobile_app_icons';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useSettings } from '@/store/settings/hooks';
import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useDriverDevicesPing } from '@/store/streams/events/hooks';
import { useIntegrationProviders } from '@/store/settings/integrations/hooks';
import React, { useMemo } from 'react';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import GpsFixed from '@mui/icons-material/GpsFixed';
import {
    ListenReply_DriverDeviceLocations,
    ListenReply_TrailerLocations,
    ListenReply_TruckLocations
} from '@proto/events_serv';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment-timezone';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Logo = styled('img')({
    maxHeight: '39px',
    maxWidth : '200px',
    objectFit: 'contain'
});

type Props = {
    truckLocation?: ListenReply_TruckLocations['locations'][0];
    driverLocations?: Record<string, ListenReply_DriverDeviceLocations['locations'][0]>;
    truck_model?: string;
    trailer_reference_id?: string;
    full_name?: string;
    devices?: DriversTypes.DriverDevice[];
    driver_id?: DriversTypes.Driver['driverId'];
    trailerLocation?: ListenReply_TrailerLocations['locations'][0];
};

export default function MapLeftPanel({
    truck_model,
    truckLocation,
    driverLocations,
    trailer_reference_id,
    full_name,
    devices,
    driver_id,
    trailerLocation
}: Props) {
    const { mode } = useTheme().palette;
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const integration_provider_id_by_truck = useAppSelector(
        (state) => state.trucks.integration_provider_id
    );
    const integration_provider_id_by_trailer = useAppSelector(
        (state) => state.trailers.integration_provider_id
    );
    const pings = useDriverDevicesPing(driver_id);
    const { driverPpp } = useSettings();
    const {
connected,
isLoading
} = useIntegrationProviders();

    const integrationProviderByTruck = useMemo(
        () =>
            connected.find((provider) =>
                !isLoading && truckLocation && connected
                    ? provider.id === integration_provider_id_by_truck
                    : undefined),
        [isLoading, truckLocation, connected, integration_provider_id_by_truck]
    );

    const integrationProviderByTrailer = useMemo(
        () =>
            connected.find((provider) =>
                !isLoading && truckLocation && connected
                    ? provider.id === integration_provider_id_by_trailer
                    : undefined),
        [isLoading, truckLocation, connected, integration_provider_id_by_trailer]
    );

    if (!driverPpp) {
        return null;
    }

    const {
androidAppVersion,
iosAppVersion
} = driverPpp;

    const moveToDevice = (device_id: string) => {
        const device = driverLocations ? driverLocations[device_id] : undefined;
        if (device) {
            dispatch(DriverActions.setCoordinates([device.lon, device.lat]));
        }
    };

    const moveToTruck = () => {
        if (truckLocation) {
            dispatch(DriverActions.setCoordinates([truckLocation.lon, truckLocation.lat]));
        }
    };

    const moveToTrailer = () => {
        if (trailerLocation) {
            dispatch(DriverActions.setCoordinates([trailerLocation.lon, trailerLocation.lat]));
        }
    };

    const isOnline = (timestamp: number) => {
        const now = moment();
        const lastActivity = moment(timestamp);
        const minutesAgo = now.diff(lastActivity, 'minutes');
        return minutesAgo < 3;
    };

    const findFirstComma = (str: string) => {
        const first_comma = str.indexOf(',');
        const string_before_first_comma = str.substring(first_comma + 1);
        const last_comma = string_before_first_comma.lastIndexOf(',');

        return string_before_first_comma.substring(0, last_comma);
    };

    return (
        <CenterStyled.RightPanel>
            <CenterStyled.RightPanelBlockInfoWrap>
                <CenterStyled.RightPanelBlockInfo>
                    {map_icons.TruckIcon()}
                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        {t('common:profile.center.map.left_panel.truck', {
                            model: truck_model ? `- ${truck_model}` : ''
                        })}
                    </Typography>
                </CenterStyled.RightPanelBlockInfo>

                <CenterStyled.RightPanelBlockInfoContent>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {truckLocation ? (
                        integrationProviderByTruck ? (
                            <CenterStyled.Vehicle onClick={moveToTruck}>
                                <CenterStyled.VehicleLeft>
                                    <Logo
                                        src={
                                            mode === 'light'
                                                ? integrationProviderByTruck.darkLogoUrl
                                                : integrationProviderByTruck.lightLogoUrl
                                        }
                                        height={24}
                                        alt={integrationProviderByTruck.name || 'logo provider'}
                                    />
                                    <Typography variant="body1">
                                        #{integration_provider_id_by_truck}
                                    </Typography>
                                </CenterStyled.VehicleLeft>

                                <CenterStyled.VehicleRight>
                                    <CenterStyled.WrapGeoIcon
                                        style={{ width: 'fit-content', padding: '4px' }}
                                        color={
                                            isOnline(truckLocation.timestamp) ? 'success' : 'error'
                                        }
                                    >
                                        {isOnline(truckLocation.timestamp) ? (
                                            <GpsFixed />
                                        ) : (
                                            <LocationDisabledIcon />
                                        )}
                                    </CenterStyled.WrapGeoIcon>
                                    <Typography variant="body1">
                                        {findFirstComma(truckLocation.address)}
                                    </Typography>
                                    <Typography variant="body2">
                                        ({latestActivity(truckLocation.timestamp, t)})
                                    </Typography>
                                </CenterStyled.VehicleRight>
                            </CenterStyled.Vehicle>
                        ) : (
                            <Typography variant="body2">{t('common:loading')}</Typography>
                        )
                    ) : (
                        <Typography variant="body2">
                            {t('common:profile.center.map.location_unavailable')}
                        </Typography>
                    )}
                </CenterStyled.RightPanelBlockInfoContent>
            </CenterStyled.RightPanelBlockInfoWrap>

            <CenterStyled.RightPanelBlockInfoWrap>
                <CenterStyled.RightPanelBlockInfo>
                    {map_icons.TrailerIcon()}
                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        {t('common:profile.center.map.left_panel.trailer', {
                            referenceId: trailer_reference_id ? `- ${trailer_reference_id}` : ''
                        })}
                    </Typography>
                </CenterStyled.RightPanelBlockInfo>

                <CenterStyled.RightPanelBlockInfoContent>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {trailerLocation ? (
                        integrationProviderByTrailer ? (
                            <CenterStyled.Vehicle onClick={moveToTrailer}>
                                <CenterStyled.VehicleLeft>
                                    <Logo
                                        src={
                                            mode === 'light'
                                                ? integrationProviderByTrailer.darkLogoUrl
                                                : integrationProviderByTrailer.lightLogoUrl
                                        }
                                        height={24}
                                        alt={integrationProviderByTrailer.name || 'logo provider'}
                                    />
                                    <Typography variant="body1">
                                        #{integration_provider_id_by_truck}
                                    </Typography>
                                </CenterStyled.VehicleLeft>

                                <CenterStyled.VehicleRight>
                                    <CenterStyled.WrapGeoIcon
                                        style={{ width: 'fit-content', padding: '4px' }}
                                        color={
                                            isOnline(trailerLocation.timestamp)
                                                ? 'success'
                                                : 'error'
                                        }
                                    >
                                        {isOnline(trailerLocation.timestamp) ? (
                                            <GpsFixed />
                                        ) : (
                                            <LocationDisabledIcon />
                                        )}
                                    </CenterStyled.WrapGeoIcon>
                                    <Typography variant="body1">
                                        {trailerLocation.address}
                                    </Typography>
                                    <Typography variant="body2">
                                        ({latestActivity(trailerLocation.timestamp, t)})
                                    </Typography>
                                </CenterStyled.VehicleRight>
                            </CenterStyled.Vehicle>
                        ) : (
                            <Typography variant="body2">{t('common:loading')}</Typography>
                        )
                    ) : (
                        <Typography variant="body2">
                            {t('common:profile.center.map.location_unavailable')}
                        </Typography>
                    )}
                </CenterStyled.RightPanelBlockInfoContent>
            </CenterStyled.RightPanelBlockInfoWrap>

            <CenterStyled.RightPanelBlockInfoWrap>
                <CenterStyled.RightPanelBlockInfo>
                    {map_icons.DriverIcon()}
                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        {t('common:profile.center.map.left_panel.driver', {
                            name: full_name ? `- ${full_name}` : ''
                        })}
                    </Typography>
                </CenterStyled.RightPanelBlockInfo>

                <CenterStyled.RightPanelBlockInfoContent>
                    {devices && devices.length > 0 ? (
                        devices.map((device) => {
                            const ping = pings ? pings[device.deviceId] : undefined;
                            const last_seen = ping
                                ? latestActivity(ping.timestamp, t)
                                : t('common:not_available');
                            const change_model_title = device.model.split('_').join(' ');

                            return (
                                <CenterStyled.Device
                                    disabled={!driverLocations?.[device.deviceId]}
                                    onClick={() => moveToDevice(device.deviceId)}
                                >
                                    <Stack
                                        flexDirection="row"
                                        gap="8px"
                                    >
                                        <Stack>
                                            {((device.os.toLowerCase() === 'ios' &&
                                                iosAppVersion) ||
                                                (device.os.toLowerCase() === 'android' &&
                                                    androidAppVersion)) === device.appVersion ? (
                                                        <MobileAppIcons.UpToDateVersionIcon />
                                            ) : (
                                                <MobileAppIcons.OutdatedVersionIcon />
                                            )}
                                        </Stack>
                                        <Typography>{change_model_title}</Typography>
                                    </Stack>

                                    <RightStyled.PartnerOnline>
                                        <RightStyled.Marker current={last_seen === 'online'} />
                                        {last_seen}
                                    </RightStyled.PartnerOnline>
                                </CenterStyled.Device>
                            );
                        })
                    ) : (
                        <Typography variant="body2">
                            {t('common:profile.center.map.location_unavailable')}
                        </Typography>
                    )}
                </CenterStyled.RightPanelBlockInfoContent>
            </CenterStyled.RightPanelBlockInfoWrap>
        </CenterStyled.RightPanel>
    );
}
