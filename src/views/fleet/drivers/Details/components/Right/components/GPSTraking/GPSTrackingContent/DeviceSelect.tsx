import { FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    value: string;
    onHandleChange: (e: SelectChangeEvent) => void;
    devices: DriversTypes.DriverDevice[];
};

export default function DeviceSelect({
    value,
    onHandleChange,
    devices
}: Props) {
    const { t } = useAppTranslation('drivers');

    const renderDevices = () =>
        devices.map((device) => (
            <MenuItem
                key={device.deviceId}
                value={device.deviceId}
            >
                {device.model} ({device.os} {device.osVersion})
            </MenuItem>
        ));

    return (
        <FormControl
            sx={{ width: '100%' }}
            size="small"
        >
            <InputLabel id="tracking-select-label">
                {t('profile.right.gps_tracking.devices.title')}
            </InputLabel>
            <Select
                labelId="tracking-select-label"
                id="tracking-select"
                value={value}
                onChange={onHandleChange}
                input={<OutlinedInput label={t('profile.right.gps_tracking.devices.title')} />}
            >
                {devices.length > 0 ? (
                    renderDevices()
                ) : (
                    <MenuItem value="">
                        <em>{t('profile.right.gps_tracking.devices.no_devices')}</em>
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}
