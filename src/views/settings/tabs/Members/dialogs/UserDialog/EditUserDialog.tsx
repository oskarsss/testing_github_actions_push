import UserDialog from '@/views/settings/tabs/Members/dialogs/UserDialog/UserDialog';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_config } from '@/configs/reset-from-config';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import InvitationControllers from '@/views/settings/tabs/Members/dialogs/UserDialog/InvitationControllers';
import {
    defaultValues,
    schema,
    valuesFormation
} from '@/views/settings/tabs/Members/dialogs/UserDialog/helpers';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { GetUsersReply_User, UpdateUserRequest } from '@proto/users';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';

export const useEditUserDialog = hookFabric(EditUserDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="800px"
    />
));

type Props = {
    user: GetUsersReply_User;
};

export default function EditUserDialog({ user }: Props) {
    const editDialog = useEditUserDialog(true);
    const [updateUser, { isLoading }] = UsersGrpcService.useUpdateUserMutation();

    const dataValues: UpdateUserRequest = useMemo(() => valuesFormation(user), [user]);

    const method = useForm<UpdateUserRequest>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver(schema)
    });

    const submit = (body: UpdateUserRequest) => {
        updateUser({
            email                 : body.email,
            firstName             : body.firstName,
            lastName              : body.lastName,
            passwordChangeRequired: body.passwordChangeRequired,
            phone                 : body.phone,
            roleId                : body.roleId,
            userId                : user.userId,
            secondStepAuthEnabled : body.secondStepAuthEnabled,
            status                : body.status,
            title                 : body.title,
            ...(body.password && { password: body.password })
        }).then(() => {
            editDialog.close();
            method.reset(defaultValues, reset_config);
        });
    };

    return (
        <UserDialog
            method={method}
            title="modals:settings.user.update.header.title"
            submit={submit}
            isEdit
            topControllers={<InvitationControllers user={user} />}
        >
            <DialogComponents.DefaultActions
                onCancel={editDialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!method.formState.isDirty}
            />
        </UserDialog>
    );
}
