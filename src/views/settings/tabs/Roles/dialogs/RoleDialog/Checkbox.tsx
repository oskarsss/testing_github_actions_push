import FormControlLabel from '@mui/material/FormControlLabel';
import type { ChangeEvent } from 'react';
import type { RoleGetReply_Role } from '@proto/roles';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import type { PermissionGetReply_PermissionGroup_Permission } from '@proto/permission';

type Props = {
    role: RoleGetReply_Role;
    permission: PermissionGetReply_PermissionGroup_Permission & { isChecked: boolean };
};

const CheckboxItem = ({
    role,
    permission
}: Props) => {
    const [assignPermission, { isLoading: isAssignLoading }] =
        RolesGrpcService.endpoints.assignPermission.useMutation();

    const [removePermission, { isLoading: isRemoveLoading }] =
        RolesGrpcService.endpoints.removePermission.useMutation();

    const onChangeCheckbox = (
        e: ChangeEvent<HTMLInputElement>,
        permission: PermissionGetReply_PermissionGroup_Permission
    ) => {
        if (role) {
            if (e.target.checked) {
                assignPermission({
                    roleId      : role.roleId,
                    permissionId: permission.permissionId
                });
            } else {
                removePermission({
                    roleId      : role.roleId,
                    permissionId: permission.permissionId
                });
            }
        }
    };
    return (
        <FormControlLabel
            control={(
                <Checkbox
                    onChange={(event) => onChangeCheckbox(event, permission)}
                    disabled={isRemoveLoading || isAssignLoading}
                    checked={permission.isChecked}
                />
            )}
            label={permission.name}
            sx={{
                margin: 0,
                gap   : '6px'
            }}
        />
    );
};

export default CheckboxItem;
