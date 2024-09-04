import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '@/@core/fields/inputs/TextInput';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { EmailValidation } from '@/utils/schema-validators';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import { InviteUserRequest } from '@proto/users';
import RoleSelect from '@/@core/fields/select/RoleSelect';
import SYSTEM from '@/@system';
import type { IntlMessageKey } from '@/@types/next-intl';

const schema: yup.ObjectSchema<InviteUserRequest> = yup.object().shape({
    email : EmailValidation(true),
    roleId: yup.string().required('Role is required')
});

export const useInviteUserDialog = hookFabric(InviteUserDialog);

export default function InviteUserDialog() {
    const { users } = useAllUsers();
    const [inviteUser, { isLoading }] = UsersGrpcService.useInviteUserMutation();

    const inviteUserDialog = useInviteUserDialog(true);

    const {
        control,
        setError,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            email : '',
            roleId: ''
        },
        resolver: yupResolver(schema)
    });

    const submit = (data: InviteUserRequest) => {
        const isUserExist = users.some((user) => user.email === data.email);
        if (isUserExist) {
            return setError('email', {
                type   : 'manual',
                message: 'User with this email already exists'
            });
        }

        inviteUser({
            email : data.email,
            roleId: data.roleId
        }).then(inviteUserDialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="modals:settings.user.invite.header.title" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:email.label"
                        name="email"
                        placeholder=""
                        placeholderWithoutTranslate={SYSTEM.PLACEHOLDER_EMAIL}
                        width="100%"
                        required
                        autoFocus
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <RoleSelect
                        control={control}
                        errors={errors}
                        name="roleId"
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.DefaultActions
                onCancel={inviteUserDialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
                submitText="common:button.invite"
            />
        </DialogComponents.Form>
    );
}
