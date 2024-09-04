import Info from '@/@core/components/Info';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import PasswordInput from '@/@core/fields/inputs/PasswordInput';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type DefaultValues = {
    firstName: string;
    email: string;
    phoneNumber: string;
    friendlyName: string;
    lastName: string;
    internalNote: string;
    password: string;
    passwordChangeRequired: boolean;
    secondStepAuthEnabled: boolean;
    title: string;
};

type Props = {
    brokerId: string;
    defaultValues?: Partial<DefaultValues>;
};

export const useAddBrokerMemberDialog = hookFabric(AddBrokerMember, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="800px"
    />
));

export default function AddBrokerMember({
    brokerId,
    defaultValues = {}
}: Props) {
    const [trigger, { isLoading }] = BrokersGrpcService.useCreateBrokerUserMutation();
    const dialog = useAddBrokerMemberDialog(true);
    const {
        control,
        formState: { errors },
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            firstName             : '',
            email                 : '',
            phoneNumber           : '',
            friendlyName          : '',
            lastName              : '',
            internalNote          : '',
            password              : '',
            passwordChangeRequired: true,
            secondStepAuthEnabled : false,
            title                 : '',
            ...defaultValues
        },
        resolver: yupResolver(
            yup.object().shape({
                firstName             : yup.string().required('First Name is required'),
                lastName              : yup.string().defined(),
                title                 : yup.string().defined(),
                phoneNumber           : PhoneNumberValidation(true),
                email                 : EmailValidation(true),
                password              : yup.string().defined(),
                friendlyName          : yup.string().defined(),
                passwordChangeRequired: yup.boolean().defined(),
                secondStepAuthEnabled : yup.boolean().defined(),
                internalNote          : yup.string().defined()
            })
        )
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            brokerId,
            email                 : data.email,
            firstName             : data.firstName,
            friendlyName          : data.friendlyName,
            phone                 : data.phoneNumber,
            lastName              : data.lastName,
            internalNote          : data.internalNote,
            password              : data.password,
            passwordChangeRequired: data.passwordChangeRequired,
            secondStepAuthEnabled : data.secondStepAuthEnabled,
            title                 : data.title
        }).unwrap();
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="Add Broker Member" />
            <DialogComponents.SubHeader text="modals:settings.user.add_update.header.sub_title" />

            <DialogComponents.Fields
                columnSpacing={0}
                rowSpacing={3}
            >
                <DialogComponents.Field xs={4}>
                    <TextInput
                        label="First Name"
                        control={control}
                        width="100%"
                        errors={errors}
                        name="firstName"
                        placeholder="First Name"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={4}>
                    <TextInput
                        label="Last Name"
                        control={control}
                        errors={errors}
                        width="100%"
                        name="lastName"
                        placeholder="Last Name"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={4}>
                    <TextInput
                        label="Friendly Name"
                        control={control}
                        width="100%"
                        errors={errors}
                        name="friendlyName"
                        placeholder="Friendly Name"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={6}>
                    <TextInput
                        label="Email"
                        control={control}
                        errors={errors}
                        width="100%"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <PhoneInput
                        control={control}
                        errors={errors}
                        name="phoneNumber"
                        placeholder="modals:customers.edit.fields.placeholders.contact_phone"
                        label="modals:customers.edit.fields.labels.contact_phone"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <PasswordInput
                        control={control}
                        size="small"
                        errors={errors}
                        name="password"
                        placeholder="Password"
                        label="Password"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={6}>
                    <TextInput
                        label="Title"
                        control={control}
                        errors={errors}
                        name="title"
                        width="100%"
                        placeholder="Title"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        name="internalNote"
                        width="100%"
                        placeholder="Internal Note"
                        label="Internal Note"
                    />
                </DialogComponents.Field>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="20px"
                    pl="20px"
                >
                    <DialogComponents.ActionsWrapper>
                        <CheckboxInput
                            name="secondStepAuthEnabled"
                            control={control}
                            errors={errors}
                            label="modals:settings.user.add_update.fields.second_step_auth_enabled.label"
                        />
                        <Info title="modals:settings.user.add_update.fields.second_step_auth_enabled.tooltip" />
                    </DialogComponents.ActionsWrapper>
                    <DialogComponents.ActionsWrapper>
                        <CheckboxInput
                            name="passwordChangeRequired"
                            control={control}
                            errors={errors}
                            label="modals:settings.user.add_update.fields.password_change_required.label"
                        />
                        <Info title="modals:settings.user.add_update.fields.password_change_required.tooltip" />
                    </DialogComponents.ActionsWrapper>
                </Stack>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.DefaultActions
                    onCancel={dialog.close}
                    submitLoading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
