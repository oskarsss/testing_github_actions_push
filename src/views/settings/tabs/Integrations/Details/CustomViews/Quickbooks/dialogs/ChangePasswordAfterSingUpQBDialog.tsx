import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import UsersGrpcService from '@/@grpcServices/services/users-service/users.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import { useEffect } from 'react';
import { useAccount } from '@/store/app/hooks';

export const useChangePasswordAfterSingUpQBDialog = hookFabric(ChangePasswordAfterSingUpQBDialog);

type DefaultValues = {
    new_password: string;
    password_confirmation: string;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    new_password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required(),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref('new_password'), undefined], 'Passwords must match')
        .required()
});

function ChangePasswordAfterSingUpQBDialog() {
    const dialog = useChangePasswordAfterSingUpQBDialog(true);
    const [updateUser, { isLoading }] = UsersGrpcService.useUpdateUserMutation();
    const { user: currentUser } = useAccount();
    const { users } = useAllUsers();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DefaultValues>({
        defaultValues: {
            new_password         : '',
            password_confirmation: ''
        },
        mode    : 'onBlur',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dialog.confirmDialog.setDirty(true, {
            onConfirm: () => {},
            body     : 'modals:settings.integrations.change_password.confirm.body'
        });
    }, []);

    const submit = (body: DefaultValues) => {
        const user = users.find((user) => user.userId === currentUser?.userId);
        if (!user) return;
        updateUser({
            email                 : user.email,
            firstName             : user.firstName,
            lastName              : user.lastName,
            passwordChangeRequired: user.passwordChangeRequired,
            phone                 : user.phone,
            roleId                : user.roleId,
            userId                : user.userId,
            secondStepAuthEnabled : !!currentUser?.secondStepAuthEnabled,
            status                : user.status,
            title                 : user.title,
            password              : body.new_password
        })
            .unwrap()
            .then(() => {
                dialog.forceClose();
            });
    };
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="modals:settings.integrations.change_password.title" />
            <DialogComponents.SubHeader text="modals:settings.integrations.change_password.sub_title" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <PasswordInput
                        control={control}
                        errors={errors}
                        label="modals:settings.integrations.change_password.fields.new_password.label"
                        name="new_password"
                        placeholder="modals:settings.integrations.change_password.fields.new_password.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <PasswordInput
                        control={control}
                        errors={errors}
                        label="modals:settings.integrations.change_password.fields.confirm_password.label"
                        name="password_confirmation"
                        placeholder="modals:settings.integrations.change_password.fields.confirm_password.placeholder"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                submitDisabled={!isDirty}
                submitText="modals:settings.integrations.change_password.submit"
            />
        </DialogComponents.Form>
    );
}
