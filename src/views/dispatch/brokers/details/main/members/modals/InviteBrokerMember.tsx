import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { EmailValidation } from '@/utils/schema-validators';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
    brokerId: string;
};

type DefaultValues = {
    email: string;
};
export const useInviteBrokerMemberDialog = hookFabric(InviteCustomerMember);

export default function InviteCustomerMember({ brokerId }: Props) {
    const [trigger, { isLoading }] = BrokersGrpcService.useInviteBrokerUserMutation();
    const dialog = useInviteBrokerMemberDialog(true);
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
            brokerId,
            email: data.email
        });
        dialog.close();
    };
    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="Invite Broker Member" />
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
