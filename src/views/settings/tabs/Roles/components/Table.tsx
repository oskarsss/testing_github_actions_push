import { useEditRoleDialog } from '@/views/settings/tabs/Roles/dialogs/RoleDialog/EditRole';
import SettingTable from '@/views/settings/components/Table/Table';
import type { ExecuteAction } from '@/views/settings/components/Table/types';
import type { RoleGetReply_Role } from '@proto/roles';
import { useCreateRoleDialog } from '@/views/settings/tabs/Roles/dialogs/RoleDialog/CreateRole';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import columns from './columns';

type Props = {
    roles: RoleGetReply_Role[];
    isLoading: boolean;
};

export default function RolesTable({
    roles,
    isLoading
}: Props) {
    const createRoleDialog = useCreateRoleDialog();
    const editRoleDialog = useEditRoleDialog();
    const [restore] = RolesGrpcService.useRestoreRoleMutation();

    const executeAction: ExecuteAction<RoleGetReply_Role> = (name, { row }) => {
        switch (name) {
        case 'edit':
            if (row.deleted) return;
            editRoleDialog.open({ role_id: row.roleId });
            break;
        case 'restore':
            restore({ roleId: row.roleId });
            break;
        default:
            break;
        }
    };

    const openCreateRoleDialog = () =>
        createRoleDialog.open({
            onSuccessfulCreate: (roleId) => {
                editRoleDialog.open({ role_id: roleId });
            }
        });

    return (
        <SettingTable<RoleGetReply_Role>
            rows={roles}
            isLoading={isLoading}
            elementKey="roleId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.ROLES}
            onClickFallback={openCreateRoleDialog}
        />
    );
}
