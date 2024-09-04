/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */

import { useDriverDevices } from '@/store/fleet/drivers/hooks';
import { createSvgIcon, Stack } from '@mui/material';
import LocationComponents from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationComponents';
import { useSettings } from '@/store/settings/hooks';
import LocationDriverDevice from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationDriverDevice';
import { useMemo } from 'react';
import { useDriverLocations } from '@/store/streams/events/hooks';

const DriverIcon = createSvgIcon(
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.83366 2.33594C5.21482 2.33594 4.62133 2.58177 4.18374 3.01935C3.74616 3.45694 3.50033 4.05043 3.50033 4.66927C3.50033 5.28811 3.74616 5.88161 4.18374 6.31917C4.62133 6.75679 5.21482 7.0026 5.83366 7.0026C6.45252 7.0026 7.046 6.75679 7.48356 6.31917C7.92118 5.88161 8.16699 5.28811 8.16699 4.66927C8.16699 4.05043 7.92118 3.45694 7.48356 3.01935C7.046 2.58177 6.45252 2.33594 5.83366 2.33594ZM5.83366 8.16927C3.25533 8.16927 1.16699 9.21344 1.16699 10.5026V11.6693H6.81366C6.55332 11.1226 6.41781 10.5248 6.41699 9.91927C6.41816 9.3332 6.5455 8.75424 6.79033 8.22177C6.48116 8.18677 6.16033 8.16927 5.83366 8.16927Z"
            fill="#596372"
        />
        <path
            d="M10.5002 8.85605C10.7814 8.85605 11.0512 8.96782 11.2501 9.16673C11.449 9.36559 11.5608 9.63538 11.5608 9.91667C11.5608 10.198 11.449 10.4677 11.2501 10.6666C11.0512 10.8655 10.7814 10.9773 10.5002 10.9773C10.2189 10.9773 9.94909 10.8655 9.75023 10.6666C9.55131 10.4677 9.43955 10.198 9.43955 9.91667C9.43955 9.63538 9.55131 9.36559 9.75023 9.16673C9.94909 8.96782 10.2189 8.85605 10.5002 8.85605ZM8.12705 10.1818H7.5835V9.65154H8.12705C8.2464 8.54583 9.12933 7.6629 10.235 7.54355V7H10.7653V7.54355C11.871 7.6629 12.7539 8.54583 12.8733 9.65154H13.4168V10.1818H12.8733C12.7539 11.2875 11.871 12.1704 10.7653 12.2898V12.8333H10.235V12.2898C9.12933 12.1704 8.2464 11.2875 8.12705 10.1818ZM10.5002 8.06062C10.0079 8.06062 9.5358 8.25615 9.18772 8.60423C8.83965 8.9523 8.64411 9.42439 8.64411 9.91667C8.64411 10.4089 8.83965 10.881 9.18772 11.2291C9.5358 11.5772 10.0079 11.7727 10.5002 11.7727C10.9924 11.7727 11.4645 11.5772 11.8126 11.2291C12.1607 10.881 12.3562 10.4089 12.3562 9.91667C12.3562 9.42439 12.1607 8.9523 11.8126 8.60423C11.4645 8.25615 10.9924 8.06062 10.5002 8.06062Z"
            fill="#596372"
        />
    </svg>,
    'DriverIcon'
);

type Props = {
    driver_id: string;
    flyToPoint: (lon: number, lat: number, zoom: number) => void;
};

export function LocationDriverController({
    driver_id,
    flyToPoint
}: Props) {
    const { devices } = useDriverDevices(driver_id);
    const driverDeviceLocation = useDriverLocations(driver_id);
    const { driverPpp } = useSettings();

    const sortedDevices = useMemo(
        () =>
            devices?.toSorted((a, b) => {
                const aLocation = driverDeviceLocation?.[a.deviceId];
                const bLocation = driverDeviceLocation?.[b.deviceId];
                if (aLocation?.timestamp && bLocation?.timestamp) {
                    return aLocation.timestamp > bLocation.timestamp ? -1 : 1;
                }
                return 0;
            }),
        [devices, driverDeviceLocation]
    );

    return (
        <LocationComponents.Row alignItems="flex-start">
            <LocationComponents.IconContainer>
                <DriverIcon sx={{ fontSize: '14px' }} />
            </LocationComponents.IconContainer>
            {sortedDevices?.length ? (
                <Stack
                    flexGrow={1}
                    gap="8px"
                    overflow="hidden"
                >
                    {sortedDevices.map((device) => (
                        <LocationDriverDevice
                            key={device.deviceId}
                            deviceOS={device.os}
                            deviceModel={device.model}
                            deviceAppVersion={device.appVersion}
                            locationLat={driverDeviceLocation?.[device.deviceId]?.lat}
                            locationLon={driverDeviceLocation?.[device.deviceId]?.lon}
                            locationAddress={driverDeviceLocation?.[device.deviceId]?.address}
                            timeStamp={driverDeviceLocation?.[device.deviceId]?.timestamp}
                            flyToPoint={flyToPoint}
                            current_version_android={driverPpp?.androidAppVersion}
                            current_version_ios={driverPpp?.iosAppVersion}
                        />
                    ))}
                </Stack>
            ) : (
                <Stack
                    flexDirection="row"
                    gap="inherit"
                    height="24px"
                    flexGrow={1}
                    alignItems="center"
                >
                    <LocationComponents.TitleColumn>-</LocationComponents.TitleColumn>
                    <LocationComponents.Location
                        disabled
                        color="error"
                    />
                    <LocationComponents.Time time={null} />
                </Stack>
            )}
        </LocationComponents.Row>
    );
}
