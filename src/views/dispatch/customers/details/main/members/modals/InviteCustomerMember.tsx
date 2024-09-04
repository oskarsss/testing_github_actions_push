import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { EmailValidation } from '@/utils/schema-validators';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
    customerId: string;
};

type DefaultValues = {
    email: string;
};

export const useInviteCustomerMemberDialog = hookFabric(InviteCustomerMember);

export default function InviteCustomerMember({ customerId }: Props) {
    const [trigger, { isLoading }] = CustomersGrpcService.useInviteCustomerUserMutation();
    const dialog = useInviteCustomerMemberDialog(true);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<DefaultValues>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(
            yup.object().shape({
                email: EmailValidation(true)
            })
        )
    });
    const submit = async (data: DefaultValues) => {
        await trigger({
            customerId,
            email: data.email
        });
        dialog.close();
    };
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="Invite Customer Member" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        width="100%"
                        control={control}
                        errors={errors}
                        label="Email"
                        name="email"
                        required
                        placeholder="Enter email"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    text="Invite"
                />
                <DialogComponents.CancelButton onCancel={dialog.close} />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
