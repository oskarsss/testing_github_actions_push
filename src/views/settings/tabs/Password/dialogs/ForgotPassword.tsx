import { useForm } from 'react-hook-form';

import TextInput from '@/@core/fields/inputs/TextInput';
import { useAccount } from '@/store/app/hooks';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { SendResetPasswordLinkRequest } from '@proto/auth';
import { EmailValidation } from '@/utils/schema-validators';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import SYSTEM from '@/@system';

const schema = yup.object().shape({
    email: EmailValidation(true)
});

export const useForgotPasswordDialog = hookFabric(ForgotPassword, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        {...props}
    />
));

export default function ForgotPassword() {
    const { user } = useAccount();
    const dialog = useForgotPasswordDialog(true);
    const email = (user && user.email) || '';

    const [sendLinkPassword, {
        isLoading,
        isSuccess
    }] =
        authGrpcApi.useSendResetPasswordLinkMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { email },
        resolver     : yupResolver(schema)
    });

    const submit = (data: Omit<SendResetPasswordLinkRequest, 'partnerId'>) => {
        sendLinkPassword({
            email    : data.email,
            partnerId: SYSTEM.PARTNER_ID
        }).then(dialog.close);
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="settings:password.dialog.forgot_password.title" />
            <DialogComponents.SubHeader text="settings:password.dialog.forgot_password.sub_title" />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="fields:email.label"
                        name="email"
                        placeholder="fields:email.placeholder"
                        width="100%"
                        inputProps={{ disabled: true }}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    text="settings:password.dialog.forgot_password.submit"
                    disabled={isSuccess}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
