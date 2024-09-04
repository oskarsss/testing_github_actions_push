import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { SyntheticEvent, useState } from 'react';
import { useDriverDevices } from '@/store/fleet/drivers/hooks';
import { Fade } from '@mui/material';
import Device from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/Devices/Device';
import DeviceDetails from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/Devices/DeviceDetails';
import SYSTEM from '@/@system';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverDevicesPing } from '@/store/streams/events/hooks';

type Props = {
    driverId: string;
};

export default function Devices({ driverId }: Props) {
    const { t } = useAppTranslation();
    const [expanded, setExpanded] = useState<string | false>(false);
    const { devices } = useDriverDevices(driverId);
    const driverPings = useDriverDevicesPing(driverId);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const renderDeviceList = () =>
        devices.map((device, i) => (
            <RightStyled.DeviceBlock
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
            >
                <Device
                    key={device.deviceId}
                    os={device.os}
                    model={device.model}
                    app_version={device.appVersion}
                    ping_timestamp={driverPings?.[device.deviceId]?.timestamp || 0}
                />
                <DeviceDetails
                    app_version={`${SYSTEM.TMS_FRIENDLY_NAME} ${device.appVersion}`}
                    os_with_version={`${device.os} ${device.osVersion}`}
                />
            </RightStyled.DeviceBlock>
        ));

    return devices && devices.length > 0 ? (
        <Fade in>
            <div>{renderDeviceList()}</div>
        </Fade>
    ) : (
        <RightStyled.EmptyElement variant="body2">
            {t('drivers:profile.right.mobile_app.no_app')}
        </RightStyled.EmptyElement>
    );
}
