import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import { useCreateRoleDialog } from '@/views/settings/tabs/Roles/dialogs/RoleDialog/CreateRole';
import { useEditRoleDialog } from '@/views/settings/tabs/Roles/dialogs/RoleDialog/EditRole';
import { RoleGetReply_Role } from '@proto/roles';
import SettingsHeaderTabs, { TabsValue } from '@/views/settings/components/tabs/SettingsHeaderTabs';

type Props = {
    roles: RoleGetReply_Role[];
    tabsValue: TabsValue;
    setTabsValue: (value: TabsValue) => void;
};

function RolesHeader({
    roles,
    tabsValue,
    setTabsValue
}: Props) {
    const createRoleDialog = useCreateRoleDialog();
    const editRoleDialog = useEditRoleDialog();
    const openCreateRoleDialog = () =>
        createRoleDialog.open({
            onSuccessfulCreate: (roleId) => {
                editRoleDialog.open({ role_id: roleId });
            }
        });

    return (
        <SettingsHeader
            title="settings:navigation.organization.roles"
            icon={<SettingIcons.Roles />}
            onClick={openCreateRoleDialog}
            children_left_side={(
                <SettingsHeaderTabs
                    value={tabsValue}
                    setValue={setTabsValue}
                    categories={roles}
                />
            )}
        />
    );
}

export default RolesHeader;
