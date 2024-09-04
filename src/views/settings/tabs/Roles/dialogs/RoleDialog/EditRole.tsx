import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextInput from '@/@core/fields/inputs/TextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useAllMainRoles } from '@/store/settings/roles/hooks';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import {
    default_values,
    DefaultValues,
    schema
} from '@/views/settings/tabs/Roles/dialogs/RoleDialog/CreateRole';
import RolesGrpcService from '@/@grpcServices/services/settings-service/roles.service';
import PermissionsGrpcService from '@/@grpcServices/services/settings-service/permissions.service';
import { useStableArray } from '@/hooks/useStable';
import Checkbox from './Checkbox';
import SkeletonPermissions from './Skeleton';

type Props = {
    role_id: string;
};

export const useEditRoleDialog = hookFabric(EditRole, (props) => (
    <DialogComponents.DialogWrapper
        paperStyle={{
            overflow: 'hidden'
        }}
        maxWidth="950px"
        {...props}
    />
));

function EditRole({ role_id }: Props) {
    const {
        data,
        isLoading
    } = PermissionsGrpcService.endpoints.getPermissions.useQuery({});

    const rows = useStableArray(data?.permissionGroups);

    const {
        roles,
        isFetching
    } = useAllMainRoles(true);
    const editRoleDialog = useEditRoleDialog(true);

    const role = useMemo(() => roles.find((el) => el.roleId === role_id), [roles, role_id]);

    const updPermissions = useMemo(
        () =>
            rows.map((row) => {
                const updPermissions = row.permissions.map((el) => {
                    const isChecked = role?.permissions[el.fieldKey];
                    if (isChecked) {
                        return {
                            ...el,
                            isChecked: true
                        };
                    }
                    return {
                        ...el,
                        isChecked: false
                    };
                });
                return {
                    ...row,
                    permissions: updPermissions
                };
            }),
        [rows, role]
    );

    const [updateRole, { isLoading: isUpdateLoading }] = RolesGrpcService.useUpdateRoleMutation();

    const [deleteRole, { isLoading: isDeleteLoading }] = RolesGrpcService.useDeleteRoleMutation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: default_values,
        values       : { name: role?.name || '' },
        resolver     : yupResolver(schema)
    });

    const onDelete = () => {
        if (role) {
            deleteRole({ roleId: role.roleId })
                .unwrap()
                .then(() => {
                    editRoleDialog.close();
                });
        }
    };

    const submitForm = (body: DefaultValues) => {
        if (role) {
            updateRole({
                roleId: role.roleId,
                name  : body.name
            })
                .unwrap()
                .then(() => {
                    editRoleDialog.close();
                });
        }
    };

    return (
        <DialogComponents.Form
            style={{
                display      : 'flex',
                flexDirection: 'column',
                overflow     : 'hidden'
            }}
            onSubmit={handleSubmit(submitForm)}
        >
            <DialogComponents.Header
                title="settings:roles.dialog.edit.header.title"
                translationOptions={{ roleName: role?.name ?? '' }}
            />

            <DialogComponents.Fields
                sx={{
                    overflow     : 'hidden',
                    flexWrap     : 'nowrap',
                    flexDirection: 'column'
                }}
            >
                <DialogComponents.Field xs={12}>
                    <TextInput
                        name="name"
                        label="fields:name.label"
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="fields:name.placeholder"
                        width="100%"
                        autoFocus
                    />
                </DialogComponents.Field>

                <DialogComponents.Field
                    xs={12}
                    sx={{ overflow: 'auto' }}
                >
                    {isLoading && <SkeletonPermissions />}
                    {!role && isFetching ? (
                        <SkeletonPermissions />
                    ) : (
                        <Grid
                            p={2}
                            container
                            spacing={3}
                            minHeight="920px"
                        >
                            {updPermissions.map((permission_group) => (
                                <Grid
                                    key={permission_group.name}
                                    item
                                    xs={4}
                                >
                                    <Box
                                        sx={{
                                            borderRadius: '5px',
                                            padding     : 2,
                                            height      : '100%'
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {permission_group.name}
                                        </Typography>
                                        <Stack
                                            direction="column"
                                            gap="8px"
                                        >
                                            {Array.isArray(permission_group.permissions) &&
                                                role &&
                                                permission_group.permissions.map((permission) => (
                                                    <Checkbox
                                                        key={permission.permissionId}
                                                        role={role}
                                                        permission={permission}
                                                    />
                                                ))}
                                        </Stack>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={editRoleDialog.close} />
                <DialogComponents.DeleteButton
                    onClick={onDelete}
                    loading={isDeleteLoading}
                />
                <DialogComponents.SubmitButton
                    type="update"
                    disabled={!isDirty}
                    loading={isUpdateLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
