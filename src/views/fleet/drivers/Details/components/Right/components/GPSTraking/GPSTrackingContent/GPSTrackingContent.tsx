import DeviceSelect from '@/views/fleet/drivers/Details/components/Right/components/GPSTraking/GPSTrackingContent/DeviceSelect';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { GPSTrackingProps } from '@/views/fleet/drivers/Details/components/Right/components/GPSTraking/GPSTracking';
import { useDriverDevices } from '@/store/fleet/drivers/hooks';
import { useEffect, useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import DriverIcon from '@/views/fleet/drivers/Details/components/Center/tabs/Map/icons/driver_icon.png';

import { Typography } from '@mui/material';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverLocations } from '@/store/streams/events/hooks';
import GPSTrackingMap from './GPSTrackingMap/GPSTrackingMap';

export default function GPSTrackingContent({ id }: GPSTrackingProps) {
    const { t } = useAppTranslation();

    const { devices } = useDriverDevices(id);
    const driverDevicesLocation = useDriverLocations(id);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (devices.length > 0) {
            const current_device = [...devices]
                .filter((device) => {
                    const driverLocation = driverDevicesLocation?.[device.deviceId];
                    return (
                        driverLocation &&
                        driverLocation.lon &&
                        driverLocation.lat &&
                        driverLocation.timestamp
                    );
                })
                .sort(
                    (a, b) =>
                        new Date(driverDevicesLocation?.[b.deviceId]?.timestamp).valueOf() -
                        new Date(driverDevicesLocation?.[a.deviceId]?.timestamp).valueOf()
                )[0];
            setValue((prev) => prev || current_device?.deviceId || devices[0].deviceId);
        }
    }, [!!devices, driverDevicesLocation]);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    const selected_device = useMemo(
        () => driverDevicesLocation?.[value],
        [value, driverDevicesLocation]
    );

    const last_seen = selected_device
        ? latestActivity(selected_device?.timestamp, t)
        : t('common:last_seen_not_available');

    return (
        <RightStyled.GPSTrackingWrapper>
            <DeviceSelect
                value={value}
                onHandleChange={handleChange}
                devices={devices}
            />

            {selected_device?.lat && selected_device?.lon ? (
                <Typography variant="body2">{last_seen}</Typography>
            ) : null}

            <GPSTrackingMap
                lat={selected_device?.lat}
                lon={selected_device?.lon}
                icon={DriverIcon.src}
            />
        </RightStyled.GPSTrackingWrapper>
    );
}
