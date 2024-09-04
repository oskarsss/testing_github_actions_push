import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import { useCreateDriverType } from '../dialogs/CreateDriverType';

function DriverTypeHeader() {
    const { open } = useCreateDriverType();

    const handleOpenDialog = () => open({});

    return (
        <SettingsHeader
            title="settings:driver_types.header.title"
            icon={<SettingIcons.DriversTypes />}
            onClick={handleOpenDialog}
        />
    );
}

export default DriverTypeHeader;
