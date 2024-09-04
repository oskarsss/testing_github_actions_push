import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import { useAddTrailerTypeDialog } from '@/views/settings/tabs/Trailers/Types/dialogs/AddTrailerType';

function TrailerTypeHeader() {
    const dialog = useAddTrailerTypeDialog();
    const openAddTrailerTypeDialog = () => dialog.open({});

    return (
        <SettingsHeader
            title="settings:navigation.trailers.trailer_types"
            icon={<SettingIcons.TrailerTypes />}
            onClick={openAddTrailerTypeDialog}
        />
    );
}

export default TrailerTypeHeader;
