import UserDialog from '@/views/settings/tabs/Members/dialogs/UserDialog/UserDialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_config } from '@/configs/reset-from-config';
import { defaultValues, schema } from '@/views/settings/tabs/Members/dialogs/UserDialog/helpers';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { UpdateUserRequest } from '@proto/users';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';

export const useAddUserDialog = hookFabric(AddUserDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="800px"
    />
));

export default function AddUserDialog() {
    const userDialog = useAddUserDialog(true);
    const [createUser, { isLoading }] = UsersGrpcService.useCreateUserMutation();

    const method = useForm<UpdateUserRequest>({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const submit = (body: UpdateUserRequest) => {
        createUser({
            email                 : body.email,
            firstName             : body.firstName,
            lastName              : body.lastName,
            password              : body?.password || '',
            passwordChangeRequired: body.passwordChangeRequired,
            phone                 : body.phone,
            roleId                : body.roleId,
            secondStepAuthEnabled : body.secondStepAuthEnabled,
            title                 : body.title
        }).then(() => {
            userDialog.close();
            method.reset(defaultValues, reset_config);
        });
    };

    return (
        <UserDialog
            method={method}
            title="modals:settings.user.add.header.title"
            submit={submit}
        >
            <DialogComponents.DefaultActions
                onCancel={userDialog.close}
                submitLoading={isLoading}
                submitText="common:button.add"
                submitDisabled={!method.formState.isDirty}
            />
        </UserDialog>
    );
}
